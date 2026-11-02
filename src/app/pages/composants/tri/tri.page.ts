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
  premierDecroissant: `<table mat-table [dataSource]="lignes()" matSort matSortStart="desc" (matSortChange)="tri.set($event)">
  <!-- colonnes avec mat-sort-header -->
</table>`,
  inactif: `<table mat-table [dataSource]="lignes()" matSort [matSortDisabled]="true">
  <!-- colonnes avec mat-sort-header : aucune ne trie -->
</table>`,
  fleche: `<table mat-table class="tri-fleche" [dataSource]="lignes()"
  matSort matSortActive="prix" matSortDirection="asc" (matSortChange)="tri.set($event)">
  <!-- colonnes avec mat-sort-header -->
</table>

@use '@angular/material' as mat;

.tri-fleche {
  @include mat.sort-overrides((
    arrow-color: var(--mat-sys-primary),
  ));
}`,
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

    <app-specimen-section minWidth="320px" title="En-têtes triables" description="Cliquer sur un en-tête pour trier la colonne.">
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

    <app-specimen-section minWidth="320px" title="Comportements globaux">
      <app-specimen label="Premier clic décroissant" api='matSortStart="desc"' [snippet]="snippets.premierDecroissant">
        <table
          mat-table
          [dataSource]="lignesDecroissant()"
          matSort
          matSortStart="desc"
          (matSortChange)="triDecroissant.set($event)"
          aria-label="Produits, premier tri décroissant"
        >
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
      <app-specimen label="Tri désactivé" api="matSortDisabled" [snippet]="snippets.inactif">
        <table mat-table [dataSource]="donnees" matSort [matSortDisabled]="true" aria-label="Produits, tri désactivé">
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
    </app-specimen-section>

    <app-specimen-section
      minWidth="320px"
      title="Personnalisation (jetons)"
      description="Le mixin Sass mat.sort-overrides n’expose qu’un jeton, la couleur de la flèche de tri ; son nom est validé à la compilation."
    >
      <app-specimen label="Flèche colorée (primaire)" api="mat.sort-overrides : arrow-color" [snippet]="snippets.fleche">
        <table
          mat-table
          class="tri-fleche"
          [dataSource]="lignesFleche()"
          matSort
          matSortActive="prix"
          matSortDirection="asc"
          (matSortChange)="triFleche.set($event)"
          aria-label="Produits triables, flèche colorée"
        >
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
    </app-specimen-section>
  `,
  styles: `
    @use '@angular/material' as mat;

    table {
      width: 100%;
    }

    .tri-fleche {
      @include mat.sort-overrides(
        (
          arrow-color: var(--mat-sys-primary),
        )
      );
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
  protected readonly triDecroissant = signal<Sort>({ active: '', direction: '' });
  protected readonly lignesDecroissant = computed(() => trier(DONNEES, this.triDecroissant()));
  protected readonly triFleche = signal<Sort>({ active: 'prix', direction: 'asc' });
  protected readonly lignesFleche = computed(() => trier(DONNEES, this.triFleche()));
  protected readonly donnees = DONNEES;
}
