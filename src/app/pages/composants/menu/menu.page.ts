import { Component, computed, inject } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger, MatContextMenuTrigger, MatMenuContent } from '@angular/material/menu';
import { injectColorFamilies } from '../../../core/tokens/color-families';
import { OverlayFamily } from '../../../shared/color-family-scope/overlay-family';
import { Specimen } from '../../../shared/specimen/specimen';
import { SpecimenSection } from '../../../shared/specimen-section/specimen-section';

const SNIPPETS = {
  simple: `<button matButton="outlined" [matMenuTriggerFor]="menu">Ouvrir</button>
<mat-menu #menu="matMenu">
  <button mat-menu-item>Modifier</button>
  <button mat-menu-item>Dupliquer</button>
  <button mat-menu-item>Supprimer</button>
</mat-menu>`,
  icones: `<button matButton="outlined" [matMenuTriggerFor]="menu">Actions</button>
<mat-menu #menu="matMenu">
  <button mat-menu-item><mat-icon>edit</mat-icon>Modifier</button>
  <button mat-menu-item><mat-icon>content_copy</mat-icon>Dupliquer</button>
  <mat-divider />
  <button mat-menu-item><mat-icon>delete</mat-icon>Supprimer</button>
</mat-menu>`,
  desactive: `<button matButton="outlined" [matMenuTriggerFor]="menu">Ouvrir</button>
<mat-menu #menu="matMenu">
  <button mat-menu-item>Modifier</button>
  <button mat-menu-item disabled>Supprimer</button>
</mat-menu>`,
  sousMenu: `<button matButton="outlined" [matMenuTriggerFor]="menu">Ouvrir</button>
<mat-menu #menu="matMenu">
  <button mat-menu-item [matMenuTriggerFor]="export">Exporter</button>
  <button mat-menu-item>Imprimer</button>
</mat-menu>
<mat-menu #export="matMenu">
  <button mat-menu-item>PDF</button>
  <button mat-menu-item>CSV</button>
</mat-menu>`,
  position: `<button matButton="outlined" [matMenuTriggerFor]="menu">Ouvrir</button>
<mat-menu #menu="matMenu" xPosition="before" yPosition="above">
  <button mat-menu-item>Modifier</button>
  <button mat-menu-item>Supprimer</button>
</mat-menu>`,
  bouton: `<button matIconButton [matMenuTriggerFor]="menu" aria-label="Plus d’actions">
  <mat-icon>more_vert</mat-icon>
</button>
<mat-menu #menu="matMenu">
  <button mat-menu-item>Modifier</button>
  <button mat-menu-item>Supprimer</button>
</mat-menu>`,
  contextuel: `<div [matContextMenuTriggerFor]="menu" tabindex="0">Clic droit ici</div>
<mat-menu #menu="matMenu">
  <button mat-menu-item>Copier</button>
  <button mat-menu-item>Coller</button>
</mat-menu>`,
  inactifFocalisable: `<mat-menu #menu="matMenu">
  <button mat-menu-item>Modifier</button>
  <button mat-menu-item [disabledInteractive]="true" disabled>Supprimer</button>
</mat-menu>`,
  paresseux: `<mat-menu #menu="matMenu">
  <ng-template matMenuContent>
    <button mat-menu-item>Rendu à l'ouverture</button>
  </ng-template>
</mat-menu>`,
  sansFond: `<mat-menu #menu="matMenu" [hasBackdrop]="false">
  <button mat-menu-item>Modifier</button>
</mat-menu>`,
  secondaire: `<button matButton="outlined" [matMenuTriggerFor]="menu">Actions</button>
<mat-menu #menu="matMenu" class="perso-menu-secondaire">
  <button mat-menu-item><mat-icon>edit</mat-icon>Modifier</button>
  <button mat-menu-item><mat-icon>content_copy</mat-icon>Dupliquer</button>
  <mat-divider />
  <button mat-menu-item><mat-icon>delete</mat-icon>Supprimer</button>
</mat-menu>

@use '@angular/material' as mat;

/* Le panneau est rendu dans une surcouche : règle globale (::ng-deep dans un composant) */
.perso-menu-secondaire {
  @include mat.menu-overrides((
    container-color: var(--mat-sys-secondary-container),
    item-label-text-color: var(--mat-sys-on-secondary-container),
    item-hover-state-layer-color: color-mix(in srgb, var(--mat-sys-on-secondary-container) calc(var(--mat-sys-hover-state-layer-opacity) * 100%), transparent),
    item-focus-state-layer-color: color-mix(in srgb, var(--mat-sys-on-secondary-container) calc(var(--mat-sys-focus-state-layer-opacity) * 100%), transparent),
    divider-color: var(--mat-sys-outline),
  ));
}`,
  arrondi: `<button matButton="outlined" [matMenuTriggerFor]="menu">Ouvrir</button>
<mat-menu #menu="matMenu" class="perso-menu-arrondi">
  <button mat-menu-item>Modifier</button>
  <button mat-menu-item>Dupliquer</button>
  <button mat-menu-item>Supprimer</button>
</mat-menu>

@use '@angular/material' as mat;

/* Le panneau est rendu dans une surcouche : règle globale (::ng-deep dans un composant) */
.perso-menu-arrondi {
  @include mat.menu-overrides((
    container-shape: var(--mat-sys-corner-large),
    container-elevation-shadow: var(--mat-sys-level4),
  ));
}`,
  texteMenu: `<button matButton="outlined" [matMenuTriggerFor]="menu">Ouvrir</button>
<mat-menu #menu="matMenu" class="perso-menu-texte">
  <button mat-menu-item>Modifier</button>
  <button mat-menu-item>Dupliquer</button>
  <button mat-menu-item>Supprimer</button>
</mat-menu>

@use '@angular/material' as mat;

/* Le panneau est rendu dans une surcouche : règle globale (::ng-deep dans un composant) */
.perso-menu-texte {
  @include mat.menu-overrides((
    item-label-text-size: var(--mat-sys-title-medium-size),
    item-label-text-line-height: var(--mat-sys-title-medium-line-height),
    item-leading-spacing: 24px,
    item-trailing-spacing: 24px,
  ));
}`,
};

