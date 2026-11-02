import { SelectionModel } from '@angular/cdk/collections';
import { CurrencyPipe } from '@angular/common';
import { Component, computed } from '@angular/core';
import { injectColorFamilies } from '../../../core/tokens/color-families';
import { ColorFamilyScope } from '../../../shared/color-family-scope/color-family-scope';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatCell, MatCellDef, MatColumnDef, MatFooterCell, MatFooterCellDef, MatFooterRow, MatFooterRowDef, MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable, MatNoDataRow, MatTextColumn } from '@angular/material/table';
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
  vide: `<table mat-table [dataSource]="[]">
  <!-- colonnes -->
  <tr mat-header-row *matHeaderRowDef="colonnes"></tr>
  <tr mat-row *matRowDef="let row; columns: colonnes"></tr>
  <tr class="mat-row" *matNoDataRow>
    <td class="mat-cell" [attr.colspan]="colonnes.length">Aucune donnée</td>
  </tr>
</table>`,
  texte: `<table mat-table [dataSource]="produits">
  <mat-text-column name="reference" headerText="Référence" />
  <mat-text-column name="nom" headerText="Nom" />
  <tr mat-header-row *matHeaderRowDef="['reference', 'nom']"></tr>
  <tr mat-row *matRowDef="let row; columns: ['reference', 'nom']"></tr>
</table>`,
  figee: `<div style="overflow: auto" tabindex="0">
  <table mat-table [dataSource]="produits" style="min-width: 640px">
    <ng-container matColumnDef="reference" [sticky]="true">
      <th mat-header-cell *matHeaderCellDef>Référence</th>
      <td mat-cell *matCellDef="let produit">{{ produit.reference }}</td>
    </ng-container>
    <!-- autres colonnes -->
    <tr mat-header-row *matHeaderRowDef="colonnesLarges"></tr>
    <tr mat-row *matRowDef="let row; columns: colonnesLarges"></tr>
  </table>
</div>`,
  couleurs: `<table mat-table class="tableau-secondaire" [dataSource]="produits">
  <!-- colonnes : référence, nom, prix -->
  <tr mat-header-row *matHeaderRowDef="colonnes"></tr>
  <tr mat-row *matRowDef="let row; columns: colonnes"></tr>
</table>

@use '@angular/material' as mat;

.tableau-secondaire {
  @include mat.table-overrides((
    background-color: var(--mat-sys-secondary-container),
    header-headline-color: var(--mat-sys-on-secondary-container),
    row-item-label-text-color: var(--mat-sys-on-secondary-container),
  ));
}`,
  compact: `<table mat-table class="tableau-compact" [dataSource]="produits">
  <!-- colonnes : référence, nom, prix -->
  <tr mat-header-row *matHeaderRowDef="colonnes"></tr>
  <tr mat-row *matRowDef="let row; columns: colonnes"></tr>
</table>

@use '@angular/material' as mat;

.tableau-compact {
  @include mat.table-overrides((
    header-container-height: 40px,
    row-item-container-height: 40px,
  ));
}`,
  lignesMarquees: `<table mat-table class="tableau-lignes" [dataSource]="produits">
  <!-- colonnes : référence, nom, prix -->
  <tr mat-header-row *matHeaderRowDef="colonnes"></tr>
  <tr mat-row *matRowDef="let row; columns: colonnes"></tr>
</table>

@use '@angular/material' as mat;

.tableau-lignes {
  @include mat.table-overrides((
    row-item-outline-width: 2px,
    row-item-outline-color: var(--mat-sys-primary),
  ));
}`,
};

