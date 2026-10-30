import { InjectionToken, Service, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { ThemeService } from '../theme/theme.service';
import { ContrastItem, toContrastItems } from './contrast-items';

/** Attribut posé sur le calque de l'inspecteur : axe ne doit pas l'analyser. */
export const INSPECTOR_ATTRIBUTE = 'data-inspecteur-contraste';

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
  private readonly navigated = toSignal(
    inject(Router).events.pipe(filter((event) => event instanceof NavigationEnd)),
  );

  /** Numéro de la dernière analyse demandée : écarte les résultats devenus périmés. */
  private run = 0;

  readonly active = signal(false);
  readonly running = signal(false);
  readonly error = signal<string | null>(null);
  readonly items = signal<ContrastItem[]>([]);
  readonly showPassing = signal(false);

  readonly failing = computed(() => this.count('fail'));
  readonly passing = computed(() => this.count('pass'));
  readonly unknown = computed(() => this.count('unknown'));

  constructor() {
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
      this.navigated();
      const timer = setTimeout(() => void this.refresh(), ANALYSIS_DELAY_MS);
      onCleanup(() => clearTimeout(timer));
    });
  }

  toggle(): void {
    this.active.update((active) => !active);
  }

  /** Mesure les contrastes de la page courante (règle `color-contrast` d'axe-core). */
  async refresh(): Promise<void> {
    const id = ++this.run;
    this.running.set(true);
    this.error.set(null);
    try {
      const axe = await this.loadAxe();
      const results = await axe.run(
        { exclude: [`[${INSPECTOR_ATTRIBUTE}]`] },
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
