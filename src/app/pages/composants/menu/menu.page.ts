import { Component } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { Specimen } from '../../../shared/specimen/specimen';
import { SpecimenSection } from '../../../shared/specimen-section/specimen-section';

const SNIPPETS = {
  simple: `<button matButton="outlined" [matMenuTriggerFor]="menu">Ouvrir</button>
<mat-menu #menu="matMenu">
  <button mat-menu-item>Modifier</button>
  <button mat-menu-item>Dupliquer</button>
  <button mat-menu-item>Supprimer</button>
</mat-menu>`,
  icones: `<button matButton="outlined" [matMenuTriggerFor]="menu">Actions</button>
<mat-menu #menu="matMenu">
  <button mat-menu-item><mat-icon>edit</mat-icon>Modifier</button>
  <button mat-menu-item><mat-icon>content_copy</mat-icon>Dupliquer</button>
  <mat-divider />
  <button mat-menu-item><mat-icon>delete</mat-icon>Supprimer</button>
</mat-menu>`,
  desactive: `<button matButton="outlined" [matMenuTriggerFor]="menu">Ouvrir</button>
<mat-menu #menu="matMenu">
  <button mat-menu-item>Modifier</button>
  <button mat-menu-item disabled>Supprimer</button>
</mat-menu>`,
  sousMenu: `<button matButton="outlined" [matMenuTriggerFor]="menu">Ouvrir</button>
<mat-menu #menu="matMenu">
  <button mat-menu-item [matMenuTriggerFor]="export">Exporter</button>
  <button mat-menu-item>Imprimer</button>
</mat-menu>
<mat-menu #export="matMenu">
  <button mat-menu-item>PDF</button>
  <button mat-menu-item>CSV</button>
</mat-menu>`,
  position: `<button matButton="outlined" [matMenuTriggerFor]="menu">Ouvrir</button>
<mat-menu #menu="matMenu" xPosition="before" yPosition="above">
  <button mat-menu-item>Modifier</button>
  <button mat-menu-item>Supprimer</button>
</mat-menu>`,
  bouton: `<button matIconButton [matMenuTriggerFor]="menu" aria-label="Plus d’actions">
  <mat-icon>more_vert</mat-icon>
</button>
<mat-menu #menu="matMenu">
  <button mat-menu-item>Modifier</button>
  <button mat-menu-item>Supprimer</button>
</mat-menu>`,
};

@Component({
  selector: 'app-menu-page',
  imports: [MatButton, MatIconButton, MatDivider, MatIcon, MatMenu, MatMenuItem, MatMenuTrigger, Specimen, SpecimenSection],
  template: `
    <h1>Menu</h1>

    <app-specimen-section title="Contenu" description="Cliquer sur le bouton pour ouvrir le menu.">
      <app-specimen label="Simple" api="mat-menu" [snippet]="snippets.simple">
        <button matButton="outlined" [matMenuTriggerFor]="simple">Ouvrir</button>
        <mat-menu #simple="matMenu">
          <button mat-menu-item>Modifier</button>
          <button mat-menu-item>Dupliquer</button>
          <button mat-menu-item>Supprimer</button>
        </mat-menu>
      </app-specimen>
      <app-specimen label="Avec icônes et séparateur" api="mat-divider" [snippet]="snippets.icones">
        <button matButton="outlined" [matMenuTriggerFor]="icones">Actions</button>
        <mat-menu #icones="matMenu">
          <button mat-menu-item><mat-icon>edit</mat-icon>Modifier</button>
          <button mat-menu-item><mat-icon>content_copy</mat-icon>Dupliquer</button>
          <mat-divider />
          <button mat-menu-item><mat-icon>delete</mat-icon>Supprimer</button>
        </mat-menu>
      </app-specimen>
      <app-specimen label="Sous-menu" api="matMenuTriggerFor" [snippet]="snippets.sousMenu">
        <button matButton="outlined" [matMenuTriggerFor]="parent">Ouvrir</button>
        <mat-menu #parent="matMenu">
          <button mat-menu-item [matMenuTriggerFor]="export">Exporter</button>
          <button mat-menu-item>Imprimer</button>
        </mat-menu>
        <mat-menu #export="matMenu">
          <button mat-menu-item>PDF</button>
          <button mat-menu-item>CSV</button>
        </mat-menu>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section title="Déclencheur et état">
      <app-specimen label="Bouton icône" api="matIconButton" [snippet]="snippets.bouton">
        <button matIconButton [matMenuTriggerFor]="plus" aria-label="Plus d’actions">
          <mat-icon>more_vert</mat-icon>
        </button>
        <mat-menu #plus="matMenu">
          <button mat-menu-item>Modifier</button>
          <button mat-menu-item>Supprimer</button>
        </mat-menu>
      </app-specimen>
      <app-specimen label="Option désactivée" api="mat-menu-item disabled" [snippet]="snippets.desactive">
        <button matButton="outlined" [matMenuTriggerFor]="inactif">Ouvrir</button>
        <mat-menu #inactif="matMenu">
          <button mat-menu-item>Modifier</button>
          <button mat-menu-item disabled>Supprimer</button>
        </mat-menu>
      </app-specimen>
      <app-specimen label="Position" api='xPosition / yPosition' [snippet]="snippets.position">
        <button matButton="outlined" [matMenuTriggerFor]="position">Ouvrir</button>
        <mat-menu #position="matMenu" xPosition="before" yPosition="above">
          <button mat-menu-item>Modifier</button>
          <button mat-menu-item>Supprimer</button>
        </mat-menu>
      </app-specimen>
    </app-specimen-section>
  `,
})
export class MenuPage {
  protected readonly snippets = SNIPPETS;
}