/** Snippet d'une famille personnalisée, dérivé de son nom (la liste des familles est détectée, pas écrite à la main). */
function customSnippet(id: string): string {
  return `<table mat-table class="${id}" [dataSource]="produits">
  <!-- colonnes : référence, nom, prix -->
  <tr mat-header-row *matHeaderRowDef="colonnes"></tr>
  <tr mat-row *matRowDef="let row; columns: colonnes"></tr>
</table>

@use '@angular/material' as mat;

.${id} {
  @include mat.table-overrides((
    background-color: var(--app-color-${id}-container),
    header-headline-color: var(--app-color-on-${id}-container),
    row-item-label-text-color: var(--app-color-on-${id}-container),
  ));
}`;
}

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
    MatNoDataRow,
    MatTextColumn,
    ColorFamilyScope,
  ],
  template: `
    <h1>Tableau</h1>

    <app-specimen-section minWidth="360px" title="Tableaux">
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

    <app-specimen-section minWidth="360px" title="Autres variantes">
      <app-specimen label="Aucune donnée" api="matNoDataRow" [snippet]="snippets.vide">
        <table mat-table [dataSource]="vide" aria-label="Tableau vide">
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
          <tr class="mat-row" *matNoDataRow>
            <td class="mat-cell vide" [attr.colspan]="colonnes.length">Aucune donnée</td>
          </tr>
        </table>
      </app-specimen>
      <app-specimen label="Colonnes de texte simples" api="mat-text-column" [snippet]="snippets.texte">
        <table mat-table [dataSource]="produits" aria-label="Produits (colonnes de texte)">
          <mat-text-column name="reference" headerText="Référence" />
          <mat-text-column name="nom" headerText="Nom" />
          <tr mat-header-row *matHeaderRowDef="colonnesTexte"></tr>
          <tr mat-row *matRowDef="let row; columns: colonnesTexte"></tr>
        </table>
      </app-specimen>
      <app-specimen label="Première colonne figée" api="matColumnDef sticky" [snippet]="snippets.figee">
        <div class="defilement" tabindex="0" role="region" aria-label="Tableau large défilant">
          <table mat-table class="large" [dataSource]="produits" aria-label="Produits (colonne figée)">
            <ng-container matColumnDef="reference" [sticky]="true">
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
            @for (colonne of colonnesSupp; track colonne) {
              <ng-container [matColumnDef]="colonne">
                <th mat-header-cell *matHeaderCellDef>{{ colonne }}</th>
                <td mat-cell *matCellDef="let produit">{{ colonne }} {{ produit.reference }}</td>
              </ng-container>
            }
            <tr mat-header-row *matHeaderRowDef="colonnesLarges"></tr>
            <tr mat-row *matRowDef="let row; columns: colonnesLarges"></tr>
          </table>
        </div>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section
      minWidth="360px"
      title="Personnalisation (jetons)"
      description="Couleurs, hauteur des lignes et bordures se règlent avec le mixin Sass mat.table-overrides ; les noms de jetons sont validés à la compilation."
    >
      <app-specimen label="Couleurs de rôle (secondaire)" api="mat.table-overrides : background-color" [snippet]="snippets.couleurs">
        <table mat-table class="tableau-secondaire" [dataSource]="produits" aria-label="Produits, couleurs secondaires">
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
      <app-specimen label="Lignes compactes" api="mat.table-overrides : row-item-container-height" [snippet]="snippets.compact">
        <table mat-table class="tableau-compact" [dataSource]="produits" aria-label="Produits, lignes compactes">
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
      <app-specimen label="Séparateurs de lignes marqués" api="mat.table-overrides : row-item-outline-width" [snippet]="snippets.lignesMarquees">
        <table mat-table class="tableau-lignes" [dataSource]="produits" aria-label="Produits, séparateurs marqués">
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
    </app-specimen-section>

    @if (families().length > 0) {
      <app-specimen-section
        minWidth="360px"
        title="Couleurs personnalisées"
        description="Familles de couleur propres au design system (--app-color-*), détectées dans le CSS chargé : même principe que les rôles M3, appliqué avec les jetons du design system (fond du tableau et texte des lignes et de l’en-tête ensemble)."
      >
        @for (family of families(); track family.id) {
          <app-specimen [label]="family.label" [api]="family.api" [snippet]="family.snippet" [custom]="true">
            <span [appColorFamily]="family.id">
              <table mat-table class="perso" [dataSource]="produits" [attr.aria-label]="'Produits, couleurs ' + family.label">
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
            </span>
          </app-specimen>
        }
      </app-specimen-section>
    }
  `,
  styles: `
    @use '@angular/material' as mat;

    table {
      width: 100%;
    }

    .tableau-secondaire {
      @include mat.table-overrides(
        (
          background-color: var(--mat-sys-secondary-container),
          header-headline-color: var(--mat-sys-on-secondary-container),
          row-item-label-text-color: var(--mat-sys-on-secondary-container),
        )
      );
    }

    .perso {
      @include mat.table-overrides(
        (
          background-color: var(--r-c),
          header-headline-color: var(--r-sc),
          row-item-label-text-color: var(--r-sc),
        )
      );
    }

    .tableau-compact {
      @include mat.table-overrides(
        (
          header-container-height: 40px,
          row-item-container-height: 40px,
        )
      );
    }

    .tableau-lignes {
      @include mat.table-overrides(
        (
          row-item-outline-width: 2px,
          row-item-outline-color: var(--mat-sys-primary),
        )
      );
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
    .vide {
      padding: 16px;
      text-align: center;
      color: var(--mat-sys-on-surface-variant);
    }

    .large {
      min-width: 640px;
    }

    .large .mat-column-reference {
      background: var(--mat-sys-surface);
    }
  `,
})
export class TableauPage {
  protected readonly snippets = SNIPPETS;

  private readonly detected = injectColorFamilies();

  /** Une famille par jeu `--app-color-*` complet (vide avec un thème Angular Material). */
  protected readonly families = computed(() =>
    this.detected().map(({ id, label }) => ({
      id,
      label,
      api: 'mat.table-overrides : background-color',
      snippet: customSnippet(id),
    })),
  );

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
  protected readonly vide: Produit[] = [];
  protected readonly colonnesTexte = ['reference', 'nom'];
  protected readonly colonnesSupp = ['categorie', 'stock', 'fournisseur'];
  protected readonly colonnesLarges = ['reference', 'nom', 'prix', 'categorie', 'stock', 'fournisseur'];
}
