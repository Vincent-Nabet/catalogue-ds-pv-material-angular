import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ContrastInspector } from '../../core/a11y/contrast-inspector';

/**
 * Panneau récapitulatif de l'inspecteur. Placé en tête de `mat-sidenav-content`, collant
 * (`sticky`) : il reste en haut à gauche de la zone de contenu, sous le header et à droite du
 * menu latéral quand il est affiché. Il est dans le flux (il réserve sa hauteur) et hors de
 * `<main>` : il ne cache pas le titre de la page et n'est pas mesuré par axe.
 */
@Component({
  selector: 'app-contrast-panel',
  imports: [MatButton],
  templateUrl: './contrast-panel.html',
  styleUrl: './contrast-panel.scss',
})
export class ContrastPanel {
  protected readonly inspector = inject(ContrastInspector);

  protected setShowPassing(event: Event): void {
    this.inspector.showPassing.set((event.target as HTMLInputElement).checked);
  }
}
