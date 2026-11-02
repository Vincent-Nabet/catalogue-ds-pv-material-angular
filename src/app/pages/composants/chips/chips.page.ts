import { Component } from '@angular/core';
import {
  MatChip,
  MatChipAvatar,
  MatChipGrid,
  MatChipInput,
  MatChipListbox,
  MatChipOption,
  MatChipRemove,
  MatChipRow,
  MatChipSet,
  MatChipTrailingIcon,
} from '@angular/material/chips';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { Specimen } from '../../../shared/specimen/specimen';
import { SpecimenSection } from '../../../shared/specimen-section/specimen-section';

const SNIPPETS = {
  ensemble: `<mat-chip-set aria-label="Technologies">
  <mat-chip>Angular</mat-chip>
  <mat-chip>TypeScript</mat-chip>
  <mat-chip>RxJS</mat-chip>
</mat-chip-set>`,
  icones: `<mat-chip-set aria-label="Avec icônes">
  <mat-chip>
    <mat-icon matChipAvatar>person</mat-icon>
    Avatar
  </mat-chip>
  <mat-chip>
    Icône finale
    <mat-icon matChipTrailingIcon>info</mat-icon>
  </mat-chip>
</mat-chip-set>`,
  desactive: `<mat-chip-set aria-label="Désactivés">
  <mat-chip disabled>Désactivé</mat-chip>
</mat-chip-set>`,
  selection: `<mat-chip-listbox aria-label="Couleur">
  <mat-chip-option>Rouge</mat-chip-option>
  <mat-chip-option selected>Vert</mat-chip-option>
  <mat-chip-option>Bleu</mat-chip-option>
</mat-chip-listbox>`,
  selectionMultiple: `<mat-chip-listbox aria-label="Options" multiple>
  <mat-chip-option selected>Wi-Fi</mat-chip-option>
  <mat-chip-option selected>Parking</mat-chip-option>
  <mat-chip-option>Piscine</mat-chip-option>
</mat-chip-listbox>`,
  selectionDesactivee: `<mat-chip-listbox aria-label="Couleur">
  <mat-chip-option>Rouge</mat-chip-option>
  <mat-chip-option disabled>Vert</mat-chip-option>
</mat-chip-listbox>`,
  saisie: `<mat-form-field>
  <mat-label>Étiquettes</mat-label>
  <mat-chip-grid #grille aria-label="Étiquettes">
    <mat-chip-row>
      Angular
      <button matChipRemove aria-label="Retirer Angular">
        <mat-icon>cancel</mat-icon>
      </button>
    </mat-chip-row>
    <mat-chip-row>
      Material
      <button matChipRemove aria-label="Retirer Material">
        <mat-icon>cancel</mat-icon>
      </button>
    </mat-chip-row>
  </mat-chip-grid>
  <input placeholder="Ajouter…" [matChipInputFor]="grille" />
</mat-form-field>`,
  miseEnEvidence: `<mat-chip-set aria-label="Mis en évidence">
  <mat-chip [highlighted]="true">Mis en évidence</mat-chip>
  <mat-chip>Normal</mat-chip>
</mat-chip-set>`,
  nonSelectionnable: `<mat-chip-listbox aria-label="Couleur" [selectable]="false">
  <mat-chip-option>Rouge</mat-chip-option>
  <mat-chip-option>Vert</mat-chip-option>
</mat-chip-listbox>`,
  modifiable: `<mat-chip-grid #grille aria-label="Chips modifiables">
  <mat-chip-row [editable]="true">Double-clic pour modifier</mat-chip-row>
</mat-chip-grid>`,
  formes: `<mat-chip-set aria-label="Formes">
  <mat-chip>Arrondi (défaut)</mat-chip>
  <mat-chip class="pilule">Pilule</mat-chip>
  <mat-chip class="angulaire">Angulaire</mat-chip>
</mat-chip-set>

@use '@angular/material' as mat;

.pilule {
  @include mat.chips-overrides((
    container-shape-radius: var(--mat-sys-corner-full),
  ));
}

.angulaire {
  @include mat.chips-overrides((
    container-shape-radius: var(--mat-sys-corner-none),
  ));
}`,
  roles: `<mat-chip-listbox aria-label="Rôles de couleur" multiple>
  <mat-chip-option selected>Secondaire (défaut)</mat-chip-option>
  <mat-chip-option selected class="primaire">Primaire</mat-chip-option>
  <mat-chip-option selected class="tertiaire">Tertiaire</mat-chip-option>
  <mat-chip-option selected class="erreur">Erreur</mat-chip-option>
</mat-chip-listbox>

@use '@angular/material' as mat;

.primaire {
  @include mat.chips-overrides((
    elevated-selected-container-color: var(--mat-sys-primary-container),
    selected-label-text-color: var(--mat-sys-on-primary-container),
    selected-hover-state-layer-color: var(--mat-sys-on-primary-container),
    selected-focus-state-layer-color: var(--mat-sys-on-primary-container),
  ));
}

/* Mêmes jetons avec primary → tertiary (.tertiaire) et error (.erreur) */`,
  remplis: `<mat-chip-set aria-label="Remplis" class="remplis">
  <mat-chip>Angular</mat-chip>
  <mat-chip>TypeScript</mat-chip>
  <mat-chip>RxJS</mat-chip>
</mat-chip-set>

@use '@angular/material' as mat;

.remplis {
  @include mat.chips-overrides((
    elevated-container-color: var(--mat-sys-surface-container-highest),
    outline-width: 0,
  ));
}`,
  grand: `<mat-chip-set aria-label="Grande taille" class="grand">
  <mat-chip>Angular</mat-chip>
  <mat-chip>TypeScript</mat-chip>
</mat-chip-set>

@use '@angular/material' as mat;

.grand {
  @include mat.chips-overrides((
    container-height: 40px,
    label-text-size: var(--mat-sys-title-medium-size),
  ));
}`,
};

