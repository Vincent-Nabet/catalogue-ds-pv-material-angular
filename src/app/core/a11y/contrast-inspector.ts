import { InjectionToken, Service, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { ThemeService } from '../theme/theme.service';
import { ContrastItem, toContrastItems } from './contrast-items';

/**
 * Zone mesurée : le contenu des pages de composants. Le shell (barre d'outils, menu latéral)
 * et le calque de l'inspecteur sont hors de `<main>`, donc hors mesure.
 */
const MEASURED_AREA = 'main';

/** L'inspecteur ne sert que sur les pages de composants. */
const COMPONENT_PAGES = '/composants/';

/** Le temps de laisser le rendu (route, thème) se terminer avant de mesurer. */
const ANALYSIS_DELAY_MS = 300;

type AxeRunner = Pick<typeof import('axe-core'), 'run'>;

/** axe-core pèse ≈ 650 kB : chargé à la demande, hors du bundle initial. */
export const AXE_LOADER = new InjectionToken<() => Promise<AxeRunner>>('AXE_LOADER', {
  factory: () => async () => (await import('axe-core')).default,
});

@Service()
export class ContrastInspector {
  private readonly loadAxe = inject(AXE_LOADER);
  private readonly theme = inject(ThemeService);
  private readonly router = inject(Router);
  private readonly url = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects),
    ),
    { initialValue: this.router.url },
  );

  /** Numéro de la dernière analyse demandée : écarte les résultats devenus périmés. */
  private run = 0;

  /** Vrai sur une page de composants : ailleurs (accueil), l'inspecteur n'est pas proposé. */
  readonly available = computed(() => this.url().startsWith(COMPONENT_PAGES));
  readonly active = signal(false);
  readonly running = signal(false);
  readonly error = signal<string | null>(null);
  readonly items = signal<ContrastItem[]>([]);
  readonly showPassing = signal(false);

  readonly failing = computed(() => this.count('fail'));
  readonly passing = computed(() => this.count('pass'));
  readonly unknown = computed(() => this.count('unknown'));

  constructor() {
    // Quitter les pages de composants désactive l'inspecteur.
    effect(() => {
      if (!this.available()) this.active.set(false);
    });

    // Relance à l'activation, puis à chaque changement de page, de thème, de mode ou de densité.
    effect((onCleanup) => {
      if (!this.active()) {
        this.run++;
        this.running.set(false);
        this.error.set(null);
        this.items.set([]);
        return;
      }
      this.theme.theme();
      this.theme.scheme();
      this.theme.density();
      this.url();
      // Dès la planification : le panneau n'affiche pas de comptes périmés pendant l'attente.
      this.running.set(true);
      const timer = setTimeout(() => void this.refresh(), ANALYSIS_DELAY_MS);
      onCleanup(() => clearTimeout(timer));
    });
  }

  toggle(): void {
    if (this.available()) this.active.update((active) => !active);
  }

  /** Mesure les contrastes du contenu de la page (règle `color-contrast` d'axe-core). */
  async refresh(): Promise<void> {
    const id = ++this.run;
    this.running.set(true);
    this.error.set(null);
    try {
      const axe = await this.loadAxe();
      const results = await axe.run(
        { include: [MEASURED_AREA] },
        {
          runOnly: { type: 'rule', values: ['color-contrast'] },
          resultTypes: ['violations', 'passes', 'incomplete'],
          elementRef: true,
          selectors: false,
        },
      );
      if (id === this.run) this.items.set(toContrastItems(results));
    } catch (error) {
      if (id === this.run) {
        this.items.set([]);
        this.error.set(error instanceof Error ? error.message : 'Analyse impossible.');
      }
    } finally {
      if (id === this.run) this.running.set(false);
    }
  }

  private count(status: ContrastItem['status']): number {
    return this.items().filter((item) => item.status === status).length;
  }
}
