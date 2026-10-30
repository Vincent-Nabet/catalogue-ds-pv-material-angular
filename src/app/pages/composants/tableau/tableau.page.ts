import { SelectionModel } from '@angular/cdk/collections';
import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatFooterCell,
  MatFooterCellDef,
  MatFooterRow,
  MatFooterRowDef,
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
  reference: string;
  nom: string;
  prix: number;
}

const SNIPPETS = {
  simple: `<table mat-table [dataSource]="produits">
  <ng-container matColumnDef="reference">
    <th mat-header-cell *matHeaderCellDef>Référence</th>
    <td mat-cell *matCellDef="let produit">{{ produit.reference }}</td>
  </ng-container>
  <ng-container matColumnDef="nom">
    <th mat-header-cell *matHeaderCellDef>Nom</th>
    <td mat-cell *matCellDef="let produit">{{ produit.nom }}</td>
  </ng-container>
  <ng-container matColumnDef="prix">
    <th mat-header-cell *matHeaderCellDef>Prix</th>
    <td mat-cell *matCellDef="let produit">{{ produit.prix | currency: 'EUR' }}</td>
  </ng-container>
  <tr mat-header-row *matHeaderRowDef="colonnes"></tr>
  <tr mat-row *matRowDef="let row; columns: colonnes"></tr>
</table>`,
  fige: `<div style="max-height: 160px; overflow: auto" tabindex="0">
  <table mat-table [dataSource]="produits">
    <!-- colonnes -->
    <tr mat-header-row *matHeaderRowDef="colonnes; sticky: true"></tr>
    <tr mat-row *matRowDef="let row; columns: colonnes"></tr>
  </table>
</div>`,
  pied: `<table mat-table [dataSource]="produits">
  <!-- colonnes -->
  <ng-container matColumnDef="prix">
    <th mat-header-cell *matHeaderCellDef>Prix</th>
    <td mat-cell *matCellDef="let produit">{{ produit.prix | currency: 'EUR' }}</td>
    <td mat-footer-cell *matFooterCellDef>{{ total | currency: 'EUR' }}</td>
  </ng-container>
  <tr mat-header-row *matHeaderRowDef="colonnes"></tr>
  <tr mat-row *matRowDef="let row; columns: colonnes"></tr>
  <tr mat-footer-row *matFooterRowDef="colonnes"></tr>
</table>`,
  selection: `<table mat-table [dataSource]="produits">
  <ng-container matColumnDef="selection">
    <th mat-header-cell *matHeaderCellDef></th>
    <td mat-cell *matCellDef="let produit">
      <mat-checkbox
        [aria-label]="'Sélectionner ' + produit.nom"
        (change)="selection.toggle(produit)"
        [checked]="selection.isSelected(produit)"
      />
    </td>
  </ng-container>
  <!-- autres colonnes -->
  <tr mat-header-row *matHeaderRowDef="colonnesSelection"></tr>
  <tr mat-row *matRowDef="let row; columns: colonnesSelection"></tr>
</table>`,
};

