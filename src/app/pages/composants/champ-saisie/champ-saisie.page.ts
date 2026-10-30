import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormField, MatHint, MatLabel, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { Specimen } from '../../../shared/specimen/specimen';
import { SpecimenSection } from '../../../shared/specimen-section/specimen-section';

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
  `,
})
export class ChampSaisiePage {
  protected readonly snippets = SNIPPETS;
  protected readonly nom = new FormControl('', { nonNullable: true, validators: Validators.required });

  constructor() {
    this.nom.markAsTouched();
  }
}
