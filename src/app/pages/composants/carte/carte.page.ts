import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardAvatar,
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { Specimen } from '../../../shared/specimen/specimen';
import { SpecimenSection } from '../../../shared/specimen-section/specimen-section';
import { MatProgressBar } from '@angular/material/progress-bar';

const SNIPPETS = {
  releve: `<mat-card appearance="raised">
  <mat-card-header>
    <mat-card-title>Titre</mat-card-title>
    <mat-card-subtitle>Sous-titre</mat-card-subtitle>
  </mat-card-header>
  <mat-card-content>Contenu de la carte.</mat-card-content>
</mat-card>`,
  contour: `<mat-card appearance="outlined">
  <mat-card-header>
    <mat-card-title>Titre</mat-card-title>
    <mat-card-subtitle>Sous-titre</mat-card-subtitle>
  </mat-card-header>
  <mat-card-content>Contenu de la carte.</mat-card-content>
</mat-card>`,
  remplie: `<mat-card appearance="filled">
  <mat-card-header>
    <mat-card-title>Titre</mat-card-title>
    <mat-card-subtitle>Sous-titre</mat-card-subtitle>
  </mat-card-header>
  <mat-card-content>Contenu de la carte.</mat-card-content>
</mat-card>`,
  actions: `<mat-card appearance="outlined">
  <mat-card-header>
    <mat-card-title>Titre</mat-card-title>
  </mat-card-header>
  <mat-card-content>Contenu de la carte.</mat-card-content>
  <mat-card-actions>
    <button matButton>Annuler</button>
    <button matButton="filled">Valider</button>
  </mat-card-actions>
</mat-card>`,
  avatar: `<mat-card appearance="outlined">
  <mat-card-header>
    <mat-icon matCardAvatar>account_circle</mat-icon>
    <mat-card-title>Marie Dupont</mat-card-title>
    <mat-card-subtitle>Cheffe de projet</mat-card-subtitle>
  </mat-card-header>
</mat-card>`,
  actionsFin: `<mat-card appearance="outlined">
  <mat-card-content>Contenu de la carte.</mat-card-content>
  <mat-card-actions align="end">
    <button matButton>Annuler</button>
    <button matButton="filled">Valider</button>
  </mat-card-actions>
</mat-card>`,
  pied: `<mat-card appearance="outlined">
  <mat-card-header>
    <mat-card-title>Téléversement</mat-card-title>
  </mat-card-header>
  <mat-card-content>Fichier en cours d'envoi.</mat-card-content>
  <mat-card-footer>
    <mat-progress-bar mode="determinate" value="60" aria-label="Progression" />
  </mat-card-footer>
</mat-card>`,
  contenuSeul: `<mat-card appearance="outlined">
  <mat-card-content>Une carte réduite à son contenu.</mat-card-content>
</mat-card>`,
  couleurs: `<mat-card appearance="filled" class="carte-secondaire">
  <mat-card-header>
    <mat-card-title>Secondaire</mat-card-title>
    <mat-card-subtitle>Sous-titre</mat-card-subtitle>
  </mat-card-header>
  <mat-card-content>Contenu de la carte.</mat-card-content>
</mat-card>
<mat-card appearance="filled" class="carte-tertiaire">…</mat-card>
<mat-card appearance="filled" class="carte-erreur">…</mat-card>

@use '@angular/material' as mat;

/* Le texte du titre et du contenu hérite de color : à fixer avec le fond */
.carte-secondaire {
  color: var(--mat-sys-on-secondary-container);
  @include mat.card-overrides((
    filled-container-color: var(--mat-sys-secondary-container),
    subtitle-text-color: var(--mat-sys-on-secondary-container),
  ));
}

.carte-tertiaire {
  color: var(--mat-sys-on-tertiary-container);
  @include mat.card-overrides((
    filled-container-color: var(--mat-sys-tertiary-container),
    subtitle-text-color: var(--mat-sys-on-tertiary-container),
  ));
}

.carte-erreur {
  color: var(--mat-sys-on-error-container);
  @include mat.card-overrides((
    filled-container-color: var(--mat-sys-error-container),
    subtitle-text-color: var(--mat-sys-on-error-container),
  ));
}`,
  formes: `<mat-card appearance="outlined" class="carte-angulaire">
  <mat-card-content>Angles droits.</mat-card-content>
</mat-card>
<mat-card appearance="outlined" class="carte-arrondie">
  <mat-card-content>Angles très arrondis.</mat-card-content>
</mat-card>

@use '@angular/material' as mat;

.carte-angulaire {
  @include mat.card-overrides((
    outlined-container-shape: var(--mat-sys-corner-none),
  ));
}

.carte-arrondie {
  @include mat.card-overrides((
    outlined-container-shape: var(--mat-sys-corner-extra-large),
  ));
}`,
  relief: `<mat-card appearance="raised" class="carte-relief">
  <mat-card-content>Relief marqué.</mat-card-content>
</mat-card>

@use '@angular/material' as mat;

.carte-relief {
  @include mat.card-overrides((
    elevated-container-elevation: var(--mat-sys-level4),
  ));
}`,
  typographie: `<mat-card appearance="outlined" class="carte-titre">
  <mat-card-header>
    <mat-card-title>Titre de la carte</mat-card-title>
    <mat-card-subtitle>Sous-titre</mat-card-subtitle>
  </mat-card-header>
  <mat-card-content>Contenu de la carte.</mat-card-content>
</mat-card>

@use '@angular/material' as mat;

.carte-titre {
  @include mat.card-overrides((
    title-text-size: var(--mat-sys-headline-medium-size),
    title-text-line-height: var(--mat-sys-headline-medium-line-height),
    subtitle-text-size: var(--mat-sys-body-medium-size),
    subtitle-text-color: var(--mat-sys-primary),
  ));
}`,
};

