import { Component, computed } from '@angular/core';
import { injectColorFamilies } from '../../../core/tokens/color-families';
import { ColorFamilyScope } from '../../../shared/color-family-scope/color-family-scope';
import { MatIcon } from '@angular/material/icon';
import {
  MatTab,
  MatTabGroup,
  MatTabLabel,
  MatTabLink,
  MatTabNav,
  MatTabNavPanel,
} from '@angular/material/tabs';
import { Specimen } from '../../../shared/specimen/specimen';
import { SpecimenSection } from '../../../shared/specimen-section/specimen-section';
import { ComposantRef } from '../../../shared/composant-ref/composant-ref';

const SNIPPETS = {
  simple: `<mat-tab-group>
  <mat-tab label="Général">Contenu général</mat-tab>
  <mat-tab label="Détails">Contenu des détails</mat-tab>
  <mat-tab label="Historique">Contenu de l’historique</mat-tab>
</mat-tab-group>`,
  icones: `<mat-tab-group>
  <mat-tab>
    <ng-template mat-tab-label>
      <mat-icon>home</mat-icon>
      Accueil
    </ng-template>
    Contenu de l’accueil
  </mat-tab>
  <mat-tab>
    <ng-template mat-tab-label>
      <mat-icon>settings</mat-icon>
      Réglages
    </ng-template>
    Contenu des réglages
  </mat-tab>
</mat-tab-group>`,
  desactive: `<mat-tab-group>
  <mat-tab label="Actif">Contenu</mat-tab>
  <mat-tab label="Désactivé" disabled>Contenu</mat-tab>
</mat-tab-group>`,
  etire: `<mat-tab-group mat-stretch-tabs="true">
  <mat-tab label="Général">Contenu général</mat-tab>
  <mat-tab label="Détails">Contenu des détails</mat-tab>
</mat-tab-group>`,
  navigation: `<nav mat-tab-nav-bar [tabPanel]="panneau">
  <a mat-tab-link href="#" active>Général</a>
  <a mat-tab-link href="#">Détails</a>
</nav>
<mat-tab-nav-panel #panneau>Contenu de l’onglet actif</mat-tab-nav-panel>`,
  centres: `<mat-tab-group mat-align-tabs="center" [mat-stretch-tabs]="false">
  <mat-tab label="Général">…</mat-tab>
  <mat-tab label="Détails">…</mat-tab>
</mat-tab-group>`,
  nonEtires: `<mat-tab-group [mat-stretch-tabs]="false">
  <mat-tab label="Général">…</mat-tab>
  <mat-tab label="Détails">…</mat-tab>
</mat-tab-group>`,
  fin: `<mat-tab-group mat-align-tabs="end" [mat-stretch-tabs]="false">
  <mat-tab label="Général">…</mat-tab>
  <mat-tab label="Détails">…</mat-tab>
</mat-tab-group>`,
  bas: `<mat-tab-group headerPosition="below">
  <mat-tab label="Général">…</mat-tab>
  <mat-tab label="Détails">…</mat-tab>
</mat-tab-group>`,
  barreAjustee: `<mat-tab-group [fitInkBarToContent]="true" [mat-stretch-tabs]="false">
  <mat-tab label="Général">…</mat-tab>
  <mat-tab label="Détails du dossier">…</mat-tab>
</mat-tab-group>`,
  initial: `<mat-tab-group [selectedIndex]="1">
  <mat-tab label="Général">…</mat-tab>
  <mat-tab label="Détails">…</mat-tab>
</mat-tab-group>`,
  hauteur: `<mat-tab-group dynamicHeight>
  <mat-tab label="Court">Peu de contenu</mat-tab>
  <mat-tab label="Long">Beaucoup de contenu…</mat-tab>
</mat-tab-group>`,
  defilement: `<mat-tab-group>
  @for (onglet of onglets; track onglet) {
    <mat-tab [label]="onglet">…</mat-tab>
  }
</mat-tab-group>`,
  sansPagination: `<mat-tab-group [disablePagination]="true">
  @for (onglet of onglets; track onglet) {
    <mat-tab [label]="onglet">…</mat-tab>
  }
</mat-tab-group>`,
  sansAnimation: `<mat-tab-group animationDuration="0ms">
  <mat-tab label="Général">…</mat-tab>
  <mat-tab label="Détails">…</mat-tab>
</mat-tab-group>`,
  navAjustee: `<nav mat-tab-nav-bar [tabPanel]="panneau" [fitInkBarToContent]="true">
  <a mat-tab-link active>Général</a>
  <a mat-tab-link>Détails du dossier</a>
</nav>`,
  couleurs: `<mat-tab-group class="secondaire">…</mat-tab-group>
<mat-tab-group class="tertiaire">…</mat-tab-group>
<mat-tab-group class="erreur">…</mat-tab-group>

@use '@angular/material' as mat;

@mixin role($couleur) {
  @include mat.tabs-overrides((
    active-indicator-color: $couleur,
    active-hover-indicator-color: $couleur,
    active-focus-indicator-color: $couleur,
    active-label-text-color: $couleur,
    active-hover-label-text-color: $couleur,
    active-focus-label-text-color: $couleur,
    active-ripple-color: $couleur,
  ));
}

.secondaire {
  @include role(var(--mat-sys-secondary));
}

.tertiaire {
  @include role(var(--mat-sys-tertiary));
}

.erreur {
  @include role(var(--mat-sys-error));
}`,
  indicateur: `<mat-tab-group class="indicateur-epais">
  <mat-tab label="Général">…</mat-tab>
  <mat-tab label="Détails">…</mat-tab>
</mat-tab-group>

@use '@angular/material' as mat;

.indicateur-epais {
  @include mat.tabs-overrides((
    active-indicator-height: 4px,
    active-indicator-shape: var(--mat-sys-corner-full),
  ));
}`,
  grands: `<mat-tab-group class="onglets-grands">
  <mat-tab label="Général">…</mat-tab>
  <mat-tab label="Détails">…</mat-tab>
</mat-tab-group>

@use '@angular/material' as mat;

.onglets-grands {
  @include mat.tabs-overrides((
    container-height: 64px,
    label-text-size: var(--mat-sys-title-medium-size),
    label-text-line-height: var(--mat-sys-title-medium-line-height),
  ));
}`,
};