/** Snippet d'une famille personnalisée, dérivé de son nom (la liste des familles est détectée, pas écrite à la main). */
function customSnippet(id: string): string {
  const role = `--app-color-${id}`;
  return `<button matButton="outlined" [matMenuTriggerFor]="menu">Actions</button>
<mat-menu #menu="matMenu" class="perso-menu-${id}">
  <button mat-menu-item><mat-icon>edit</mat-icon>Modifier</button>
  <button mat-menu-item><mat-icon>content_copy</mat-icon>Dupliquer</button>
  <mat-divider />
  <button mat-menu-item><mat-icon>delete</mat-icon>Supprimer</button>
</mat-menu>

@use '@angular/material' as mat;

/* Le panneau est rendu dans une surcouche : règle globale (::ng-deep dans un composant) */
.perso-menu-${id} {
  @include mat.menu-overrides((
    container-color: var(${role}-container),
    item-label-text-color: var(--app-color-on-${id}-container),
    item-icon-color: var(--app-color-on-${id}-container),
    item-hover-state-layer-color: color-mix(in srgb, var(--app-color-on-${id}-container) calc(var(--mat-sys-hover-state-layer-opacity) * 100%), transparent),
    item-focus-state-layer-color: color-mix(in srgb, var(--app-color-on-${id}-container) calc(var(--mat-sys-focus-state-layer-opacity) * 100%), transparent),
    divider-color: var(--mat-sys-outline),
  ));
}`;
}