@Component({
  selector: 'app-chips-page',
  imports: [
    MatChip,
    MatChipAvatar,
    MatChipGrid,
    MatChipInput,
    MatChipListbox,
    MatChipOption,
    MatChipRemove,
    MatChipRow,
    MatChipSet,
    MatChipTrailingIcon,
    MatFormField,
    MatLabel,
    MatIcon,
    Specimen,
    SpecimenSection,
  ],
  template: `
    <h1>Chips</h1>

    <app-specimen-section title="Informatifs">
      <app-specimen label="Ensemble" api="mat-chip-set" [snippet]="snippets.ensemble">
        <mat-chip-set aria-label="Technologies">
          <mat-chip>Angular</mat-chip>
          <mat-chip>TypeScript</mat-chip>
          <mat-chip>RxJS</mat-chip>
        </mat-chip-set>
      </app-specimen>
      <app-specimen label="Avec icônes" api="matChipAvatar / matChipTrailingIcon" [snippet]="snippets.icones">
        <mat-chip-set aria-label="Avec icônes">
          <mat-chip>
            <mat-icon matChipAvatar>person</mat-icon>
            Avatar
          </mat-chip>
          <mat-chip>
            Icône finale
            <mat-icon matChipTrailingIcon>info</mat-icon>
          </mat-chip>
        </mat-chip-set>
      </app-specimen>
      <app-specimen label="Désactivé" api="disabled" [snippet]="snippets.desactive">
        <mat-chip-set aria-label="Désactivés">
          <mat-chip disabled>Désactivé</mat-chip>
        </mat-chip-set>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section title="Sélection">
      <app-specimen label="Choix unique" api="mat-chip-listbox" [snippet]="snippets.selection">
        <mat-chip-listbox aria-label="Couleur">
          <mat-chip-option>Rouge</mat-chip-option>
          <mat-chip-option selected>Vert</mat-chip-option>
          <mat-chip-option>Bleu</mat-chip-option>
        </mat-chip-listbox>
      </app-specimen>
      <app-specimen label="Choix multiple" api="multiple" [snippet]="snippets.selectionMultiple">
        <mat-chip-listbox aria-label="Options" multiple>
          <mat-chip-option selected>Wi-Fi</mat-chip-option>
          <mat-chip-option selected>Parking</mat-chip-option>
          <mat-chip-option>Piscine</mat-chip-option>
        </mat-chip-listbox>
      </app-specimen>
      <app-specimen label="Option désactivée" api="mat-chip-option disabled" [snippet]="snippets.selectionDesactivee">
        <mat-chip-listbox aria-label="Couleur désactivée">
          <mat-chip-option>Rouge</mat-chip-option>
          <mat-chip-option disabled>Vert</mat-chip-option>
        </mat-chip-listbox>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section title="Saisie">
      <app-specimen label="Chips amovibles" api="mat-chip-grid / matChipRemove" [snippet]="snippets.saisie">
        <mat-form-field>
          <mat-label>Étiquettes</mat-label>
          <mat-chip-grid #grille aria-label="Étiquettes">
            <mat-chip-row>
              Angular
              <button matChipRemove aria-label="Retirer Angular">
                <mat-icon>cancel</mat-icon>
              </button>
            </mat-chip-row>
            <mat-chip-row>
              Material
              <button matChipRemove aria-label="Retirer Material">
                <mat-icon>cancel</mat-icon>
              </button>
            </mat-chip-row>
          </mat-chip-grid>
          <input placeholder="Ajouter…" [matChipInputFor]="grille" />
        </mat-form-field>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section title="Autres variantes">
      <app-specimen label="Mis en évidence" api="highlighted" [snippet]="snippets.miseEnEvidence">
        <mat-chip-set aria-label="Mis en évidence">
          <mat-chip [highlighted]="true">Mis en évidence</mat-chip>
          <mat-chip>Normal</mat-chip>
        </mat-chip-set>
      </app-specimen>
      <app-specimen label="Non sélectionnable" api="selectable" [snippet]="snippets.nonSelectionnable">
        <mat-chip-listbox aria-label="Couleur non sélectionnable" [selectable]="false">
          <mat-chip-option>Rouge</mat-chip-option>
          <mat-chip-option>Vert</mat-chip-option>
        </mat-chip-listbox>
      </app-specimen>
      <app-specimen label="Modifiable" api="mat-chip-row editable" [snippet]="snippets.modifiable">
        <mat-chip-grid aria-label="Chips modifiables">
          <mat-chip-row [editable]="true">Double-clic pour modifier</mat-chip-row>
        </mat-chip-grid>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section
      title="Personnalisation (jetons)"
      description="Formes, rôles de couleur, fond et taille via le mixin mat.chips-overrides, avec les jetons système --mat-sys-* pour les couleurs et les formes (noms de jetons validés à la compilation). La hauteur n’a pas de jeton système ; la densité du thème agit aussi dessus."
    >
      <app-specimen label="Formes" api="chips-overrides : container-shape-radius" [snippet]="snippets.formes">
        <mat-chip-set aria-label="Formes">
          <mat-chip>Arrondi (défaut)</mat-chip>
          <mat-chip class="pilule">Pilule</mat-chip>
          <mat-chip class="angulaire">Angulaire</mat-chip>
        </mat-chip-set>
      </app-specimen>
      <app-specimen label="Rôles de couleur (sélection)" api="chips-overrides : elevated-selected-container-color" [snippet]="snippets.roles">
        <mat-chip-listbox aria-label="Rôles de couleur" multiple>
          <mat-chip-option selected>Secondaire (défaut)</mat-chip-option>
          <mat-chip-option selected class="primaire">Primaire</mat-chip-option>
          <mat-chip-option selected class="tertiaire">Tertiaire</mat-chip-option>
          <mat-chip-option selected class="erreur">Erreur</mat-chip-option>
        </mat-chip-listbox>
      </app-specimen>
      <app-specimen label="Remplis, sans contour" api="chips-overrides : elevated-container-color" [snippet]="snippets.remplis">
        <mat-chip-set aria-label="Remplis" class="remplis">
          <mat-chip>Angular</mat-chip>
          <mat-chip>TypeScript</mat-chip>
          <mat-chip>RxJS</mat-chip>
        </mat-chip-set>
      </app-specimen>
      <app-specimen label="Grande taille" api="chips-overrides : container-height" [snippet]="snippets.grand">
        <mat-chip-set aria-label="Grande taille" class="grand">
          <mat-chip>Angular</mat-chip>
          <mat-chip>TypeScript</mat-chip>
        </mat-chip-set>
      </app-specimen>
    </app-specimen-section>
  `,
  styles: `
    @use '@angular/material' as mat;
    @use 'roles';

    .pilule {
      @include mat.chips-overrides(
        (
          container-shape-radius: var(--mat-sys-corner-full),
        )
      );
    }

    .angulaire {
      @include mat.chips-overrides(
        (
          container-shape-radius: var(--mat-sys-corner-none),
        )
      );
    }

    .primaire {
      @include roles.chips(primary);
    }

    .tertiaire {
      @include roles.chips(tertiary);
    }

    .erreur {
      @include roles.chips(error);
    }

    .remplis {
      @include mat.chips-overrides(
        (
          elevated-container-color: var(--mat-sys-surface-container-highest),
          outline-width: 0,
        )
      );
    }

    .grand {
      @include mat.chips-overrides(
        (
          container-height: 40px,
          label-text-size: var(--mat-sys-title-medium-size),
        )
      );
    }
  `,
})
export class ChipsPage {
  protected readonly snippets = SNIPPETS;
}
