import { Component, afterNextRender, viewChildren } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTree, MatTreeNode, MatTreeNodeDef, MatTreeNodePadding, MatTreeNodeToggle, MatNestedTreeNode, MatTreeNodeOutlet } from '@angular/material/tree';
import { Specimen } from '../../../shared/specimen/specimen';
import { SpecimenSection } from '../../../shared/specimen-section/specimen-section';
import { ComposantRef } from '../../../shared/composant-ref/composant-ref';

interface Noeud {
  nom: string;
  enfants?: Noeud[];
}

const SNIPPETS = {
  arbre: `<mat-tree [dataSource]="donnees" [childrenAccessor]="enfants" #arbre>
  <mat-tree-node *matTreeNodeDef="let noeud" matTreeNodePadding>
    <button matIconButton disabled aria-hidden="true"></button>
    {{ noeud.nom }}
  </mat-tree-node>
  <mat-tree-node *matTreeNodeDef="let noeud; when: aEnfants" matTreeNodePadding matTreeNodeToggle>
    <button matIconButton matTreeNodeToggle [attr.aria-label]="'Basculer ' + noeud.nom">
      <mat-icon>{{ arbre.isExpanded(noeud) ? 'expand_more' : 'chevron_right' }}</mat-icon>
    </button>
    {{ noeud.nom }}
  </mat-tree-node>
</mat-tree>`,
  imbrique: `<mat-tree [dataSource]="donnees" [childrenAccessor]="enfants" #arbre>
  <mat-nested-tree-node *matTreeNodeDef="let noeud; when: aEnfants">
    <div class="noeud">
      <button matIconButton matTreeNodeToggle [attr.aria-label]="'Basculer ' + noeud.nom">
        <mat-icon>{{ arbre.isExpanded(noeud) ? 'expand_more' : 'chevron_right' }}</mat-icon>
      </button>
      {{ noeud.nom }}
    </div>
    <div role="group" [class.replie]="!arbre.isExpanded(noeud)">
      <ng-container matTreeNodeOutlet />
    </div>
  </mat-nested-tree-node>
  <mat-tree-node *matTreeNodeDef="let noeud">{{ noeud.nom }}</mat-tree-node>
</mat-tree>`,
  indentation: `<mat-tree-node *matTreeNodeDef="let noeud" matTreeNodePadding [matTreeNodePaddingIndent]="40">
  {{ noeud.nom }}
</mat-tree-node>`,
  couleurs: `<mat-tree class="arbre-colore" [dataSource]="donnees" [childrenAccessor]="enfants" #arbre>
  <mat-tree-node *matTreeNodeDef="let noeud" matTreeNodePadding>
    <button matIconButton disabled aria-hidden="true"></button>
    {{ noeud.nom }}
  </mat-tree-node>
  <mat-tree-node *matTreeNodeDef="let noeud; when: aEnfants" matTreeNodePadding matTreeNodeToggle>
    <button matIconButton matTreeNodeToggle [attr.aria-label]="'Basculer ' + noeud.nom">
      <mat-icon>{{ arbre.isExpanded(noeud) ? 'expand_more' : 'chevron_right' }}</mat-icon>
    </button>
    {{ noeud.nom }}
  </mat-tree-node>
</mat-tree>

@use '@angular/material' as mat;

.arbre-colore {
  @include mat.tree-overrides((
    container-background-color: var(--mat-sys-secondary-container),
    node-text-color: var(--mat-sys-on-secondary-container),
  ));
}`,
  grand: `<mat-tree class="arbre-grand" [dataSource]="donnees" [childrenAccessor]="enfants" #arbre>
  <mat-tree-node *matTreeNodeDef="let noeud" matTreeNodePadding>
    <button matIconButton disabled aria-hidden="true"></button>
    {{ noeud.nom }}
  </mat-tree-node>
  <mat-tree-node *matTreeNodeDef="let noeud; when: aEnfants" matTreeNodePadding matTreeNodeToggle>
    <button matIconButton matTreeNodeToggle [attr.aria-label]="'Basculer ' + noeud.nom">
      <mat-icon>{{ arbre.isExpanded(noeud) ? 'expand_more' : 'chevron_right' }}</mat-icon>
    </button>
    {{ noeud.nom }}
  </mat-tree-node>
</mat-tree>

@use '@angular/material' as mat;

.arbre-grand {
  @include mat.tree-overrides((
    node-min-height: 64px,
    node-text-size: var(--mat-sys-title-large-size),
    node-text-weight: var(--mat-sys-title-medium-weight),
  ));
}`,
};