@Component({
  selector: 'app-menu-page',
  imports: [MatButton, MatIconButton, MatDivider, MatIcon, MatMenu, MatMenuItem, MatMenuTrigger, Specimen, SpecimenSection, MatContextMenuTrigger, MatMenuContent],
  template: `
    <h1>Menu</h1>

    <app-specimen-section title="Contenu" description="Cliquer sur le bouton pour ouvrir le menu.">
      <app-specimen label="Simple" api="mat-menu" [snippet]="snippets.simple">
        <button matButton="outlined" [matMenuTriggerFor]="simple">Ouvrir</button>
        <mat-menu #simple="matMenu">
          <button mat-menu-item>Modifier</button>
          <button mat-menu-item>Dupliquer</button>
          <button mat-menu-item>Supprimer</button>
        </mat-menu>
      </app-specimen>
      <app-specimen label="Avec icônes et séparateur" api="mat-divider" [snippet]="snippets.icones">
        <button matButton="outlined" [matMenuTriggerFor]="icones">Actions</button>
        <mat-menu #icones="matMenu">
          <button mat-menu-item><mat-icon>edit</mat-icon>Modifier</button>
          <button mat-menu-item><mat-icon>content_copy</mat-icon>Dupliquer</button>
          <mat-divider />
          <button mat-menu-item><mat-icon>delete</mat-icon>Supprimer</button>
        </mat-menu>
      </app-specimen>
      <app-specimen label="Sous-menu" api="matMenuTriggerFor" [snippet]="snippets.sousMenu">
        <button matButton="outlined" [matMenuTriggerFor]="parent">Ouvrir</button>
        <mat-menu #parent="matMenu">
          <button mat-menu-item [matMenuTriggerFor]="export">Exporter</button>
          <button mat-menu-item>Imprimer</button>
        </mat-menu>
        <mat-menu #export="matMenu">
          <button mat-menu-item>PDF</button>
          <button mat-menu-item>CSV</button>
        </mat-menu>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section title="Déclencheur et état">
      <app-specimen label="Bouton icône" api="matIconButton" [snippet]="snippets.bouton">
        <button matIconButton [matMenuTriggerFor]="plus" aria-label="Plus d’actions">
          <mat-icon>more_vert</mat-icon>
        </button>
        <mat-menu #plus="matMenu">
          <button mat-menu-item>Modifier</button>
          <button mat-menu-item>Supprimer</button>
        </mat-menu>
      </app-specimen>
      <app-specimen label="Option désactivée" api="mat-menu-item disabled" [snippet]="snippets.desactive">
        <button matButton="outlined" [matMenuTriggerFor]="inactif">Ouvrir</button>
        <mat-menu #inactif="matMenu">
          <button mat-menu-item>Modifier</button>
          <button mat-menu-item disabled>Supprimer</button>
        </mat-menu>
      </app-specimen>
      <app-specimen label="Position" api='xPosition / yPosition' [snippet]="snippets.position">
        <button matButton="outlined" [matMenuTriggerFor]="position">Ouvrir</button>
        <mat-menu #position="matMenu" xPosition="before" yPosition="above">
          <button mat-menu-item>Modifier</button>
          <button mat-menu-item>Supprimer</button>
        </mat-menu>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section title="Autres variantes">
      <app-specimen label="Menu contextuel" api="matContextMenuTriggerFor" [snippet]="snippets.contextuel">
        <div class="zone-contexte" [matContextMenuTriggerFor]="contexte" tabindex="0">Clic droit ici</div>
        <mat-menu #contexte="matMenu">
          <button mat-menu-item>Copier</button>
          <button mat-menu-item>Coller</button>
        </mat-menu>
      </app-specimen>
      <app-specimen label="Option désactivée mais focalisable" api="disabledInteractive" [snippet]="snippets.inactifFocalisable">
        <button matButton="outlined" [matMenuTriggerFor]="focalisable">Ouvrir</button>
        <mat-menu #focalisable="matMenu">
          <button mat-menu-item>Modifier</button>
          <button mat-menu-item [disabledInteractive]="true" disabled>Supprimer</button>
        </mat-menu>
      </app-specimen>
      <app-specimen label="Contenu rendu à l’ouverture" api="matMenuContent" [snippet]="snippets.paresseux">
        <button matButton="outlined" [matMenuTriggerFor]="paresseux">Ouvrir</button>
        <mat-menu #paresseux="matMenu">
          <ng-template matMenuContent>
            <button mat-menu-item>Rendu à l’ouverture</button>
          </ng-template>
        </mat-menu>
      </app-specimen>
      <app-specimen label="Sans fond" api="hasBackdrop" [snippet]="snippets.sansFond">
        <button matButton="outlined" [matMenuTriggerFor]="sansFond">Ouvrir</button>
        <mat-menu #sansFond="matMenu" [hasBackdrop]="false">
          <button mat-menu-item>Modifier</button>
        </mat-menu>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section
      title="Personnalisation (jetons)"
      description="Le mixin mat.menu-overrides reçoit les jetons système --mat-sys-* ; les noms de jetons sont validés à la compilation. Le panneau étant rendu dans une surcouche, sa classe passe par l’attribut class de mat-menu. Marges et espacements n’ont pas de jeton système : valeurs en px."
    >
      <app-specimen label="Panneau secondaire" api="mat.menu-overrides : container-color" [snippet]="snippets.secondaire">
        <button matButton="outlined" [matMenuTriggerFor]="persoSecondaire">Actions</button>
        <mat-menu #persoSecondaire="matMenu" class="perso-menu-secondaire">
          <button mat-menu-item><mat-icon>edit</mat-icon>Modifier</button>
          <button mat-menu-item><mat-icon>content_copy</mat-icon>Dupliquer</button>
          <mat-divider />
          <button mat-menu-item><mat-icon>delete</mat-icon>Supprimer</button>
        </mat-menu>
      </app-specimen>
      <app-specimen label="Angles arrondis et élévation" api="mat.menu-overrides : container-shape" [snippet]="snippets.arrondi">
        <button matButton="outlined" [matMenuTriggerFor]="persoArrondi">Ouvrir</button>
        <mat-menu #persoArrondi="matMenu" class="perso-menu-arrondi">
          <button mat-menu-item>Modifier</button>
          <button mat-menu-item>Dupliquer</button>
          <button mat-menu-item>Supprimer</button>
        </mat-menu>
      </app-specimen>
      <app-specimen label="Texte et marges des éléments" api="mat.menu-overrides : item-label-text-size" [snippet]="snippets.texteMenu">
        <button matButton="outlined" [matMenuTriggerFor]="persoTexte">Ouvrir</button>
        <mat-menu #persoTexte="matMenu" class="perso-menu-texte">
          <button mat-menu-item>Modifier</button>
          <button mat-menu-item>Dupliquer</button>
          <button mat-menu-item>Supprimer</button>
        </mat-menu>
      </app-specimen>
    </app-specimen-section>

    @if (families().length > 0) {
      <app-specimen-section
        title="Couleurs personnalisées"
        description="Familles de couleur propres au design system (--app-color-*), détectées dans le CSS chargé : même principe que les rôles M3, appliqué avec les jetons du design system (conteneur et texte de la même famille ensemble). Le panneau étant rendu dans une surcouche, la famille est posée sur celle-ci avant l’ouverture."
      >
        @for (family of families(); track family.id) {
          <app-specimen [label]="family.label" [api]="family.api" [snippet]="family.snippet" [custom]="true">
            <button matButton="outlined" [matMenuTriggerFor]="menuFamille" (click)="overlayFamily.apply(family.id)">
              Actions {{ family.label }}
            </button>
            <mat-menu #menuFamille="matMenu" class="perso-menu-famille">
              <button mat-menu-item><mat-icon>edit</mat-icon>Modifier</button>
              <button mat-menu-item><mat-icon>content_copy</mat-icon>Dupliquer</button>
              <mat-divider />
              <button mat-menu-item><mat-icon>delete</mat-icon>Supprimer</button>
            </mat-menu>
          </app-specimen>
        }
      </app-specimen-section>
    }
  `,
  styles: `
    @use '@angular/material' as mat;
    @use 'roles';

    /* Le panneau est rendu dans une surcouche, hors de l’encapsulation du composant : d’où ::ng-deep. */
    ::ng-deep .perso-menu-secondaire {
      @include mat.menu-overrides(
        (
          container-color: var(--mat-sys-secondary-container),
          item-label-text-color: var(--mat-sys-on-secondary-container),
          item-hover-state-layer-color: color-mix(in srgb, var(--mat-sys-on-secondary-container) calc(var(--mat-sys-hover-state-layer-opacity) * 100%), transparent),
          item-focus-state-layer-color: color-mix(in srgb, var(--mat-sys-on-secondary-container) calc(var(--mat-sys-focus-state-layer-opacity) * 100%), transparent),
          divider-color: var(--mat-sys-outline),
        )
      );
    }

    ::ng-deep .perso-menu-famille {
      @include roles.menu(custom);
    }

    ::ng-deep .perso-menu-arrondi {
      @include mat.menu-overrides(
        (
          container-shape: var(--mat-sys-corner-large),
          container-elevation-shadow: var(--mat-sys-level4),
        )
      );
    }

    ::ng-deep .perso-menu-texte {
      @include mat.menu-overrides(
        (
          item-label-text-size: var(--mat-sys-title-medium-size),
          item-label-text-line-height: var(--mat-sys-title-medium-line-height),
          item-leading-spacing: 24px,
          item-trailing-spacing: 24px,
        )
      );
    }

    .zone-contexte {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 80px;
      border: 1px dashed var(--mat-sys-outline);
      border-radius: var(--mat-sys-corner-small);
    }
  `,
})
export class MenuPage {
  protected readonly snippets = SNIPPETS;
  protected readonly overlayFamily = inject(OverlayFamily);

  private readonly detected = injectColorFamilies();

  /** Une famille par jeu `--app-color-*` complet (vide avec un thème Angular Material). */
  protected readonly families = computed(() =>
    this.detected().map(({ id, label }) => ({
      id,
      label,
      api: `mat.menu-overrides : --app-color-${id}-container`,
      snippet: customSnippet(id),
    })),
  );
}