/** Snippet d'une famille personnalisée, dérivé de son nom (la liste des familles est détectée, pas écrite à la main). */
function customSnippet(id: string): string {
  const role = `--app-color-${id}`;
  return `<mat-tab-group class="${id}">…</mat-tab-group>

@use '@angular/material' as mat;

.${id} {
  @include mat.tabs-overrides((
    active-indicator-color: var(${role}),
    active-hover-indicator-color: var(${role}),
    active-focus-indicator-color: var(${role}),
    active-label-text-color: var(${role}),
    active-hover-label-text-color: var(${role}),
    active-focus-label-text-color: var(${role}),
    active-ripple-color: var(${role}),
  ));
}`;
}

@Component({
  selector: 'app-onglets-page',
  imports: [
    ComposantRef,
    MatIcon,
    MatTab,
    MatTabGroup,
    MatTabLabel,
    MatTabLink,
    MatTabNav,
    MatTabNavPanel,
    Specimen,
    SpecimenSection,
    ColorFamilyScope,
  ],
  template: `
    <h1>Onglets</h1>
    <app-composant-ref />

    <app-specimen-section minWidth="340px" title="Groupes d’onglets">
      <app-specimen label="Simple" api="mat-tab-group" [snippet]="snippets.simple">
        <mat-tab-group class="onglets">
          <mat-tab label="Général"><p>Contenu général</p></mat-tab>
          <mat-tab label="Détails"><p>Contenu des détails</p></mat-tab>
          <mat-tab label="Historique"><p>Contenu de l’historique</p></mat-tab>
        </mat-tab-group>
      </app-specimen>
      <app-specimen label="Avec icônes" api="mat-tab-label" [snippet]="snippets.icones">
        <mat-tab-group class="onglets">
          <mat-tab>
            <ng-template mat-tab-label>
              <mat-icon>home</mat-icon>
              Accueil
            </ng-template>
            <p>Contenu de l’accueil</p>
          </mat-tab>
          <mat-tab>
            <ng-template mat-tab-label>
              <mat-icon>settings</mat-icon>
              Réglages
            </ng-template>
            <p>Contenu des réglages</p>
          </mat-tab>
        </mat-tab-group>
      </app-specimen>
      <app-specimen label="Onglets étirés (défaut)" api='mat-stretch-tabs="true"' [snippet]="snippets.etire">
        <mat-tab-group class="onglets" mat-stretch-tabs="true">
          <mat-tab label="Général"><p>Contenu général</p></mat-tab>
          <mat-tab label="Détails"><p>Contenu des détails</p></mat-tab>
        </mat-tab-group>
      </app-specimen>
      <app-specimen label="Onglet désactivé" api="disabled" [snippet]="snippets.desactive">
        <mat-tab-group class="onglets">
          <mat-tab label="Actif"><p>Contenu</p></mat-tab>
          <mat-tab label="Désactivé" disabled><p>Contenu</p></mat-tab>
        </mat-tab-group>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section minWidth="340px" title="Barre de navigation">
      <app-specimen label="Liens" api="mat-tab-nav-bar" [snippet]="snippets.navigation">
        <div class="onglets">
          <nav mat-tab-nav-bar [tabPanel]="panneau" aria-label="Sections">
            <a mat-tab-link active>Général</a>
            <a mat-tab-link>Détails</a>
          </nav>
          <mat-tab-nav-panel #panneau><p>Contenu de l’onglet actif</p></mat-tab-nav-panel>
        </div>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section minWidth="340px" title="Alignement et position">
      <app-specimen label="Centrés" api='mat-align-tabs="center"' [snippet]="snippets.centres">
        <mat-tab-group class="onglets" mat-align-tabs="center" [mat-stretch-tabs]="false">
          <mat-tab label="Général"><p>Contenu général</p></mat-tab>
          <mat-tab label="Détails"><p>Contenu des détails</p></mat-tab>
        </mat-tab-group>
      </app-specimen>
      <app-specimen label="Non étirés" api='[mat-stretch-tabs]="false"' [snippet]="snippets.nonEtires">
        <mat-tab-group class="onglets" [mat-stretch-tabs]="false">
          <mat-tab label="Général"><p>Contenu général</p></mat-tab>
          <mat-tab label="Détails"><p>Contenu des détails</p></mat-tab>
        </mat-tab-group>
      </app-specimen>
      <app-specimen label="À la fin" api='mat-align-tabs="end"' [snippet]="snippets.fin">
        <mat-tab-group class="onglets" mat-align-tabs="end" [mat-stretch-tabs]="false">
          <mat-tab label="Général"><p>Contenu général</p></mat-tab>
          <mat-tab label="Détails"><p>Contenu des détails</p></mat-tab>
        </mat-tab-group>
      </app-specimen>
      <app-specimen label="En-tête en bas" api='headerPosition="below"' [snippet]="snippets.bas">
        <mat-tab-group class="onglets" headerPosition="below">
          <mat-tab label="Général"><p>Contenu général</p></mat-tab>
          <mat-tab label="Détails"><p>Contenu des détails</p></mat-tab>
        </mat-tab-group>
      </app-specimen>
      <app-specimen label="Barre ajustée au texte" api="fitInkBarToContent" [snippet]="snippets.barreAjustee">
        <mat-tab-group class="onglets" [fitInkBarToContent]="true" [mat-stretch-tabs]="false">
          <mat-tab label="Général"><p>Contenu général</p></mat-tab>
          <mat-tab label="Détails du dossier"><p>Contenu des détails</p></mat-tab>
        </mat-tab-group>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section minWidth="340px" title="Comportements">
      <app-specimen label="Onglet initial" api="selectedIndex" [snippet]="snippets.initial">
        <mat-tab-group class="onglets" [selectedIndex]="1">
          <mat-tab label="Général"><p>Contenu général</p></mat-tab>
          <mat-tab label="Détails"><p>Onglet sélectionné au chargement</p></mat-tab>
        </mat-tab-group>
      </app-specimen>
      <app-specimen label="Hauteur dynamique" api="dynamicHeight" [snippet]="snippets.hauteur">
        <mat-tab-group class="onglets" dynamicHeight>
          <mat-tab label="Court"><p>Peu de contenu</p></mat-tab>
          <mat-tab label="Long">
            <p>Beaucoup de contenu.</p>
            <p>La hauteur s’adapte à l’onglet actif.</p>
            <p>Troisième ligne.</p>
          </mat-tab>
        </mat-tab-group>
      </app-specimen>
      <app-specimen label="Sans animation" api='animationDuration="0ms"' [snippet]="snippets.sansAnimation">
        <mat-tab-group class="onglets" animationDuration="0ms">
          <mat-tab label="Général"><p>Contenu général</p></mat-tab>
          <mat-tab label="Détails"><p>Contenu des détails</p></mat-tab>
        </mat-tab-group>
      </app-specimen>
      <app-specimen label="Nombreux onglets (défilement)" api="pagination automatique" [snippet]="snippets.defilement">
        <mat-tab-group class="onglets">
          @for (onglet of onglets; track onglet) {
            <mat-tab [label]="onglet"><p>Contenu de {{ onglet }}</p></mat-tab>
          }
        </mat-tab-group>
      </app-specimen>
      <app-specimen label="Sans flèches de défilement" api="disablePagination" [snippet]="snippets.sansPagination">
        <mat-tab-group class="onglets" [disablePagination]="true">
          @for (onglet of onglets; track onglet) {
            <mat-tab [label]="onglet"><p>Contenu de {{ onglet }}</p></mat-tab>
          }
        </mat-tab-group>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section
      minWidth="340px"
      title="Personnalisation (jetons)"
      description="Le mixin Sass mat.tabs-overrides règle couleurs, indicateur et dimensions des onglets ; les noms de jetons sont validés à la compilation. Les couleurs viennent des jetons système --mat-sys-* (rôles sur fond de surface, contraste conservé)."
    >
      <app-specimen label="Rôles de couleur" api="mat.tabs-overrides : active-indicator-color" [snippet]="snippets.couleurs">
        <mat-tab-group class="onglets secondaire">
          <mat-tab label="Général"><p>Contenu général</p></mat-tab>
          <mat-tab label="Détails"><p>Contenu des détails</p></mat-tab>
        </mat-tab-group>
        <mat-tab-group class="onglets tertiaire">
          <mat-tab label="Général"><p>Contenu général</p></mat-tab>
          <mat-tab label="Détails"><p>Contenu des détails</p></mat-tab>
        </mat-tab-group>
        <mat-tab-group class="onglets erreur">
          <mat-tab label="Général"><p>Contenu général</p></mat-tab>
          <mat-tab label="Détails"><p>Contenu des détails</p></mat-tab>
        </mat-tab-group>
      </app-specimen>
      <app-specimen label="Indicateur épais et arrondi" api="mat.tabs-overrides : active-indicator-height" [snippet]="snippets.indicateur">
        <mat-tab-group class="onglets indicateur-epais">
          <mat-tab label="Général"><p>Contenu général</p></mat-tab>
          <mat-tab label="Détails"><p>Contenu des détails</p></mat-tab>
        </mat-tab-group>
      </app-specimen>
      <app-specimen label="Onglets hauts, texte plus grand" api="mat.tabs-overrides : container-height" [snippet]="snippets.grands">
        <mat-tab-group class="onglets onglets-grands">
          <mat-tab label="Général"><p>Contenu général</p></mat-tab>
          <mat-tab label="Détails"><p>Contenu des détails</p></mat-tab>
        </mat-tab-group>
      </app-specimen>
    </app-specimen-section>

    @if (families().length > 0) {
      <app-specimen-section
        minWidth="340px"
        title="Couleurs personnalisées"
        description="Familles de couleur propres au design system (--app-color-*), détectées dans le CSS chargé : même principe que les rôles M3, appliqué avec les jetons du design system (indicateur, libellé actif et ondulation sur la surface de la page)."
      >
        @for (family of families(); track family.id) {
          <app-specimen [label]="family.label" [api]="family.api" [snippet]="family.snippet" [custom]="true">
            <span [appColorFamily]="family.id">
              <mat-tab-group class="onglets perso">
                <mat-tab label="Général"><p>Contenu général, famille {{ family.label }}</p></mat-tab>
                <mat-tab label="Détails"><p>Contenu des détails</p></mat-tab>
              </mat-tab-group>
            </span>
          </app-specimen>
        }
      </app-specimen-section>
    }
  `,
  styles: `
    @use '@angular/material' as mat;
    @use 'roles';

    .onglets {
      width: 100%;
    }

    .secondaire {
      @include roles.tabs(var(--mat-sys-secondary));
    }

    .tertiaire {
      @include roles.tabs(var(--mat-sys-tertiary));
    }

    .erreur {
      @include roles.tabs(var(--mat-sys-error));
    }

    .perso {
      @include roles.tabs(var(--r-f));
    }

    .indicateur-epais {
      @include mat.tabs-overrides(
        (
          active-indicator-height: 4px,
          active-indicator-shape: var(--mat-sys-corner-full),
        )
      );
    }

    .onglets-grands {
      @include mat.tabs-overrides(
        (
          container-height: 64px,
          label-text-size: var(--mat-sys-title-medium-size),
          label-text-line-height: var(--mat-sys-title-medium-line-height),
        )
      );
    }
  `,
})
export class OngletsPage {
  protected readonly snippets = SNIPPETS;
  protected readonly onglets = Array.from({ length: 12 }, (_, index) => `Onglet ${index + 1}`);

  private readonly detected = injectColorFamilies();

  /** Une famille par jeu `--app-color-*` complet (vide avec un thème Angular Material). */
  protected readonly families = computed(() =>
    this.detected().map(({ id, label }) => ({ id, label, api: 'mat.tabs-overrides : active-indicator-color', snippet: customSnippet(id) })),
  );
}