@Component({
  selector: 'app-arbre-page',
  imports: [
    ComposantRef,
    MatIcon,
    MatIconButton,
    MatTree,
    MatTreeNode,
    MatTreeNodeDef,
    MatTreeNodePadding,
    MatTreeNodeToggle,
    Specimen,
    SpecimenSection,
    MatNestedTreeNode,
    MatTreeNodeOutlet,
  ],
  template: `
    <h1>Arbre</h1>
    <app-composant-ref />

    <app-specimen-section minWidth="360px" title="Hiérarchie">
      <app-specimen label="Arbre à plusieurs niveaux" api="mat-tree" [snippet]="snippets.arbre">
        <mat-tree [dataSource]="donnees" [childrenAccessor]="enfants" #arbre>
          <mat-tree-node *matTreeNodeDef="let noeud" matTreeNodePadding>
            <button matIconButton disabled aria-hidden="true"></button>
            {{ noeud.nom }}
          </mat-tree-node>
          <mat-tree-node *matTreeNodeDef="let noeud; when: aEnfants" matTreeNodePadding matTreeNodeToggle>
            <button matIconButton matTreeNodeToggle [attr.aria-label]="'Basculer ' + noeud.nom">
              <mat-icon>{{ arbre.isExpanded(noeud) ? 'expand_more' : 'chevron_right' }}</mat-icon>
            </button>
            {{ noeud.nom }}
          </mat-tree-node>
        </mat-tree>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section minWidth="360px" title="Variantes d’affichage">
      <app-specimen label="Arbre imbriqué" api="mat-nested-tree-node" [snippet]="snippets.imbrique">
        <mat-tree [dataSource]="donnees" [childrenAccessor]="enfants" #imbrique>
          <mat-nested-tree-node *matTreeNodeDef="let noeud; when: aEnfants">
            <div class="noeud">
              <button matIconButton matTreeNodeToggle [attr.aria-label]="'Basculer ' + noeud.nom">
                <mat-icon>{{ imbrique.isExpanded(noeud) ? 'expand_more' : 'chevron_right' }}</mat-icon>
              </button>
              {{ noeud.nom }}
            </div>
            <div role="group" class="groupe" [class.replie]="!imbrique.isExpanded(noeud)">
              <ng-container matTreeNodeOutlet />
            </div>
          </mat-nested-tree-node>
          <mat-tree-node *matTreeNodeDef="let noeud" class="feuille">{{ noeud.nom }}</mat-tree-node>
        </mat-tree>
      </app-specimen>
      <app-specimen label="Indentation personnalisée" api="matTreeNodePaddingIndent" [snippet]="snippets.indentation">
        <mat-tree [dataSource]="donnees" [childrenAccessor]="enfants" #large>
          <mat-tree-node *matTreeNodeDef="let noeud" matTreeNodePadding [matTreeNodePaddingIndent]="40">
            <button matIconButton disabled aria-hidden="true"></button>
            {{ noeud.nom }}
          </mat-tree-node>
          <mat-tree-node *matTreeNodeDef="let noeud; when: aEnfants" matTreeNodePadding [matTreeNodePaddingIndent]="40" matTreeNodeToggle>
            <button matIconButton matTreeNodeToggle [attr.aria-label]="'Basculer ' + noeud.nom">
              <mat-icon>{{ large.isExpanded(noeud) ? 'expand_more' : 'chevron_right' }}</mat-icon>
            </button>
            {{ noeud.nom }}
          </mat-tree-node>
        </mat-tree>
      </app-specimen>
    </app-specimen-section>

    <app-specimen-section
      minWidth="360px"
      title="Personnalisation (jetons)"
      description="Fond, couleur du texte, hauteur des nœuds et typographie se règlent avec le mixin Sass mat.tree-overrides ; les noms de jetons sont validés à la compilation."
    >
      <app-specimen label="Couleurs de rôle (secondaire)" api="mat.tree-overrides : container-background-color" [snippet]="snippets.couleurs">
        <mat-tree class="arbre-colore" [dataSource]="donnees" [childrenAccessor]="enfants" #colore>
          <mat-tree-node *matTreeNodeDef="let noeud" matTreeNodePadding>
            <button matIconButton disabled aria-hidden="true"></button>
            {{ noeud.nom }}
          </mat-tree-node>
          <mat-tree-node *matTreeNodeDef="let noeud; when: aEnfants" matTreeNodePadding matTreeNodeToggle>
            <button matIconButton matTreeNodeToggle [attr.aria-label]="'Basculer ' + noeud.nom">
              <mat-icon>{{ colore.isExpanded(noeud) ? 'expand_more' : 'chevron_right' }}</mat-icon>
            </button>
            {{ noeud.nom }}
          </mat-tree-node>
        </mat-tree>
      </app-specimen>
      <app-specimen label="Nœuds hauts et texte plus grand" api="mat.tree-overrides : node-min-height" [snippet]="snippets.grand">
        <mat-tree class="arbre-grand" [dataSource]="donnees" [childrenAccessor]="enfants" #grand>
          <mat-tree-node *matTreeNodeDef="let noeud" matTreeNodePadding>
            <button matIconButton disabled aria-hidden="true"></button>
            {{ noeud.nom }}
          </mat-tree-node>
          <mat-tree-node *matTreeNodeDef="let noeud; when: aEnfants" matTreeNodePadding matTreeNodeToggle>
            <button matIconButton matTreeNodeToggle [attr.aria-label]="'Basculer ' + noeud.nom">
              <mat-icon>{{ grand.isExpanded(noeud) ? 'expand_more' : 'chevron_right' }}</mat-icon>
            </button>
            {{ noeud.nom }}
          </mat-tree-node>
        </mat-tree>
      </app-specimen>
    </app-specimen-section>
  `,
  styles: `
    @use '@angular/material' as mat;

    mat-tree {
      width: 100%;

      // Les arbres se fondent dans le fond du specimen
      @include mat.tree-overrides(
        (
          container-background-color: transparent,
        )
      );
    }

    .arbre-colore {
      @include mat.tree-overrides(
        (
          container-background-color: var(--mat-sys-secondary-container),
          node-text-color: var(--mat-sys-on-secondary-container),
        )
      );
    }

    .arbre-grand {
      @include mat.tree-overrides(
        (
          node-min-height: 64px,
          node-text-size: var(--mat-sys-title-large-size),
          node-text-weight: var(--mat-sys-title-medium-weight),
        )
      );
    }
    .noeud {
      display: flex;
      align-items: center;
    }

    .groupe {
      padding-inline-start: 40px;
    }

    .replie {
      display: none;
    }

    .feuille {
      padding-inline-start: 48px;
    }
  `,
})
export class ArbrePage {
  protected readonly snippets = SNIPPETS;
  private readonly arbres = viewChildren(MatTree);

  constructor() {
    // Les arbres sont dépliés pour montrer la hiérarchie dès l'arrivée.
    afterNextRender(() => this.arbres().forEach((arbre) => arbre.expandAll()));
  }
  protected readonly donnees: Noeud[] = [
    { nom: 'Fruits', enfants: [{ nom: 'Pomme' }, { nom: 'Poire' }] },
    {
      nom: 'Légumes',
      enfants: [
        { nom: 'Verts', enfants: [{ nom: 'Courgette' }, { nom: 'Haricot' }] },
        { nom: 'Carotte' },
      ],
    },
  ];
  protected readonly enfants = (noeud: Noeud) => noeud.enfants ?? [];
  protected readonly aEnfants = (_: number, noeud: Noeud) => !!noeud.enfants?.length;
}
