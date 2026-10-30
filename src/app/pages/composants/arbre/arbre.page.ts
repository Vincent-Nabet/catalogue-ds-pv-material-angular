import { Component } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTree, MatTreeNode, MatTreeNodeDef, MatTreeNodePadding, MatTreeNodeToggle } from '@angular/material/tree';
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
  `,
  styles: `
    mat-tree {
      width: 100%;
      background: transparent;
    }
  `,
})
export class ArbrePage {
  protected readonly snippets = SNIPPETS;
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
