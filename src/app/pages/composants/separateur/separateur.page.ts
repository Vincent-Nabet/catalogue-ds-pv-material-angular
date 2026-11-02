import { Component } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatListItem, MatListSubheaderCssMatStyler, MatList } from '@angular/material/list';
import { Specimen } from '../../../shared/specimen/specimen';
import { SpecimenSection } from '../../../shared/specimen-section/specimen-section';

const SNIPPETS = {
  horizontal: `<p>Au-dessus</p>
<mat-divider />
<p>En dessous</p>`,
  vertical: `<div style="display: flex; align-items: center; gap: 16px; height: 40px">
  <span>Gauche</span>
  <mat-divider vertical style="height: 100%" />
  <span>Droite</span>
</div>`,
  inset: `<mat-list>
  <mat-list-item>Premier</mat-list-item>
  <mat-divider inset />
  <mat-list-item>Second</mat-list-item>
</mat-list>`,
  liste: `<mat-list>
  <div mat-subheader>Dossiers</div>
  <mat-list-item>Photos</mat-list-item>
  <mat-divider />
  <mat-list-item>Documents</mat-list-item>
</mat-list>`,
  epais: `<p>Au-dessus</p>
<mat-divider class="trait-epais" />
<p>En dessous</p>

<div style="display: flex; align-items: center; gap: 16px; height: 40px">
  <span>Gauche</span>
  <mat-divider vertical class="trait-epais" style="height: 100%" />
  <span>Droite</span>
</div>

@use '@angular/material' as mat;

.trait-epais {
  @include mat.divider-overrides((
    width: 4px,
  ));
}`,
  couleurs: `<mat-divider class="trait-primaire" />
<p>Primaire</p>
<mat-divider class="trait-tertiaire" />
<p>Tertiaire</p>
<mat-divider class="trait-erreur" />

@use '@angular/material' as mat;

.trait-primaire {
  @include mat.divider-overrides((
    width: 2px,
    color: var(--mat-sys-primary),
  ));
}

.trait-tertiaire {
  @include mat.divider-overrides((
    width: 2px,
    color: var(--mat-sys-tertiary),
  ));
}

.trait-erreur {
  @include mat.divider-overrides((
    width: 2px,
    color: var(--mat-sys-error),
  ));
}`,
};

@Component({
  selector: 'app-separateur-page',
  imports: [MatDivider, MatList, MatListItem, MatListSubheaderCssMatStyler, Specimen, SpecimenSection],
  template: `
    <h1>Séparateur</h1>

    <app-specimen-section minWidth="340px" title="Orientations">
      <app-specimen label="Horizontal" api="mat-divider" [snippet]="snippets.horizontal">
        <div class="bloc">
          <p>Au-dessus</p>
          <mat-divider />
          <p>En dessous</p>
        </div>
      </app-specimen>
      <app-specimen label="Vertical" api="vertical" [snippet]="snippets.vertical">
        <div class="ligne">
          <span>Gauche</span>
          <mat-divider vertical class="vertical" />
          <span>Droite</span>
        </div>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section minWidth="340px" title="Dans une liste">
      <app-specimen label="Décalé" api="inset" [snippet]="snippets.inset">
        <mat-list class="bloc">
          <mat-list-item>Premier</mat-list-item>
          <mat-divider inset />
          <mat-list-item>Second</mat-list-item>
        </mat-list>
      </app-specimen>
      <app-specimen label="Avec sous-titre" api="mat-subheader" [snippet]="snippets.liste">
        <mat-list class="bloc">
          <div mat-subheader>Dossiers</div>
          <mat-list-item>Photos</mat-list-item>
          <mat-divider />
          <mat-list-item>Documents</mat-list-item>
        </mat-list>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section
      minWidth="340px"
      title="Personnalisation (jetons)"
      description="Épaisseur et couleur du trait se règlent avec le mixin Sass mat.divider-overrides ; les noms de jetons sont validés à la compilation."
    >
      <app-specimen label="Trait épais" api="mat.divider-overrides : width" [snippet]="snippets.epais">
        <div class="bloc">
          <p>Au-dessus</p>
          <mat-divider class="trait-epais" />
          <p>En dessous</p>
        </div>
        <div class="ligne">
          <span>Gauche</span>
          <mat-divider vertical class="vertical trait-epais" />
          <span>Droite</span>
        </div>
      </app-specimen>
      <app-specimen label="Couleurs de rôle" api="mat.divider-overrides : color" [snippet]="snippets.couleurs">
        <div class="bloc">
          <mat-divider class="trait-primaire" />
          <p>Primaire</p>
          <mat-divider class="trait-tertiaire" />
          <p>Tertiaire</p>
          <mat-divider class="trait-erreur" />
        </div>
      </app-specimen>
    </app-specimen-section>
  `,
  styles: `
    @use '@angular/material' as mat;
    @use 'roles';

    .trait-epais {
      @include mat.divider-overrides(
        (
          width: 4px,
        )
      );
    }

    .trait-primaire {
      @include roles.divider(var(--mat-sys-primary));
    }

    .trait-tertiaire {
      @include roles.divider(var(--mat-sys-tertiary));
    }

    .trait-erreur {
      @include roles.divider(var(--mat-sys-error));
    }

    .bloc {
      width: 100%;
    }

    .ligne {
      display: flex;
      align-items: center;
      gap: 16px;
      height: 40px;
    }

    .vertical {
      height: 100%;
    }
  `,
})
export class SeparateurPage {
  protected readonly snippets = SNIPPETS;
}