@Component({
  selector: 'app-carte-page',
  imports: [
    MatButton,
    MatCard,
    MatCardActions,
    MatCardAvatar,
    MatCardContent,
    MatCardFooter,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatIcon,
    Specimen,
    SpecimenSection,
    MatProgressBar,
  ],
  template: `
    <h1>Carte</h1>

    <app-specimen-section minWidth="360px" title="Apparences">
      <app-specimen label="Relevée" api='appearance="raised"' [snippet]="snippets.releve">
        <mat-card appearance="raised">
          <mat-card-header>
            <mat-card-title>Titre</mat-card-title>
            <mat-card-subtitle>Sous-titre</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>Contenu de la carte.</mat-card-content>
        </mat-card>
      </app-specimen>
      <app-specimen label="Contour" api='appearance="outlined"' [snippet]="snippets.contour">
        <mat-card appearance="outlined">
          <mat-card-header>
            <mat-card-title>Titre</mat-card-title>
            <mat-card-subtitle>Sous-titre</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>Contenu de la carte.</mat-card-content>
        </mat-card>
      </app-specimen>
      <app-specimen label="Remplie" api='appearance="filled"' [snippet]="snippets.remplie">
        <mat-card appearance="filled">
          <mat-card-header>
            <mat-card-title>Titre</mat-card-title>
            <mat-card-subtitle>Sous-titre</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>Contenu de la carte.</mat-card-content>
        </mat-card>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section minWidth="360px" title="Contenu">
      <app-specimen label="Avec actions" api="mat-card-actions" [snippet]="snippets.actions">
        <mat-card appearance="outlined">
          <mat-card-header>
            <mat-card-title>Titre</mat-card-title>
          </mat-card-header>
          <mat-card-content>Contenu de la carte.</mat-card-content>
          <mat-card-actions>
            <button matButton>Annuler</button>
            <button matButton="filled">Valider</button>
          </mat-card-actions>
        </mat-card>
      </app-specimen>
      <app-specimen label="Avec avatar" api="matCardAvatar" [snippet]="snippets.avatar">
        <mat-card appearance="outlined">
          <mat-card-header>
            <mat-icon matCardAvatar>account_circle</mat-icon>
            <mat-card-title>Marie Dupont</mat-card-title>
            <mat-card-subtitle>Cheffe de projet</mat-card-subtitle>
          </mat-card-header>
        </mat-card>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section minWidth="360px" title="Composition">
      <app-specimen label="Contenu seul" api="mat-card-content" [snippet]="snippets.contenuSeul">
        <mat-card appearance="outlined">
          <mat-card-content>Une carte réduite à son contenu.</mat-card-content>
        </mat-card>
      </app-specimen>
      <app-specimen label="Actions à droite" api='mat-card-actions align="end"' [snippet]="snippets.actionsFin">
        <mat-card appearance="outlined">
          <mat-card-content>Contenu de la carte.</mat-card-content>
          <mat-card-actions align="end">
            <button matButton>Annuler</button>
            <button matButton="filled">Valider</button>
          </mat-card-actions>
        </mat-card>
      </app-specimen>
      <app-specimen label="Avec pied de carte" api="mat-card-footer" [snippet]="snippets.pied">
        <mat-card appearance="outlined">
          <mat-card-header>
            <mat-card-title>Téléversement</mat-card-title>
          </mat-card-header>
          <mat-card-content>Fichier en cours d’envoi.</mat-card-content>
          <mat-card-footer>
            <mat-progress-bar mode="determinate" value="60" aria-label="Progression" />
          </mat-card-footer>
        </mat-card>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section
      minWidth="360px"
      title="Personnalisation (jetons)"
      description="Couleurs, formes, relief et typographie se règlent avec le mixin Sass mat.card-overrides ; les noms de jetons sont validés à la compilation."
    >
      <app-specimen label="Couleurs de rôle" api="mat.card-overrides : filled-container-color" [snippet]="snippets.couleurs">
        <mat-card appearance="filled" class="carte-secondaire">
          <mat-card-header>
            <mat-card-title>Secondaire</mat-card-title>
            <mat-card-subtitle>Sous-titre</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>Contenu de la carte.</mat-card-content>
        </mat-card>
        <mat-card appearance="filled" class="carte-tertiaire">
          <mat-card-header>
            <mat-card-title>Tertiaire</mat-card-title>
            <mat-card-subtitle>Sous-titre</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>Contenu de la carte.</mat-card-content>
        </mat-card>
        <mat-card appearance="filled" class="carte-erreur">
          <mat-card-header>
            <mat-card-title>Erreur</mat-card-title>
            <mat-card-subtitle>Sous-titre</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>Contenu de la carte.</mat-card-content>
        </mat-card>
      </app-specimen>
      <app-specimen label="Formes" api="mat.card-overrides : outlined-container-shape" [snippet]="snippets.formes">
        <mat-card appearance="outlined" class="carte-angulaire">
          <mat-card-content>Angles droits.</mat-card-content>
        </mat-card>
        <mat-card appearance="outlined" class="carte-arrondie">
          <mat-card-content>Angles très arrondis.</mat-card-content>
        </mat-card>
      </app-specimen>
      <app-specimen label="Relief marqué" api="mat.card-overrides : elevated-container-elevation" [snippet]="snippets.relief">
        <mat-card appearance="raised" class="carte-relief">
          <mat-card-content>Relief marqué.</mat-card-content>
        </mat-card>
      </app-specimen>
      <app-specimen label="Titre et sous-titre" api="mat.card-overrides : title-text-size" [snippet]="snippets.typographie">
        <mat-card appearance="outlined" class="carte-titre">
          <mat-card-header>
            <mat-card-title>Titre de la carte</mat-card-title>
            <mat-card-subtitle>Sous-titre</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>Contenu de la carte.</mat-card-content>
        </mat-card>
      </app-specimen>
    </app-specimen-section>
  `,
  styles: `
    @use '@angular/material' as mat;

    mat-card {
      width: 100%;
    }

    // Le texte du titre et du contenu hérite de color : on le fixe avec le fond
    @mixin role($role) {
      color: var(--mat-sys-on-#{$role}-container);

      @include mat.card-overrides(
        (
          filled-container-color: var(--mat-sys-#{$role}-container),
          subtitle-text-color: var(--mat-sys-on-#{$role}-container),
        )
      );
    }

    .carte-secondaire {
      @include role(secondary);
    }

    .carte-tertiaire {
      @include role(tertiary);
    }

    .carte-erreur {
      @include role(error);
    }

    .carte-angulaire {
      @include mat.card-overrides((outlined-container-shape: var(--mat-sys-corner-none)));
    }

    .carte-arrondie {
      @include mat.card-overrides((outlined-container-shape: var(--mat-sys-corner-extra-large)));
    }

    .carte-relief {
      @include mat.card-overrides((elevated-container-elevation: var(--mat-sys-level4)));
    }

    .carte-titre {
      @include mat.card-overrides(
        (
          title-text-size: var(--mat-sys-headline-medium-size),
          title-text-line-height: var(--mat-sys-headline-medium-line-height),
          subtitle-text-size: var(--mat-sys-body-medium-size),
          subtitle-text-color: var(--mat-sys-primary),
        )
      );
    }
  `,
})
export class CartePage {
  protected readonly snippets = SNIPPETS;
}
