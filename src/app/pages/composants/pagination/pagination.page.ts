import { Component, computed } from '@angular/core';
import { injectColorFamilies } from '../../../core/tokens/color-families';
import { ColorFamilyScope } from '../../../shared/color-family-scope/color-family-scope';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { PaginatorIntlFr } from '../../../core/i18n/intl-fr';
import { Specimen } from '../../../shared/specimen/specimen';
import { SpecimenSection } from '../../../shared/specimen-section/specimen-section';

const SNIPPETS = {
  simple: `<mat-paginator [length]="100" [pageSize]="10" [pageSizeOptions]="[5, 10, 25]" aria-label="Pagination" />`,
  extremites: `<mat-paginator [length]="100" [pageSize]="10" showFirstLastButtons aria-label="Pagination" />`,
  sansTaille: `<mat-paginator [length]="100" [pageSize]="10" hidePageSize aria-label="Pagination" />`,
  page: `<mat-paginator [length]="100" [pageSize]="10" [pageIndex]="3" aria-label="Pagination" />`,
  desactive: `<mat-paginator [length]="100" [pageSize]="10" disabled aria-label="Pagination" />`,
  traduction: `// Libellés français : fournir une sous-classe de MatPaginatorIntl
@Injectable()
export class PaginatorIntlFr extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Éléments par page :';
  override nextPageLabel = 'Page suivante';
  override previousPageLabel = 'Page précédente';
}

providers: [{ provide: MatPaginatorIntl, useClass: PaginatorIntlFr }]`,
  grandVolume: `<mat-paginator [length]="12345" [pageSize]="50" [pageSizeOptions]="[10, 50, 100]" showFirstLastButtons aria-label="Pagination" />`,
  unePage: `<mat-paginator [length]="5" [pageSize]="10" aria-label="Pagination" />`,
  panneau: `<mat-paginator [length]="100" [pageSize]="10" [pageSizeOptions]="[5, 10, 25]"
  [selectConfig]="{ disableOptionCentering: true }" aria-label="Pagination" />`,
  couleurs: `<mat-paginator class="pagination-secondaire" [length]="100" [pageSize]="10"
  [pageSizeOptions]="[5, 10, 25]" aria-label="Pagination" />

@use '@angular/material' as mat;

.pagination-secondaire {
  @include mat.paginator-overrides((
    container-background-color: var(--mat-sys-secondary-container),
    container-text-color: var(--mat-sys-on-secondary-container),
    enabled-icon-color: var(--mat-sys-on-secondary-container),
  ));
}`,
  grande: `<mat-paginator class="pagination-grande" [length]="100" [pageSize]="10"
  [pageSizeOptions]="[5, 10, 25]" aria-label="Pagination" />

@use '@angular/material' as mat;

.pagination-grande {
  @include mat.paginator-overrides((
    container-size: 72px,
    container-text-size: var(--mat-sys-body-large-size),
    container-text-line-height: var(--mat-sys-body-large-line-height),
    select-trigger-text-size: var(--mat-sys-body-large-size),
    page-size-select-width: 96px,
  ));
}`,
};

/** Snippet d'une famille personnalisée, dérivé de son nom (la liste des familles est détectée, pas écrite à la main). */
function customSnippet(id: string): string {
  return `<mat-paginator class="${id}" [length]="100" [pageSize]="10"
  [pageSizeOptions]="[5, 10, 25]" aria-label="Pagination" />

@use '@angular/material' as mat;

.${id} {
  @include mat.paginator-overrides((
    container-background-color: var(--app-color-${id}-container),
    container-text-color: var(--app-color-on-${id}-container),
    enabled-icon-color: var(--app-color-on-${id}-container),
  ));
}`;
}

