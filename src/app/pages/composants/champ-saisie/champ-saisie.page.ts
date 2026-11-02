import { Component, computed } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormField, MatHint, MatLabel, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { injectColorFamilies } from '../../../core/tokens/color-families';
import { ColorFamilyScope } from '../../../shared/color-family-scope/color-family-scope';
import { Specimen } from '../../../shared/specimen/specimen';
import { SpecimenSection } from '../../../shared/specimen-section/specimen-section';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MatIconButton } from '@angular/material/button';

/** Snippet d'une famille personnalisée, dérivé de son nom (la liste des familles est détectée, pas écrite à la main). */
function customSnippet(id: string): string {
  const couleur = `var(--app-color-${id})`;
  const conteneur = `var(--app-color-on-${id}-container)`;
  return `<mat-form-field appearance="outline" class="${id}">
  <mat-label>${id}</mat-label>
  <input matInput />
</mat-form-field>
<mat-form-field appearance="fill" class="${id}-rempli">
  <mat-label>${id}</mat-label>
  <input matInput />
</mat-form-field>

@use '@angular/material' as mat;

.${id} {
  @include mat.form-field-overrides((
    outlined-outline-color: ${couleur},
    outlined-hover-outline-color: ${couleur},
    outlined-focus-outline-color: ${couleur},
    outlined-label-text-color: ${couleur},
    outlined-hover-label-text-color: ${couleur},
    outlined-focus-label-text-color: ${couleur},
    outlined-caret-color: ${couleur},
  ));
}

.${id}-rempli {
  @include mat.form-field-overrides((
    filled-container-color: var(--app-color-${id}-container),
    filled-input-text-color: ${conteneur},
    filled-label-text-color: ${conteneur},
    filled-hover-label-text-color: ${conteneur},
    filled-focus-label-text-color: ${conteneur},
    filled-active-indicator-color: ${conteneur},
    filled-hover-active-indicator-color: ${conteneur},
    filled-focus-active-indicator-color: ${conteneur},
    filled-caret-color: ${conteneur},
  ));
}`;
}

