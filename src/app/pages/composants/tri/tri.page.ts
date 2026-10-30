import { Component, computed, signal } from '@angular/core';
import { MatSort, MatSortHeader, Sort } from '@angular/material/sort';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
} from '@angular/material/table';
import { Specimen } from '../../../shared/specimen/specimen';
import { SpecimenSection } from '../../../shared/specimen-section/specimen-section';

interface Produit {
  nom: string;
  prix: number;
  stock: number;
}

const DONNEES: Produit[] = [
  { nom: 'Clavier', prix: 49.9, stock: 12 },
  { nom: 'Souris', prix: 24.5, stock: 40 },
  { nom: 'Écran', prix: 189, stock: 5 },
  { nom: 'Webcam', prix: 59.99, stock: 0 },
];

function trier(lignes: Produit[], tri: Sort): Produit[] {
  const colonne = tri.active as keyof Produit;
  if (!colonne || tri.direction === '') {
    return lignes;
  }
  const sens = tri.direction === 'asc' ? 1 : -1;
  return [...lignes].sort((a, b) => {
    const [x, y] = [a[colonne], b[colonne]];
    return (typeof x === 'number' && typeof y === 'number' ? x - y : String(x).localeCompare(String(y), 'fr')) * sens;
  });
}

const SNIPPETS = {
  simple: `<table mat-table [dataSource]="lignes()" matSort (matSortChange)="tri.set($event)">
  <ng-container matColumnDef="nom">
    <th mat-header-cell *matHeaderCellDef mat-sort-header>Nom</th>
    <td mat-cell *matCellDef="let produit">{{ produit.nom }}</td>
  </ng-container>
  <ng-container matColumnDef="prix">
    <th mat-header-cell *matHeaderCellDef mat-sort-header>Prix</th>
    <td mat-cell *matCellDef="let produit">{{ produit.prix }}</td>
  </ng-container>
  <tr mat-header-row *matHeaderRowDef="colonnes"></tr>
  <tr mat-row *matRowDef="let row; columns: colonnes"></tr>
</table>`,
  options: `<table mat-table [dataSource]="lignes()"
  matSort matSortActive="prix" matSortDirection="desc" matSortDisableClear
  (matSortChange)="tri.set($event)">
  <ng-container matColumnDef="nom">
    <th mat-header-cell *matHeaderCellDef mat-sort-header arrowPosition="before">Nom</th>
    …
  </ng-container>
  <ng-container matColumnDef="stock">
    <th mat-header-cell *matHeaderCellDef mat-sort-header disabled>Stock</th>
    …
  </ng-container>
</table>`,
};

@Component({
  selector: 'app-tri-page',
  imports: [
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatSort,
    MatSortHeader,
    MatTable,
    Specimen,
    SpecimenSection,
  ],
  template: `
    <h1>Tri</h1>

    <app-specimen-section title="En-têtes triables" description="Cliquer sur un en-tête pour trier la colonne.">
      <app-specimen label="Tri par colonne" api="matSort / mat-sort-header" [snippet]="snippets.simple">
        <table mat-table [dataSource]="lignesSimple()" matSort (matSortChange)="triSimple.set($event)" aria-label="Produits triables">
          <ng-container matColumnDef="nom">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Nom</th>
            <td mat-cell *matCellDef="let produit">{{ produit.nom }}</td>
          </ng-container>
          <ng-container matColumnDef="prix">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Prix</th>
            <td mat-cell *matCellDef="let produit">{{ produit.prix }}</td>
          </ng-container>
          <ng-container matColumnDef="stock">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Stock</th>
            <td mat-cell *matCellDef="let produit">{{ produit.stock }}</td>
          </ng-container>
          <tr mat-header-row *matHeaderRowDef="colonnes"></tr>
          <tr mat-row *matRowDef="let row; columns: colonnes"></tr>
        </table>
      </app-specimen>
      <app-specimen label="Options" api="arrowPosition / disabled / matSortDisableClear" [snippet]="snippets.options">
        <table
          mat-table
          [dataSource]="lignesOptions()"
          matSort
          matSortActive="prix"
          matSortDirection="desc"
          matSortDisableClear
          (matSortChange)="triOptions.set($event)"
          aria-label="Produits triables avec options"
        >
          <ng-container matColumnDef="nom">
            <th mat-header-cell *matHeaderCellDef mat-sort-header arrowPosition="before">Nom</th>
            <td mat-cell *matCellDef="let produit">{{ produit.nom }}</td>
          </ng-container>
          <ng-container matColumnDef="prix">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Prix</th>
            <td mat-cell *matCellDef="let produit">{{ produit.prix }}</td>
          </ng-container>
          <ng-container matColumnDef="stock">
            <th mat-header-cell *matHeaderCellDef mat-sort-header disabled>Stock</th>
            <td mat-cell *matCellDef="let produit">{{ produit.stock }}</td>
          </ng-container>
          <tr mat-header-row *matHeaderRowDef="colonnes"></tr>
          <tr mat-row *matRowDef="let row; columns: colonnes"></tr>
        </table>
      </app-specimen>
    </app-specimen-section>
  `,
  styles: `
    table {
      width: 100%;
    }
  `,
})
export class TriPage {
  protected readonly snippets = SNIPPETS;
  protected readonly colonnes = ['nom', 'prix', 'stock'];

  protected readonly triSimple = signal<Sort>({ active: '', direction: '' });
  protected readonly lignesSimple = computed(() => trier(DONNEES, this.triSimple()));

  protected readonly triOptions = signal<Sort>({ active: 'prix', direction: 'desc' });
  protected readonly lignesOptions = computed(() => trier(DONNEES, this.triOptions()));
}
