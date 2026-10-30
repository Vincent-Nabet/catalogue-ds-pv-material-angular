import { Component, afterNextRender, viewChildren } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTree, MatTreeNode, MatTreeNodeDef, MatTreeNodePadding, MatTreeNodeToggle, MatNestedTreeNode, MatTreeNodeOutlet } from '@angular/material/tree';
import { Specimen } from '../../../shared/specimen/specimen';
import { SpecimenSection } from '../../../shared/specimen-section/specimen-section';

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
};

@Component({
  selector: 'app-arbre-page',
  imports: [
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
  `,
  styles: `
    mat-tree {
      width: 100%;
      background: transparent;
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