const SNIPPETS = {
  rempli: `<mat-form-field appearance="fill">
  <mat-label>Nom</mat-label>
  <input matInput />
</mat-form-field>`,
  contour: `<mat-form-field appearance="outline">
  <mat-label>Nom</mat-label>
  <input matInput />
</mat-form-field>`,
  indice: `<mat-form-field>
  <mat-label>E-mail</mat-label>
  <input matInput type="email" />
  <mat-hint>Format : nom@domaine.fr</mat-hint>
</mat-form-field>`,
  icones: `<mat-form-field>
  <mat-label>Recherche</mat-label>
  <mat-icon matPrefix>search</mat-icon>
  <input matInput />
  <mat-icon matSuffix>close</mat-icon>
</mat-form-field>`,
  texte: `<mat-form-field>
  <mat-label>Commentaire</mat-label>
  <textarea matInput rows="3"></textarea>
</mat-form-field>`,
  valeur: `<mat-form-field>
  <mat-label>Ville</mat-label>
  <input matInput value="Rennes" />
</mat-form-field>`,
  desactive: `<mat-form-field>
  <mat-label>Nom</mat-label>
  <input matInput value="Désactivé" disabled />
</mat-form-field>`,
  lectureSeule: `<mat-form-field>
  <mat-label>Identifiant</mat-label>
  <input matInput value="A-1042" readonly />
</mat-form-field>`,
  erreur: `<mat-form-field>
  <mat-label>Nom</mat-label>
  <input matInput [formControl]="nom" />
  <mat-error>Le nom est obligatoire.</mat-error>
</mat-form-field>`,
  compteur: `<mat-form-field>
  <mat-label>Pseudo</mat-label>
  <input matInput maxlength="20" #pseudo />
  <mat-hint align="end">{{ pseudo.value.length }} / 20</mat-hint>
</mat-form-field>`,
  motDePasse: `<mat-form-field>
  <mat-label>Mot de passe</mat-label>
  <input matInput type="password" value="secret123" />
</mat-form-field>`,
  nombre: `<mat-form-field>
  <mat-label>Quantité</mat-label>
  <input matInput type="number" min="0" max="10" value="3" />
</mat-form-field>`,
  email: `<mat-form-field>
  <mat-label>E-mail</mat-label>
  <input matInput type="email" placeholder="nom@domaine.fr" />
</mat-form-field>`,
  recherche: `<mat-form-field>
  <mat-label>Recherche</mat-label>
  <input matInput type="search" />
</mat-form-field>`,
  placeholderSeul: `<mat-form-field>
  <input matInput placeholder="Rechercher…" aria-label="Rechercher" />
</mat-form-field>`,
  flottantToujours: `<mat-form-field floatLabel="always">
  <mat-label>Nom</mat-label>
  <input matInput placeholder="Dupont" />
</mat-form-field>`,
  sousChampFixe: `<mat-form-field subscriptSizing="fixed">
  <mat-label>Nom</mat-label>
  <input matInput />
</mat-form-field>`,
  sousChampDynamique: `<mat-form-field subscriptSizing="dynamic">
  <mat-label>Nom</mat-label>
  <input matInput />
</mat-form-field>`,
  obligatoire: `<mat-form-field>
  <mat-label>Nom</mat-label>
  <input matInput required />
</mat-form-field>`,
  sansAsterisque: `<mat-form-field [hideRequiredMarker]="true">
  <mat-label>Nom</mat-label>
  <input matInput required />
</mat-form-field>`,
  prefixeTexte: `<mat-form-field>
  <mat-label>Montant</mat-label>
  <span matTextPrefix>€&nbsp;</span>
  <input matInput type="number" value="12" />
  <span matTextSuffix>,00</span>
</mat-form-field>`,
  boutonSuffixe: `<mat-form-field>
  <mat-label>Recherche</mat-label>
  <input matInput value="Angular" />
  <button matIconButton matSuffix aria-label="Effacer"><mat-icon>close</mat-icon></button>
</mat-form-field>`,
  indiceDebutFin: `<mat-form-field>
  <mat-label>Description</mat-label>
  <input matInput maxlength="40" />
  <mat-hint>Texte court</mat-hint>
  <mat-hint align="end">0 / 40</mat-hint>
</mat-form-field>`,
  hintLabel: `<mat-form-field hintLabel="Indice via hintLabel">
  <mat-label>Nom</mat-label>
  <input matInput />
</mat-form-field>`,
  autosize: `<mat-form-field>
  <mat-label>Commentaire</mat-label>
  <textarea matInput cdkTextareaAutosize cdkAutosizeMinRows="2" cdkAutosizeMaxRows="5"></textarea>
</mat-form-field>`,
  natif: `<mat-form-field>
  <mat-label>Pays</mat-label>
  <select matNativeControl>
    <option value="fr">France</option>
    <option value="be">Belgique</option>
  </select>
</mat-form-field>`,
  inactifFocalisable: `<mat-form-field>
  <mat-label>Nom</mat-label>
  <input matInput value="Désactivé" disabledInteractive disabled />
</mat-form-field>`,
  contourArrondi: `<mat-form-field appearance="outline" class="contour-arrondi">
  <mat-label>Nom</mat-label>
  <input matInput />
</mat-form-field>

@use '@angular/material' as mat;

.contour-arrondi {
  @include mat.form-field-overrides((
    outlined-container-shape: var(--mat-sys-corner-large),
    outlined-outline-width: 2px,
    outlined-focus-outline-width: 3px,
  ));
}`,
  roles: `<mat-form-field appearance="outline" class="secondaire">
  <mat-label>Secondaire</mat-label>
  <input matInput />
</mat-form-field>
<mat-form-field appearance="outline" class="tertiaire">
  <mat-label>Tertiaire</mat-label>
  <input matInput />
</mat-form-field>

@use '@angular/material' as mat;

.secondaire {
  @include mat.form-field-overrides((
    outlined-outline-color: var(--mat-sys-secondary),
    outlined-hover-outline-color: var(--mat-sys-secondary),
    outlined-focus-outline-color: var(--mat-sys-secondary),
    outlined-label-text-color: var(--mat-sys-secondary),
    outlined-hover-label-text-color: var(--mat-sys-secondary),
    outlined-focus-label-text-color: var(--mat-sys-secondary),
    outlined-caret-color: var(--mat-sys-secondary),
  ));
}

/* Mêmes jetons avec --mat-sys-tertiary (.tertiaire) */`,
  fondTeinte: `<mat-form-field appearance="fill" class="fond-teinte">
  <mat-label>Nom</mat-label>
  <input matInput />
</mat-form-field>

@use '@angular/material' as mat;

.fond-teinte {
  @include mat.form-field-overrides((
    filled-container-color: var(--mat-sys-secondary-container),
    filled-input-text-color: var(--mat-sys-on-secondary-container),
    filled-label-text-color: var(--mat-sys-on-secondary-container),
    filled-hover-label-text-color: var(--mat-sys-on-secondary-container),
    filled-focus-label-text-color: var(--mat-sys-on-secondary-container),
    filled-active-indicator-color: var(--mat-sys-on-secondary-container),
    filled-hover-active-indicator-color: var(--mat-sys-on-secondary-container),
    filled-focus-active-indicator-color: var(--mat-sys-on-secondary-container),
    filled-caret-color: var(--mat-sys-on-secondary-container),
  ));
}`,
};

