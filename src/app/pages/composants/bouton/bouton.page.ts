import { Component } from '@angular/core';
import { MatButton, MatFabButton, MatIconButton, MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Specimen } from '../../../shared/specimen/specimen';
import { SpecimenSection } from '../../../shared/specimen-section/specimen-section';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

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
  petit: `<button matButton="filled" class="petit">Petit</button>

/* Surcharge des jetons : Angular Material n'a pas d'API de taille */
.petit {
  --mat-button-filled-container-height: 32px;
  --mat-button-filled-horizontal-padding: 12px;
  --mat-button-filled-label-text-size: 12px;
}`,
  standard: `<button matButton="filled">Standard</button>`,
  grand: `<button matButton="filled" class="grand">Grand</button>

.grand {
  --mat-button-filled-container-height: 56px;
  --mat-button-filled-horizontal-padding: 32px;
  --mat-button-filled-label-text-size: 18px;
}`,
  tresGrand: `<button matButton="filled" class="tres-grand">Très grand</button>

.tres-grand {
  --mat-button-filled-container-height: 72px;
  --mat-button-filled-horizontal-padding: 40px;
  --mat-button-filled-label-text-size: 22px;
}`,
  iconePetit: `<button matIconButton class="icone-petit" aria-label="Favori"><mat-icon>favorite</mat-icon></button>

.icone-petit {
  --mat-icon-button-state-layer-size: 32px;
  --mat-icon-button-icon-size: 18px;
}
.icone-petit .mat-icon {
  width: 18px;
  height: 18px;
  font-size: 18px;
}`,
  iconeGrand: `<button matIconButton class="icone-grand" aria-label="Favori"><mat-icon>favorite</mat-icon></button>

.icone-grand {
  --mat-icon-button-state-layer-size: 56px;
  --mat-icon-button-icon-size: 32px;
}
.icone-grand .mat-icon {
  width: 32px;
  height: 32px;
  font-size: 32px;
}`,
  angulaire: `<button matButton="filled" class="angulaire">Angulaire</button>

.angulaire {
  --mat-button-filled-container-shape: 0;
}`,
  arrondi: `<button matButton="filled" class="arrondi">Arrondi</button>

.arrondi {
  --mat-button-filled-container-shape: 8px;
}`,
  couleurPrimaire: `<button matButton="filled">Rempli</button>

/* Couleur primaire : défaut du thème, aucune surcharge */`,
  couleurSecondaire: `<button matButton="filled" class="secondaire">Rempli</button>

.secondaire {
  --mat-button-filled-container-color: var(--mat-sys-secondary);
  --mat-button-filled-label-text-color: var(--mat-sys-on-secondary);
  --mat-button-filled-state-layer-color: var(--mat-sys-on-secondary);

  --mat-button-tonal-container-color: var(--mat-sys-secondary-container);
  --mat-button-tonal-label-text-color: var(--mat-sys-on-secondary-container);
  --mat-button-tonal-state-layer-color: var(--mat-sys-on-secondary-container);

  --mat-button-outlined-label-text-color: var(--mat-sys-secondary);
  --mat-button-outlined-outline-color: var(--mat-sys-secondary);
  --mat-button-outlined-state-layer-color: var(--mat-sys-secondary);

  --mat-button-text-label-text-color: var(--mat-sys-secondary);
  --mat-button-text-state-layer-color: var(--mat-sys-secondary);

  --mat-button-protected-label-text-color: var(--mat-sys-secondary);
  --mat-button-protected-state-layer-color: var(--mat-sys-secondary);
}`,
  couleurTertiaire: `<button matButton="filled" class="tertiaire">Rempli</button>

.tertiaire {
  --mat-button-filled-container-color: var(--mat-sys-tertiary);
  --mat-button-filled-label-text-color: var(--mat-sys-on-tertiary);
  --mat-button-filled-state-layer-color: var(--mat-sys-on-tertiary);

  --mat-button-tonal-container-color: var(--mat-sys-tertiary-container);
  --mat-button-tonal-label-text-color: var(--mat-sys-on-tertiary-container);
  --mat-button-tonal-state-layer-color: var(--mat-sys-on-tertiary-container);

  --mat-button-outlined-label-text-color: var(--mat-sys-tertiary);
  --mat-button-outlined-outline-color: var(--mat-sys-tertiary);
  --mat-button-outlined-state-layer-color: var(--mat-sys-tertiary);

  --mat-button-text-label-text-color: var(--mat-sys-tertiary);
  --mat-button-text-state-layer-color: var(--mat-sys-tertiary);

  --mat-button-protected-label-text-color: var(--mat-sys-tertiary);
  --mat-button-protected-state-layer-color: var(--mat-sys-tertiary);
}`,
  couleurErreur: `<button matButton="filled" class="erreur">Rempli</button>

.erreur {
  --mat-button-filled-container-color: var(--mat-sys-error);
  --mat-button-filled-label-text-color: var(--mat-sys-on-error);
  --mat-button-filled-state-layer-color: var(--mat-sys-on-error);

  --mat-button-tonal-container-color: var(--mat-sys-error-container);
  --mat-button-tonal-label-text-color: var(--mat-sys-on-error-container);
  --mat-button-tonal-state-layer-color: var(--mat-sys-on-error-container);

  --mat-button-outlined-label-text-color: var(--mat-sys-error);
  --mat-button-outlined-outline-color: var(--mat-sys-error);
  --mat-button-outlined-state-layer-color: var(--mat-sys-error);

  --mat-button-text-label-text-color: var(--mat-sys-error);
  --mat-button-text-state-layer-color: var(--mat-sys-error);

  --mat-button-protected-label-text-color: var(--mat-sys-error);
  --mat-button-protected-state-layer-color: var(--mat-sys-error);
}`,
  couleurIcone: `<button matIconButton aria-label="Favori"><mat-icon>favorite</mat-icon></button>
<button matIconButton class="secondaire" aria-label="Favori"><mat-icon>favorite</mat-icon></button>
<button matIconButton class="tertiaire" aria-label="Favori"><mat-icon>favorite</mat-icon></button>
<button matIconButton class="erreur" aria-label="Favori"><mat-icon>favorite</mat-icon></button>

.secondaire {
  --mat-icon-button-icon-color: var(--mat-sys-secondary);
  --mat-icon-button-state-layer-color: var(--mat-sys-secondary);
}

.tertiaire {
  --mat-icon-button-icon-color: var(--mat-sys-tertiary);
  --mat-icon-button-state-layer-color: var(--mat-sys-tertiary);
}

.erreur {
  --mat-icon-button-icon-color: var(--mat-sys-error);
  --mat-icon-button-state-layer-color: var(--mat-sys-error);
}`,
  couleurFab: `<button matFab aria-label="Modifier"><mat-icon>edit</mat-icon></button>
<button matFab class="secondaire" aria-label="Modifier"><mat-icon>edit</mat-icon></button>
<button matFab class="tertiaire" aria-label="Modifier"><mat-icon>edit</mat-icon></button>
<button matFab class="erreur" aria-label="Modifier"><mat-icon>edit</mat-icon></button>

/* Mêmes classes et jetons pour matMiniFab et matFab extended */
.secondaire {
  --mat-fab-container-color: var(--mat-sys-secondary-container);
  --mat-fab-foreground-color: var(--mat-sys-on-secondary-container);
  --mat-fab-state-layer-color: var(--mat-sys-on-secondary-container);
  --mat-fab-small-container-color: var(--mat-sys-secondary-container);
  --mat-fab-small-foreground-color: var(--mat-sys-on-secondary-container);
  --mat-fab-small-state-layer-color: var(--mat-sys-on-secondary-container);
}

.tertiaire {
  --mat-fab-container-color: var(--mat-sys-tertiary-container);
  --mat-fab-foreground-color: var(--mat-sys-on-tertiary-container);
  --mat-fab-state-layer-color: var(--mat-sys-on-tertiary-container);
  --mat-fab-small-container-color: var(--mat-sys-tertiary-container);
  --mat-fab-small-foreground-color: var(--mat-sys-on-tertiary-container);
  --mat-fab-small-state-layer-color: var(--mat-sys-on-tertiary-container);
}

.erreur {
  --mat-fab-container-color: var(--mat-sys-error-container);
  --mat-fab-foreground-color: var(--mat-sys-on-error-container);
  --mat-fab-state-layer-color: var(--mat-sys-on-error-container);
  --mat-fab-small-container-color: var(--mat-sys-error-container);
  --mat-fab-small-foreground-color: var(--mat-sys-on-error-container);
  --mat-fab-small-state-layer-color: var(--mat-sys-on-error-container);
}`,
  pilule: `<button matButton="filled">Pilule (défaut)</button>`,
  chargement: `<button matButton="filled" [showProgress]="true" aria-label="Enregistrement en cours">
  <mat-progress-spinner progressIndicator mode="indeterminate" diameter="18" aria-hidden="true" [attr.tabindex]="null" />
  Enregistrer
</button>`,
  inactifFocalisable: `<button matButton="filled" disabledInteractive>Désactivé, focalisable</button>`,
  lien: `<a matButton="outlined" href="https://angular.dev" target="_blank" rel="noopener">Lien externe</a>`,
  iconeFin: `<button matButton="filled">
  Suivant
  <mat-icon iconPositionEnd>arrow_forward</mat-icon>
</button>`,
};

