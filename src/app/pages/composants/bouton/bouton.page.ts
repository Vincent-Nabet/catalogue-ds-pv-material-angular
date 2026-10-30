import { Component } from '@angular/core';
import { MatButton, MatFabButton, MatIconButton, MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Specimen } from '../../../shared/specimen/specimen';
import { SpecimenSection } from '../../../shared/specimen-section/specimen-section';

const SNIPPETS = {
  texte: `<button matButton="text">Texte</button>`,
  rempli: `<button matButton="filled">Rempli</button>`,
  tonal: `<button matButton="tonal">Tonal</button>`,
  releve: `<button matButton="elevated">Relevé</button>`,
  contour: `<button matButton="outlined">Contour</button>`,
  desactive: `<button matButton="filled" disabled>Désactivé</button>`,
  avecIcone: `<button matButton="filled">
  <mat-icon>add</mat-icon>
  Avec icône
</button>`,
  icone: `<button matIconButton aria-label="Favori">
  <mat-icon>favorite</mat-icon>
</button>`,
  iconeDesactive: `<button matIconButton aria-label="Favori" disabled>
  <mat-icon>favorite</mat-icon>
</button>`,
  fab: `<button matFab aria-label="Modifier">
  <mat-icon>edit</mat-icon>
</button>`,
  miniFab: `<button matMiniFab aria-label="Modifier">
  <mat-icon>edit</mat-icon>
</button>`,
  fabEtendu: `<button matFab extended>
  <mat-icon>edit</mat-icon>
  Modifier
</button>`,
};

@Component({
  selector: 'app-bouton-page',
  imports: [MatButton, MatIconButton, MatFabButton, MatMiniFabButton, MatIcon, Specimen, SpecimenSection],
  template: `
    <h1>Bouton</h1>

    <app-specimen-section title="Boutons" description="Cinq styles, en état normal, désactivé et avec icône.">
      <app-specimen label="Texte" api='matButton="text"' [snippet]="snippets.texte">
        <button matButton="text">Texte</button>
      </app-specimen>
      <app-specimen label="Rempli" api='matButton="filled"' [snippet]="snippets.rempli">
        <button matButton="filled">Rempli</button>
      </app-specimen>
      <app-specimen label="Tonal" api='matButton="tonal"' [snippet]="snippets.tonal">
        <button matButton="tonal">Tonal</button>
      </app-specimen>
      <app-specimen label="Relevé" api='matButton="elevated"' [snippet]="snippets.releve">
        <button matButton="elevated">Relevé</button>
      </app-specimen>
      <app-specimen label="Contour" api='matButton="outlined"' [snippet]="snippets.contour">
        <button matButton="outlined">Contour</button>
      </app-specimen>
      <app-specimen label="Désactivé" api="disabled" [snippet]="snippets.desactive">
        <button matButton="text" disabled>Texte</button>
        <button matButton="filled" disabled>Rempli</button>
        <button matButton="tonal" disabled>Tonal</button>
        <button matButton="elevated" disabled>Relevé</button>
        <button matButton="outlined" disabled>Contour</button>
      </app-specimen>
      <app-specimen label="Avec icône" api="mat-icon" [snippet]="snippets.avecIcone">
        <button matButton="text"><mat-icon>add</mat-icon>Texte</button>
        <button matButton="filled"><mat-icon>add</mat-icon>Rempli</button>
        <button matButton="tonal"><mat-icon>add</mat-icon>Tonal</button>
        <button matButton="elevated"><mat-icon>add</mat-icon>Relevé</button>
        <button matButton="outlined"><mat-icon>add</mat-icon>Contour</button>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section title="Boutons icône">
      <app-specimen label="Icône" api="matIconButton" [snippet]="snippets.icone">
        <button matIconButton aria-label="Favori"><mat-icon>favorite</mat-icon></button>
      </app-specimen>
      <app-specimen label="Désactivé" api="matIconButton disabled" [snippet]="snippets.iconeDesactive">
        <button matIconButton aria-label="Favori" disabled><mat-icon>favorite</mat-icon></button>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section title="Boutons d’action flottants (FAB)">
      <app-specimen label="FAB" api="matFab" [snippet]="snippets.fab">
        <button matFab aria-label="Modifier"><mat-icon>edit</mat-icon></button>
      </app-specimen>
      <app-specimen label="Mini FAB" api="matMiniFab" [snippet]="snippets.miniFab">
        <button matMiniFab aria-label="Modifier"><mat-icon>edit</mat-icon></button>
      </app-specimen>
      <app-specimen label="FAB étendu" api="matFab extended" [snippet]="snippets.fabEtendu">
        <button matFab extended><mat-icon>edit</mat-icon>Modifier</button>
      </app-specimen>
    </app-specimen-section>
  `,
})
export class BoutonPage {
  protected readonly snippets = SNIPPETS;
}