@Component({
  selector: 'app-champ-saisie-page',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatHint,
    MatError,
    MatPrefix,
    MatSuffix,
    MatInput,
    MatIcon,
    Specimen,
    SpecimenSection,
    CdkTextareaAutosize,
    MatIconButton,
    ColorFamilyScope,
  ],
  template: `
    <h1>Champ de saisie</h1>

    <app-specimen-section minWidth="340px" title="Apparences">
      <app-specimen label="Rempli" api='appearance="fill"' [snippet]="snippets.rempli">
        <mat-form-field appearance="fill">
          <mat-label>Nom</mat-label>
          <input matInput />
        </mat-form-field>
      </app-specimen>
      <app-specimen label="Contour" api='appearance="outline"' [snippet]="snippets.contour">
        <mat-form-field appearance="outline">
          <mat-label>Nom</mat-label>
          <input matInput />
        </mat-form-field>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section minWidth="340px" title="Contenu">
      <app-specimen label="Avec indice" api="mat-hint" [snippet]="snippets.indice">
        <mat-form-field>
          <mat-label>E-mail</mat-label>
          <input matInput type="email" />
          <mat-hint>Format : nom&#64;domaine.fr</mat-hint>
        </mat-form-field>
      </app-specimen>
      <app-specimen label="Avec icônes" api="matPrefix / matSuffix" [snippet]="snippets.icones">
        <mat-form-field>
          <mat-label>Recherche</mat-label>
          <mat-icon matPrefix>search</mat-icon>
          <input matInput />
          <mat-icon matSuffix>close</mat-icon>
        </mat-form-field>
      </app-specimen>
      <app-specimen label="Zone de texte" api="textarea matInput" [snippet]="snippets.texte">
        <mat-form-field>
          <mat-label>Commentaire</mat-label>
          <textarea matInput rows="3"></textarea>
        </mat-form-field>
      </app-specimen>
      <app-specimen label="Avec valeur" api="value" [snippet]="snippets.valeur">
        <mat-form-field>
          <mat-label>Ville</mat-label>
          <input matInput value="Rennes" />
        </mat-form-field>
      </app-specimen>
      <app-specimen label="Compteur de caractères" api="maxlength" [snippet]="snippets.compteur">
        <mat-form-field>
          <mat-label>Pseudo</mat-label>
          <input matInput maxlength="20" #pseudo />
          <mat-hint align="end">{{ pseudo.value.length }} / 20</mat-hint>
        </mat-form-field>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section minWidth="340px" title="États">
      <app-specimen label="Désactivé" api="disabled" [snippet]="snippets.desactive">
        <mat-form-field>
          <mat-label>Nom</mat-label>
          <input matInput value="Désactivé" disabled />
        </mat-form-field>
      </app-specimen>
      <app-specimen label="Lecture seule" api="readonly" [snippet]="snippets.lectureSeule">
        <mat-form-field>
          <mat-label>Identifiant</mat-label>
          <input matInput value="A-1042" readonly />
        </mat-form-field>
      </app-specimen>
      <app-specimen label="Avec erreur" api="mat-error" [snippet]="snippets.erreur">
        <mat-form-field>
          <mat-label>Nom</mat-label>
          <input matInput [formControl]="nom" />
          <mat-error>Le nom est obligatoire.</mat-error>
        </mat-form-field>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section minWidth="340px" title="Types de saisie">
      <app-specimen label="Mot de passe" api='type="password"' [snippet]="snippets.motDePasse">
        <mat-form-field>
          <mat-label>Mot de passe</mat-label>
          <input matInput type="password" value="secret123" />
        </mat-form-field>
      </app-specimen>
      <app-specimen label="Nombre" api='type="number"' [snippet]="snippets.nombre">
        <mat-form-field>
          <mat-label>Quantité</mat-label>
          <input matInput type="number" min="0" max="10" value="3" />
        </mat-form-field>
      </app-specimen>
      <app-specimen label="E-mail" api='type="email"' [snippet]="snippets.email">
        <mat-form-field>
          <mat-label>E-mail</mat-label>
          <input matInput type="email" placeholder="nom&#64;domaine.fr" />
        </mat-form-field>
      </app-specimen>
      <app-specimen label="Recherche" api='type="search"' [snippet]="snippets.recherche">
        <mat-form-field>
          <mat-label>Recherche</mat-label>
          <input matInput type="search" />
        </mat-form-field>
      </app-specimen>
      <app-specimen label="Liste native" api="select matNativeControl" [snippet]="snippets.natif">
        <mat-form-field>
          <mat-label>Pays</mat-label>
          <select matNativeControl>
            <option value="fr">France</option>
            <option value="be">Belgique</option>
          </select>
        </mat-form-field>
      </app-specimen>
      <app-specimen label="Zone de texte auto-ajustable" api="cdkTextareaAutosize" [snippet]="snippets.autosize">
        <mat-form-field>
          <mat-label>Commentaire</mat-label>
          <textarea matInput cdkTextareaAutosize cdkAutosizeMinRows="2" cdkAutosizeMaxRows="5"></textarea>
        </mat-form-field>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section
      minWidth="340px"
      title="Libellé et présentation compacte"
      description="Variantes sans libellé (placeholder seul) et sans espace réservé sous le champ."
    >
      <app-specimen label="Placeholder seul (sans libellé)" api="placeholder" [snippet]="snippets.placeholderSeul">
        <mat-form-field>
          <input matInput placeholder="Rechercher…" aria-label="Rechercher" />
        </mat-form-field>
      </app-specimen>
      <app-specimen label="Libellé toujours flottant" api='floatLabel="always"' [snippet]="snippets.flottantToujours">
        <mat-form-field floatLabel="always">
          <mat-label>Nom</mat-label>
          <input matInput placeholder="Dupont" />
        </mat-form-field>
      </app-specimen>
      <app-specimen label="Sous-champ fixe (défaut)" api='subscriptSizing="fixed"' [snippet]="snippets.sousChampFixe">
        <mat-form-field subscriptSizing="fixed">
          <mat-label>Nom</mat-label>
          <input matInput />
        </mat-form-field>
        <mat-form-field subscriptSizing="fixed">
          <mat-label>Prénom</mat-label>
          <input matInput />
        </mat-form-field>
      </app-specimen>
      <app-specimen label="Sous-champ dynamique (compact)" api='subscriptSizing="dynamic"' [snippet]="snippets.sousChampDynamique">
        <mat-form-field subscriptSizing="dynamic">
          <mat-label>Nom</mat-label>
          <input matInput />
        </mat-form-field>
        <mat-form-field subscriptSizing="dynamic">
          <mat-label>Prénom</mat-label>
          <input matInput />
        </mat-form-field>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section minWidth="340px" title="Contenu complémentaire">
      <app-specimen label="Obligatoire" api="required" [snippet]="snippets.obligatoire">
        <mat-form-field>
          <mat-label>Nom</mat-label>
          <input matInput required />
        </mat-form-field>
      </app-specimen>
      <app-specimen label="Obligatoire sans astérisque" api="hideRequiredMarker" [snippet]="snippets.sansAsterisque">
        <mat-form-field [hideRequiredMarker]="true">
          <mat-label>Nom</mat-label>
          <input matInput required />
        </mat-form-field>
      </app-specimen>
      <app-specimen label="Préfixe et suffixe texte" api="matTextPrefix / matTextSuffix" [snippet]="snippets.prefixeTexte">
        <mat-form-field>
          <mat-label>Montant</mat-label>
          <span matTextPrefix>€&nbsp;</span>
          <input matInput type="number" value="12" />
          <span matTextSuffix>,00</span>
        </mat-form-field>
      </app-specimen>
      <app-specimen label="Bouton d’effacement" api="matIconButton matSuffix" [snippet]="snippets.boutonSuffixe">
        <mat-form-field>
          <mat-label>Recherche</mat-label>
          <input matInput value="Angular" />
          <button matIconButton matSuffix aria-label="Effacer"><mat-icon>close</mat-icon></button>
        </mat-form-field>
      </app-specimen>
      <app-specimen label="Indices début et fin" api='mat-hint align="end"' [snippet]="snippets.indiceDebutFin">
        <mat-form-field>
          <mat-label>Description</mat-label>
          <input matInput maxlength="40" />
          <mat-hint>Texte court</mat-hint>
          <mat-hint align="end">0 / 40</mat-hint>
        </mat-form-field>
      </app-specimen>
      <app-specimen label="Indice via hintLabel" api="hintLabel" [snippet]="snippets.hintLabel">
        <mat-form-field hintLabel="Indice via hintLabel">
          <mat-label>Nom</mat-label>
          <input matInput />
        </mat-form-field>
      </app-specimen>
      <app-specimen label="Désactivé mais focalisable" api="disabledInteractive" [snippet]="snippets.inactifFocalisable">
        <mat-form-field>
          <mat-label>Nom</mat-label>
          <input matInput value="Désactivé" [disabledInteractive]="true" disabled />
        </mat-form-field>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section
      minWidth="340px"
      title="Personnalisation (jetons)"
      description="Forme, épaisseur et couleurs du champ via le mixin mat.form-field-overrides, avec les jetons système --mat-sys-* (noms de jetons validés à la compilation). La couleur d’erreur est déjà gérée par l’état invalide (mat-error) ; les largeurs de trait n’ont pas de jeton système."
    >
      <app-specimen label="Contour arrondi et épais" api="form-field-overrides : outlined-container-shape" [snippet]="snippets.contourArrondi">
        <mat-form-field appearance="outline" class="contour-arrondi">
          <mat-label>Nom</mat-label>
          <input matInput />
        </mat-form-field>
      </app-specimen>
      <app-specimen label="Rôles de couleur (contour)" api="form-field-overrides : outlined-outline-color" [snippet]="snippets.roles">
        <mat-form-field appearance="outline" class="secondaire">
          <mat-label>Secondaire</mat-label>
          <input matInput />
        </mat-form-field>
        <mat-form-field appearance="outline" class="tertiaire">
          <mat-label>Tertiaire</mat-label>
          <input matInput />
        </mat-form-field>
      </app-specimen>
      <app-specimen label="Rempli teinté" api="form-field-overrides : filled-container-color" [snippet]="snippets.fondTeinte">
        <mat-form-field appearance="fill" class="fond-teinte">
          <mat-label>Nom</mat-label>
          <input matInput />
        </mat-form-field>
      </app-specimen>
    </app-specimen-section>

    @if (families().length > 0) {
      <app-specimen-section
        minWidth="340px"
        title="Couleurs personnalisées"
        description="Familles de couleur propres au design system (--app-color-*), détectées dans le CSS chargé : même principe que les rôles M3, appliqué avec les jetons du design system (contour et libellé, ou fond du conteneur et texte ensemble)."
      >
        @for (family of families(); track family.id) {
          <app-specimen [label]="family.label" [api]="family.api" [snippet]="family.snippet" [custom]="true">
            <span [appColorFamily]="family.id">
              <mat-form-field appearance="outline" class="perso">
                <mat-label>{{ family.label }} (contour)</mat-label>
                <input matInput />
              </mat-form-field>
              <mat-form-field appearance="fill" class="perso-rempli">
                <mat-label>{{ family.label }} (rempli)</mat-label>
                <input matInput />
              </mat-form-field>
            </span>
          </app-specimen>
        }
      </app-specimen-section>
    }
  `,
  styles: `
    @use '@angular/material' as mat;
    @use 'roles';

    .contour-arrondi {
      @include mat.form-field-overrides(
        (
          outlined-container-shape: var(--mat-sys-corner-large),
          outlined-outline-width: 2px,
          outlined-focus-outline-width: 3px,
        )
      );
    }

    .secondaire {
      @include roles.form-field(secondary);
    }

    .tertiaire {
      @include roles.form-field(tertiary);
    }

    .perso {
      @include roles.form-field(custom);
    }

    .perso-rempli {
      @include mat.form-field-overrides(
        (
          filled-container-color: var(--r-c),
          filled-input-text-color: var(--r-sc),
          filled-label-text-color: var(--r-sc),
          filled-hover-label-text-color: var(--r-sc),
          filled-focus-label-text-color: var(--r-sc),
          filled-active-indicator-color: var(--r-sc),
          filled-hover-active-indicator-color: var(--r-sc),
          filled-focus-active-indicator-color: var(--r-sc),
          filled-caret-color: var(--r-sc),
        )
      );
    }

    .fond-teinte {
      @include mat.form-field-overrides(
        (
          filled-container-color: var(--mat-sys-secondary-container),
          filled-input-text-color: var(--mat-sys-on-secondary-container),
          filled-label-text-color: var(--mat-sys-on-secondary-container),
          filled-hover-label-text-color: var(--mat-sys-on-secondary-container),
          filled-focus-label-text-color: var(--mat-sys-on-secondary-container),
          filled-active-indicator-color: var(--mat-sys-on-secondary-container),
          filled-hover-active-indicator-color: var(--mat-sys-on-secondary-container),
          filled-focus-active-indicator-color: var(--mat-sys-on-secondary-container),
          filled-caret-color: var(--mat-sys-on-secondary-container),
        )
      );
    }
  `,
})
export class ChampSaisiePage {
  protected readonly snippets = SNIPPETS;
  protected readonly nom = new FormControl('', { nonNullable: true, validators: Validators.required });

  private readonly detected = injectColorFamilies();

  /** Une famille par jeu `--app-color-*` complet (vide avec un thème Angular Material). */
  protected readonly families = computed(() =>
    this.detected().map(({ id, label }) => ({ id, label, api: 'form-field-overrides : outlined-outline-color', snippet: customSnippet(id) })),
  );

  constructor() {
    this.nom.markAsTouched();
  }
}