@Component({
  selector: 'app-bouton-page',
  imports: [MatButton, MatIconButton, MatFabButton, MatMiniFabButton, MatIcon, Specimen, SpecimenSection, MatProgressSpinner],
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

    <app-specimen-section
      title="Tailles"
      description="Angular Material n’expose pas d’API de taille : ces variantes surchargent les jetons CSS --mat-button-* (hauteur, marges, texte). La densité du thème agit aussi sur la hauteur."
    >
      <app-specimen label="Petit" api="--mat-button-*-container-height: 32px" [snippet]="snippets.petit">
        <button matButton="text" class="petit">Texte</button>
        <button matButton="filled" class="petit">Rempli</button>
        <button matButton="tonal" class="petit">Tonal</button>
        <button matButton="outlined" class="petit">Contour</button>
      </app-specimen>
      <app-specimen label="Standard" api="40 px (défaut)" [snippet]="snippets.standard">
        <button matButton="text">Texte</button>
        <button matButton="filled">Rempli</button>
        <button matButton="tonal">Tonal</button>
        <button matButton="outlined">Contour</button>
      </app-specimen>
      <app-specimen label="Grand" api="--mat-button-*-container-height: 56px" [snippet]="snippets.grand">
        <button matButton="text" class="grand">Texte</button>
        <button matButton="filled" class="grand">Rempli</button>
        <button matButton="tonal" class="grand">Tonal</button>
        <button matButton="outlined" class="grand">Contour</button>
      </app-specimen>
      <app-specimen label="Très grand" api="--mat-button-*-container-height: 72px" [snippet]="snippets.tresGrand">
        <button matButton="filled" class="tres-grand">Rempli</button>
        <button matButton="outlined" class="tres-grand">Contour</button>
      </app-specimen>
      <app-specimen label="Bouton icône petit" api="--mat-icon-button-state-layer-size: 32px" [snippet]="snippets.iconePetit">
        <button matIconButton class="icone-petit" aria-label="Favori"><mat-icon>favorite</mat-icon></button>
      </app-specimen>
      <app-specimen label="Bouton icône grand" api="--mat-icon-button-state-layer-size: 56px" [snippet]="snippets.iconeGrand">
        <button matIconButton class="icone-grand" aria-label="Favori"><mat-icon>favorite</mat-icon></button>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section
      title="Couleurs"
      description="L’entrée color est réservée aux thèmes M2 et reste sans effet ici. Les rôles de couleur M3 s’obtiennent en surchargeant les jetons --mat-button-* avec les jetons système --mat-sys-* (fond et texte ensemble, pour garder le contraste)."
    >
      <app-specimen label="Primaire (défaut)" api="--mat-sys-primary" [snippet]="snippets.couleurPrimaire">
        <button matButton="text">Texte</button>
        <button matButton="filled">Rempli</button>
        <button matButton="tonal">Tonal</button>
        <button matButton="elevated">Relevé</button>
        <button matButton="outlined">Contour</button>
      </app-specimen>
      <app-specimen label="Secondaire" api="--mat-sys-secondary" [snippet]="snippets.couleurSecondaire">
        <button matButton="text" class="secondaire">Texte</button>
        <button matButton="filled" class="secondaire">Rempli</button>
        <button matButton="tonal" class="secondaire">Tonal</button>
        <button matButton="elevated" class="secondaire">Relevé</button>
        <button matButton="outlined" class="secondaire">Contour</button>
      </app-specimen>
      <app-specimen label="Tertiaire" api="--mat-sys-tertiary" [snippet]="snippets.couleurTertiaire">
        <button matButton="text" class="tertiaire">Texte</button>
        <button matButton="filled" class="tertiaire">Rempli</button>
        <button matButton="tonal" class="tertiaire">Tonal</button>
        <button matButton="elevated" class="tertiaire">Relevé</button>
        <button matButton="outlined" class="tertiaire">Contour</button>
      </app-specimen>
      <app-specimen label="Erreur" api="--mat-sys-error" [snippet]="snippets.couleurErreur">
        <button matButton="text" class="erreur">Texte</button>
        <button matButton="filled" class="erreur">Rempli</button>
        <button matButton="tonal" class="erreur">Tonal</button>
        <button matButton="elevated" class="erreur">Relevé</button>
        <button matButton="outlined" class="erreur">Contour</button>
      </app-specimen>
      <app-specimen label="Boutons icône" api="--mat-icon-button-icon-color" [snippet]="snippets.couleurIcone">
        <button matIconButton aria-label="Favori primaire"><mat-icon>favorite</mat-icon></button>
        <button matIconButton class="secondaire" aria-label="Favori secondaire"><mat-icon>favorite</mat-icon></button>
        <button matIconButton class="tertiaire" aria-label="Favori tertiaire"><mat-icon>favorite</mat-icon></button>
        <button matIconButton class="erreur" aria-label="Favori erreur"><mat-icon>favorite</mat-icon></button>
      </app-specimen>
      <app-specimen label="FAB" api="--mat-fab-container-color" [snippet]="snippets.couleurFab">
        <button matFab aria-label="Modifier primaire"><mat-icon>edit</mat-icon></button>
        <button matFab class="secondaire" aria-label="Modifier secondaire"><mat-icon>edit</mat-icon></button>
        <button matFab class="tertiaire" aria-label="Modifier tertiaire"><mat-icon>edit</mat-icon></button>
        <button matFab class="erreur" aria-label="Modifier erreur"><mat-icon>edit</mat-icon></button>
        <button matMiniFab class="secondaire" aria-label="Modifier secondaire"><mat-icon>edit</mat-icon></button>
        <button matMiniFab class="tertiaire" aria-label="Modifier tertiaire"><mat-icon>edit</mat-icon></button>
        <button matMiniFab class="erreur" aria-label="Modifier erreur"><mat-icon>edit</mat-icon></button>
        <button matFab extended class="erreur"><mat-icon>edit</mat-icon>Modifier</button>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section title="Formes" description="Rayon des angles via le jeton --mat-button-*-container-shape.">
      <app-specimen label="Pilule (défaut)" api="corner-full" [snippet]="snippets.pilule">
        <button matButton="filled">Rempli</button>
        <button matButton="outlined">Contour</button>
      </app-specimen>
      <app-specimen label="Arrondi" api="--mat-button-*-container-shape: 8px" [snippet]="snippets.arrondi">
        <button matButton="filled" class="arrondi">Rempli</button>
        <button matButton="outlined" class="arrondi">Contour</button>
      </app-specimen>
      <app-specimen label="Angulaire" api="--mat-button-*-container-shape: 0" [snippet]="snippets.angulaire">
        <button matButton="filled" class="angulaire">Rempli</button>
        <button matButton="outlined" class="angulaire">Contour</button>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section title="Contenus et états">
      <app-specimen label="Icône à droite" api="iconPositionEnd" [snippet]="snippets.iconeFin">
        <button matButton="filled">Suivant<mat-icon iconPositionEnd>arrow_forward</mat-icon></button>
        <button matButton="outlined">Suivant<mat-icon iconPositionEnd>arrow_forward</mat-icon></button>
      </app-specimen>
      <app-specimen label="Chargement" api="showProgress + progressIndicator" [snippet]="snippets.chargement">
        <button matButton="filled" [showProgress]="true" aria-label="Enregistrement en cours">
          <mat-progress-spinner progressIndicator mode="indeterminate" diameter="18" aria-hidden="true" [attr.tabindex]="null" />
          Enregistrer
        </button>
        <button matButton="outlined" [showProgress]="true" aria-label="Enregistrement en cours">
          <mat-progress-spinner progressIndicator mode="indeterminate" diameter="18" aria-hidden="true" [attr.tabindex]="null" />
          Enregistrer
        </button>
      </app-specimen>
      <app-specimen label="Désactivé mais focalisable" api="disabledInteractive" [snippet]="snippets.inactifFocalisable">
        <button matButton="filled" [disabledInteractive]="true" disabled>Désactivé</button>
      </app-specimen>
      <app-specimen label="Lien" api="a matButton" [snippet]="snippets.lien">
        <a matButton="outlined" href="https://angular.dev" target="_blank" rel="noopener">Lien externe</a>
      </app-specimen>
    </app-specimen-section>
  `,
  styles: `
    @mixin taille($hauteur, $marge, $texte) {
      @each $variante in (filled, tonal, outlined, text, protected) {
        --mat-button-#{$variante}-container-height: #{$hauteur};
        --mat-button-#{$variante}-horizontal-padding: #{$marge};
        --mat-button-#{$variante}-label-text-size: #{$texte};
      }
    }

    @mixin forme($rayon) {
      @each $variante in (filled, tonal, outlined, text, protected) {
        --mat-button-#{$variante}-container-shape: #{$rayon};
      }
    }

    .petit {
      @include taille(32px, 12px, 12px);
    }

    .grand {
      @include taille(56px, 32px, 18px);
    }

    .tres-grand {
      @include taille(72px, 40px, 22px);
    }

    .arrondi {
      @include forme(8px);
    }

    .angulaire {
      @include forme(0);
    }

    .secondaire,
    .tertiaire,
    .erreur {
      --mat-button-filled-container-color: var(--r-f);
      --mat-button-filled-label-text-color: var(--r-sf);
      --mat-button-filled-state-layer-color: var(--r-sf);
      --mat-button-tonal-container-color: var(--r-c);
      --mat-button-tonal-label-text-color: var(--r-sc);
      --mat-button-tonal-state-layer-color: var(--r-sc);
      --mat-button-outlined-label-text-color: var(--r-f);
      --mat-button-outlined-outline-color: var(--r-f);
      --mat-button-outlined-state-layer-color: var(--r-f);
      --mat-button-text-label-text-color: var(--r-f);
      --mat-button-text-state-layer-color: var(--r-f);
      --mat-button-protected-label-text-color: var(--r-f);
      --mat-button-protected-state-layer-color: var(--r-f);
      --mat-icon-button-icon-color: var(--r-f);
      --mat-icon-button-state-layer-color: var(--r-f);
      --mat-fab-container-color: var(--r-c);
      --mat-fab-foreground-color: var(--r-sc);
      --mat-fab-state-layer-color: var(--r-sc);
      --mat-fab-small-container-color: var(--r-c);
      --mat-fab-small-foreground-color: var(--r-sc);
      --mat-fab-small-state-layer-color: var(--r-sc);
    }

    @mixin role($role) {
      --r-f: var(--mat-sys-#{$role});
      --r-sf: var(--mat-sys-on-#{$role});
      --r-c: var(--mat-sys-#{$role}-container);
      --r-sc: var(--mat-sys-on-#{$role}-container);
    }

    .secondaire {
      @include role(secondary);
    }

    .tertiaire {
      @include role(tertiary);
    }

    .erreur {
      @include role(error);
    }

    @mixin taille-icone($zone, $icone) {
      --mat-icon-button-state-layer-size: #{$zone};
      --mat-icon-button-icon-size: #{$icone};

      .mat-icon {
        width: $icone;
        height: $icone;
        font-size: $icone;
      }
    }

    .icone-petit {
      @include taille-icone(32px, 18px);
    }

    .icone-grand {
      @include taille-icone(56px, 32px);
    }
  `,
})
export class BoutonPage {
  protected readonly snippets = SNIPPETS;
}
