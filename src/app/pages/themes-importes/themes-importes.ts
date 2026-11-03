import { Component, ElementRef, viewChild } from '@angular/core';
import { ImportedThemesList } from './imported-themes-list';

/** Page « Thèmes importés » (`/themes-importes`, hors registre du catalogue) : gestion des thèmes importés. */
@Component({
  selector: 'app-themes-importes',
  imports: [ImportedThemesList],
  template: `
    <h1 #titrePage tabindex="-1">Thèmes importés</h1>
    <p class="page-intro">
      Les thèmes importés restent dans ce navigateur : ils ne sont ni partagés avec d'autres postes
      ni conservés si vous effacez les données du site.
    </p>
    <app-imported-themes-list (videe)="focusTitre()" />
  `,
})
export class ThemesImportes {
  private readonly titre = viewChild.required<ElementRef<HTMLElement>>('titrePage');

  protected focusTitre(): void {
    this.titre().nativeElement.focus();
  }
}
