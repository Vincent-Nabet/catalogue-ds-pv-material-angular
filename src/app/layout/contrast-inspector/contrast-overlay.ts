import { Component, computed, effect, inject, signal } from '@angular/core';
import { ContrastInspector } from '../../core/a11y/contrast-inspector';
import { ContrastItem, badgeLabel, describeItem } from '../../core/a11y/contrast-items';

interface Badge {
  item: ContrastItem;
  label: string;
  description: string;
  top: number;
  left: number;
  width: number;
  height: number;
}

/**
 * Calque fixe qui affiche, au-dessus de chaque texte mesuré, son rapport de contraste. Les
 * positions suivent les éléments (défilement de n'importe quel conteneur, redimensionnement).
 * Le calque est rogné à la zone de contenu : un badge ne déborde jamais sur le header ou le menu.
 * Hors de `<main>`, il n'est pas mesuré par axe.
 */
@Component({
  selector: 'app-contrast-overlay',
  templateUrl: './contrast-overlay.html',
  styleUrl: './contrast-overlay.scss',
})
export class ContrastOverlay {
  protected readonly inspector = inject(ContrastInspector);

  /** Incrémenté quand les éléments ont pu bouger : force le recalcul des positions. */
  private readonly layout = signal(0);
  private pendingFrame = 0;

  protected readonly badges = computed<Badge[]>(() => {
    this.layout();
    const showPassing = this.inspector.showPassing();
    return this.inspector
      .items()
      .filter((item) => showPassing || item.status !== 'pass')
      .flatMap((item) => {
        if (!item.element.isConnected) return [];
        const { top, left, width, height, bottom, right } = item.element.getBoundingClientRect();
        const outside =
          bottom < 0 || right < 0 || top > window.innerHeight || left > window.innerWidth;
        if (width === 0 || height === 0 || outside) return [];
        return [
          {
            item,
            label: badgeLabel(item),
            description: describeItem(item),
            top,
            left,
            width,
            height,
          },
        ];
      });
  });

  /**
   * Zone visible du contenu : sous le header et le panneau, à droite du menu. Au-delà, les badges
   * sont rognés (ils ne débordent ni sur le header, ni sur le menu, ni sur le panneau).
   */
  protected readonly clipPath = computed(() => {
    this.layout();
    this.inspector.items();
    const area = document.querySelector('mat-sidenav-content')?.getBoundingClientRect();
    if (!area) return 'none';
    const panel = document.querySelector('app-contrast-panel .panneau')?.getBoundingClientRect();
    return `inset(${Math.max(area.top, panel?.bottom ?? 0)}px 0 0 ${area.left}px)`;
  });

  constructor() {
    effect((onCleanup) => {
      if (!this.inspector.active()) return;
      const update = () => this.scheduleLayout();
      // Le contenu défile dans un conteneur, pas dans la fenêtre : écoute en phase de capture.
      document.addEventListener('scroll', update, { capture: true, passive: true });
      window.addEventListener('resize', update);
      onCleanup(() => {
        document.removeEventListener('scroll', update, { capture: true });
        window.removeEventListener('resize', update);
        cancelAnimationFrame(this.pendingFrame);
        this.pendingFrame = 0;
      });
    });
  }

  private scheduleLayout(): void {
    if (this.pendingFrame) return;
    this.pendingFrame = requestAnimationFrame(() => {
      this.pendingFrame = 0;
      this.layout.update((n) => n + 1);
    });
  }
}
