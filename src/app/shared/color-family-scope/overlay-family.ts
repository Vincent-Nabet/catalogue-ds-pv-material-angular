import { OverlayContainer } from '@angular/cdk/overlay';
import { Service, inject } from '@angular/core';
import { familyVariables } from '../../core/tokens/color-families';

/**
 * Menus, snackbars, sélecteurs de date et d'heure sont rendus dans la surcouche CDK, hors de la page :
 * une directive posée sur la page n'atteint pas leur panneau. Ce service pose les variables `--r-*`
 * de la famille sur le conteneur de la surcouche (ancêtre de tous les panneaux) ; à appeler avant
 * l'ouverture. Seules les classes `perso-*` de la page lisent ces variables.
 */
@Service()
export class OverlayFamily {
  private readonly container = inject(OverlayContainer);

  apply(id: string): void {
    const element = this.container.getContainerElement();
    for (const [name, value] of Object.entries(familyVariables(id))) {
      element.style.setProperty(name, value);
    }
  }
}