@Component({
  selector: 'app-pagination-page',
  imports: [MatPaginator, Specimen, SpecimenSection, ColorFamilyScope],
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorIntlFr }],
  template: `
    <h1>Pagination</h1>

    <app-specimen-section minWidth="440px" title="Paginateurs">
      <app-specimen label="Simple" api="mat-paginator" [snippet]="snippets.simple">
        <mat-paginator [length]="100" [pageSize]="10" [pageSizeOptions]="[5, 10, 25]" aria-label="Pagination simple" />
      </app-specimen>
      <app-specimen label="Première et dernière page" api="showFirstLastButtons" [snippet]="snippets.extremites">
        <mat-paginator [length]="100" [pageSize]="10" showFirstLastButtons aria-label="Pagination avec extrémités" />
      </app-specimen>
      <app-specimen label="Sans choix de taille" api="hidePageSize" [snippet]="snippets.sansTaille">
        <mat-paginator [length]="100" [pageSize]="10" hidePageSize aria-label="Pagination sans taille" />
      </app-specimen>
      <app-specimen label="Page initiale" api="pageIndex" [snippet]="snippets.page">
        <mat-paginator [length]="100" [pageSize]="10" [pageIndex]="3" aria-label="Pagination page 4" />
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section minWidth="440px" title="État et libellés">
      <app-specimen label="Désactivé" api="disabled" [snippet]="snippets.desactive">
        <mat-paginator [length]="100" [pageSize]="10" disabled aria-label="Pagination désactivée" />
      </app-specimen>
      <app-specimen label="Traduction" api="MatPaginatorIntl" [snippet]="snippets.traduction">
        <p>Les libellés de cette page sont fournis en français via MatPaginatorIntl.</p>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section minWidth="440px" title="Volumes et liste de tailles">
      <app-specimen label="Grand volume" api="length: 12345" [snippet]="snippets.grandVolume">
        <mat-paginator [length]="12345" [pageSize]="50" [pageSizeOptions]="[10, 50, 100]" showFirstLastButtons aria-label="Pagination grand volume" />
      </app-specimen>
      <app-specimen label="Une seule page" api="length: 5" [snippet]="snippets.unePage">
        <mat-paginator [length]="5" [pageSize]="10" aria-label="Pagination une page" />
      </app-specimen>
      <app-specimen label="Liste de tailles sous le champ" api="selectConfig" [snippet]="snippets.panneau">
        <mat-paginator
          [length]="100"
          [pageSize]="10"
          [pageSizeOptions]="[5, 10, 25]"
          [selectConfig]="{ disableOptionCentering: true }"
          aria-label="Pagination liste sous le champ"
        />
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section
      minWidth="440px"
      title="Personnalisation (jetons)"
      description="Couleurs, hauteur et typographie du paginateur se règlent avec le mixin Sass mat.paginator-overrides ; les noms de jetons sont validés à la compilation."
    >
      <app-specimen label="Couleurs de rôle (secondaire)" api="mat.paginator-overrides : container-background-color" [snippet]="snippets.couleurs">
        <mat-paginator
          class="pagination-secondaire"
          [length]="100"
          [pageSize]="10"
          [pageSizeOptions]="[5, 10, 25]"
          aria-label="Pagination secondaire"
        />
      </app-specimen>
      <app-specimen label="Grande taille" api="mat.paginator-overrides : container-size" [snippet]="snippets.grande">
        <mat-paginator
          class="pagination-grande"
          [length]="100"
          [pageSize]="10"
          [pageSizeOptions]="[5, 10, 25]"
          aria-label="Pagination grande taille"
        />
      </app-specimen>
    </app-specimen-section>

    @if (families().length > 0) {
      <app-specimen-section
        minWidth="440px"
        title="Couleurs personnalisées"
        description="Familles de couleur propres au design system (--app-color-*), détectées dans le CSS chargé : même principe que les rôles M3, appliqué avec les jetons du design system (fond du paginateur et texte ensemble)."
      >
        @for (family of families(); track family.id) {
          <app-specimen [label]="family.label" [api]="family.api" [snippet]="family.snippet" [custom]="true">
            <span [appColorFamily]="family.id">
              <mat-paginator
                class="perso"
                [length]="100"
                [pageSize]="10"
                [pageSizeOptions]="[5, 10, 25]"
                [attr.aria-label]="'Pagination ' + family.label"
              />
            </span>
          </app-specimen>
        }
      </app-specimen-section>
    }
  `,
  styles: `
    @use '@angular/material' as mat;

    mat-paginator {
      width: 100%;
    }

    .pagination-secondaire {
      @include mat.paginator-overrides(
        (
          container-background-color: var(--mat-sys-secondary-container),
          container-text-color: var(--mat-sys-on-secondary-container),
          enabled-icon-color: var(--mat-sys-on-secondary-container),
        )
      );
    }

    .perso {
      @include mat.paginator-overrides(
        (
          container-background-color: var(--r-c),
          container-text-color: var(--r-sc),
          enabled-icon-color: var(--r-sc),
        )
      );
    }

    .pagination-grande {
      @include mat.paginator-overrides(
        (
          container-size: 72px,
          container-text-size: var(--mat-sys-body-large-size),
          container-text-line-height: var(--mat-sys-body-large-line-height),
          select-trigger-text-size: var(--mat-sys-body-large-size),
          page-size-select-width: 96px,
        )
      );
    }
  `,
})
export class PaginationPage {
  protected readonly snippets = SNIPPETS;

  private readonly detected = injectColorFamilies();

  /** Une famille par jeu `--app-color-*` complet (vide avec un thème Angular Material). */
  protected readonly families = computed(() =>
    this.detected().map(({ id, label }) => ({
      id,
      label,
      api: 'mat.paginator-overrides : container-background-color',
      snippet: customSnippet(id),
    })),
  );
}