@Component({
  selector: 'app-tableau-page',
  imports: [
    CurrencyPipe,
    MatCell,
    MatCellDef,
    MatCheckbox,
    MatColumnDef,
    MatFooterCell,
    MatFooterCellDef,
    MatFooterRow,
    MatFooterRowDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    Specimen,
    SpecimenSection,
  ],
  template: `
    <h1>Tableau</h1>

    <app-specimen-section title="Tableaux">
      <app-specimen label="Simple" api="mat-table" [snippet]="snippets.simple">
        <table mat-table [dataSource]="produits" aria-label="Produits">
          <ng-container matColumnDef="reference">
            <th mat-header-cell *matHeaderCellDef>Référence</th>
            <td mat-cell *matCellDef="let produit">{{ produit.reference }}</td>
          </ng-container>
          <ng-container matColumnDef="nom">
            <th mat-header-cell *matHeaderCellDef>Nom</th>
            <td mat-cell *matCellDef="let produit">{{ produit.nom }}</td>
          </ng-container>
          <ng-container matColumnDef="prix">
            <th mat-header-cell *matHeaderCellDef>Prix</th>
            <td mat-cell *matCellDef="let produit">{{ produit.prix | currency: 'EUR' }}</td>
          </ng-container>
          <tr mat-header-row *matHeaderRowDef="colonnes"></tr>
          <tr mat-row *matRowDef="let row; columns: colonnes"></tr>
        </table>
      </app-specimen>
      <app-specimen label="Avec ligne de pied" api="mat-footer-row" [snippet]="snippets.pied">
        <table mat-table [dataSource]="produits" aria-label="Produits avec total">
          <ng-container matColumnDef="reference">
            <th mat-header-cell *matHeaderCellDef>Référence</th>
            <td mat-cell *matCellDef="let produit">{{ produit.reference }}</td>
            <td mat-footer-cell *matFooterCellDef>Total</td>
          </ng-container>
          <ng-container matColumnDef="nom">
            <th mat-header-cell *matHeaderCellDef>Nom</th>
            <td mat-cell *matCellDef="let produit">{{ produit.nom }}</td>
            <td mat-footer-cell *matFooterCellDef></td>
          </ng-container>
          <ng-container matColumnDef="prix">
            <th mat-header-cell *matHeaderCellDef>Prix</th>
            <td mat-cell *matCellDef="let produit">{{ produit.prix | currency: 'EUR' }}</td>
            <td mat-footer-cell *matFooterCellDef>{{ total | currency: 'EUR' }}</td>
          </ng-container>
          <tr mat-header-row *matHeaderRowDef="colonnes"></tr>
          <tr mat-row *matRowDef="let row; columns: colonnes"></tr>
          <tr mat-footer-row *matFooterRowDef="colonnes"></tr>
        </table>
      </app-specimen>
      <app-specimen label="En-tête figé" api="matHeaderRowDef sticky" [snippet]="snippets.fige">
        <div class="defilement" tabindex="0" role="region" aria-label="Tableau défilant">
          <table mat-table [dataSource]="produits" aria-label="Produits (défilement)">
            <ng-container matColumnDef="reference">
              <th mat-header-cell *matHeaderCellDef>Référence</th>
              <td mat-cell *matCellDef="let produit">{{ produit.reference }}</td>
            </ng-container>
            <ng-container matColumnDef="nom">
              <th mat-header-cell *matHeaderCellDef>Nom</th>
              <td mat-cell *matCellDef="let produit">{{ produit.nom }}</td>
            </ng-container>
            <ng-container matColumnDef="prix">
              <th mat-header-cell *matHeaderCellDef>Prix</th>
              <td mat-cell *matCellDef="let produit">{{ produit.prix | currency: 'EUR' }}</td>
            </ng-container>
            <tr mat-header-row *matHeaderRowDef="colonnes; sticky: true"></tr>
            <tr mat-row *matRowDef="let row; columns: colonnes"></tr>
          </table>
        </div>
      </app-specimen>
      <app-specimen label="Avec sélection" api="mat-checkbox" [snippet]="snippets.selection">
        <table mat-table [dataSource]="produits" aria-label="Produits sélectionnables">
          <ng-container matColumnDef="selection">
            <th mat-header-cell *matHeaderCellDef><span class="sr-only">Sélection</span></th>
            <td mat-cell *matCellDef="let produit">
              <mat-checkbox
                [aria-label]="'Sélectionner ' + produit.nom"
                (change)="selection.toggle(produit)"
                [checked]="selection.isSelected(produit)"
              />
            </td>
          </ng-container>
          <ng-container matColumnDef="nom">
            <th mat-header-cell *matHeaderCellDef>Nom</th>
            <td mat-cell *matCellDef="let produit">{{ produit.nom }}</td>
          </ng-container>
          <ng-container matColumnDef="prix">
            <th mat-header-cell *matHeaderCellDef>Prix</th>
            <td mat-cell *matCellDef="let produit">{{ produit.prix | currency: 'EUR' }}</td>
          </ng-container>
          <tr mat-header-row *matHeaderRowDef="colonnesSelection"></tr>
          <tr mat-row *matRowDef="let row; columns: colonnesSelection" [class.selectionnee]="selection.isSelected(row)"></tr>
        </table>
      </app-specimen>
    </app-specimen-section>
  `,
  styles: `
    table {
      width: 100%;
    }

    .defilement {
      width: 100%;
      max-height: 140px;
      overflow: auto;
    }

    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip-path: inset(50%);
    }

    .selectionnee {
      background: var(--mat-sys-secondary-container);
    }
  `,
})
export class TableauPage {
  protected readonly snippets = SNIPPETS;
  protected readonly colonnes = ['reference', 'nom', 'prix'];
  protected readonly colonnesSelection = ['selection', 'nom', 'prix'];
  protected readonly produits: Produit[] = [
    { reference: 'P-001', nom: 'Clavier', prix: 49.9 },
    { reference: 'P-002', nom: 'Souris', prix: 24.5 },
    { reference: 'P-003', nom: 'Écran', prix: 189 },
    { reference: 'P-004', nom: 'Webcam', prix: 59.99 },
  ];
  protected readonly total = this.produits.reduce((somme, produit) => somme + produit.prix, 0);
  protected readonly selection = new SelectionModel<Produit>(true, [this.produits[1]]);
}
