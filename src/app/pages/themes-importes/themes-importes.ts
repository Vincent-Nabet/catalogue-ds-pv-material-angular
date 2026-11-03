import { Component, viewChild } from '@angular/core';
import { ImportForm } from './import-form';
import { ImportedThemesList } from './imported-themes-list';

/** Page « Thèmes importés » (`/themes-importes`, hors registre du catalogue) : import et gestion des thèmes. */
@Component({
  selector: 'app-themes-importes',
  imports: [ImportForm, ImportedThemesList],
  template: `
    <h1>Thèmes importés</h1>
    <p class="page-intro">
      Importez un zip de tokens pour voir vos propres tokens dans tout le catalogue. Les thèmes
      importés restent dans ce navigateur : ils ne sont ni partagés avec d'autres postes ni
      conservés si vous effacez les données du site.
    </p>
    <app-import-form (importe)="focusTheme($event)" />
    <app-imported-themes-list (videe)="focusFichier()" />
  `,
})
export class ThemesImportes {
  private readonly formulaire = viewChild.required(ImportForm);
  private readonly liste = viewChild.required(ImportedThemesList);

  /** Un thème vient d'être importé : le focus va sur son titre dans la liste. */
  protected focusTheme(importId: string): void {
    this.liste().focusTheme(importId);
  }

  /** La liste vient d'être vidée : le focus va au champ fichier. */
  protected focusFichier(): void {
    this.formulaire().focusFichier();
  }
}
