import {
  Component,
  ElementRef,
  InjectionToken,
  computed,
  inject,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { form, FormField, maxLength, required, validate } from '@angular/forms/signals';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import type { ThemeGenere } from '../../../../scripts/themes/navigateur.mjs';
import {
  ImportedThemeMeta,
  ImportedThemes,
  MAX_IMPORTED_THEMES,
} from '../../core/theme/imported-themes';
import { ThemeService } from '../../core/theme/theme.service';

type Generateur = typeof import('../../../../scripts/themes/navigateur.mjs');

/**
 * Chargement différé du générateur de thèmes (`scripts/themes/`, avec `fflate`) : un chunk à part, chargé au choix
 * du premier fichier, ni dans le bundle initial ni dans le chunk de la page.
 */
export const THEME_GENERATOR = new InjectionToken<
  () => Promise<Pick<Generateur, 'genererThemeImporte'>>
>('THEME_GENERATOR', { factory: () => () => import('../../../../scripts/themes/navigateur.mjs') });

const TAILLE_MAX_ZIP = 5 * 1024 * 1024;
const NOM_MAX = 40;
const AVERTISSEMENTS_MAX = 20;
const ALPHABET = 'abcdefghijklmnopqrstuvwxyz0123456789';

const MESSAGES_ECHEC = {
  limite: `Limite de ${MAX_IMPORTED_THEMES} thèmes importés atteinte.`,
  quota: 'Espace de stockage plein : supprimez un thème importé.',
  stockage: 'Stockage du navigateur indisponible : le thème ne pourrait pas être conservé.',
} as const;

interface Analyse extends ThemeGenere {
  id: string;
  nomSource: string;
}

const pluriel = (n: number, singulier: string, plurielForme = `${singulier}s`) =>
  `${n} ${n > 1 ? plurielForme : singulier}`;
const normaliser = (nom: string) => nom.trim().toLowerCase();

/** Nom proposé : celui du zip sans extension, nettoyé (espaces, caractères de contrôle) et tronqué. */
function nomPropose(nomSource: string): string {
  const sansExtension = nomSource.replace(/\.zip$/i, '');
  const sansControle = Array.from(sansExtension, (c) =>
    c.charCodeAt(0) < 32 || c.charCodeAt(0) === 127 ? ' ' : c,
  ).join('');
  return sansControle.replace(/\s+/g, ' ').trim().slice(0, NOM_MAX);
}

/** Section « Importer un thème » : choix du zip, analyse, rapport, nom, enregistrement. */
@Component({
  selector: 'app-import-form',
  imports: [FormField, MatButton, MatError, MatFormField, MatHint, MatInput, MatLabel],
  template: `
    <section aria-labelledby="import-titre">
      <h2 id="import-titre">Importer un thème</h2>

      <div class="fichier">
        <label for="import-fichier">Archive de tokens (.zip)</label>
        <input
          #fichier
          id="import-fichier"
          type="file"
          accept=".zip"
          aria-describedby="import-aide"
          (change)="choisir($event)"
        />
        <p id="import-aide" class="aide">
          Archive contenant <code>primitives.tokens.json</code> et
          <code>semantics/*.tokens.json</code> (au moins un mode clair et un mode sombre), comme
          pour <code>npm run themes</code>. 5 Mo au plus.
        </p>
      </div>

      <p class="annonce" role="status" aria-live="polite">{{ annonce() }}</p>

      @if (erreur()) {
        <p class="erreur" role="alert">{{ erreur() }}</p>
      }

      @if (analyse(); as donnees) {
        <div class="rapport">
          <p>{{ resume() }}</p>
          <ul class="familles" aria-label="Familles du thème">
            @for (famille of donnees.familles; track famille.id) {
              <li>
                <span
                  class="pastille"
                  aria-hidden="true"
                  [style.background-color]="famille.apercu"
                ></span>
                {{ famille.libelle }}
              </li>
            }
          </ul>
          @if (donnees.rapport.avertissements.length > 0) {
            <p class="titre-avertissements">
              {{ pluriel(donnees.rapport.avertissements.length, 'avertissement') }} :
            </p>
            <ul class="avertissements">
              @for (avertissement of donnees.rapport.avertissements; track $index) {
                <li>{{ avertissement }}</li>
              }
            </ul>
          }
          @if (donnees.rapport.police) {
            <p>
              Police : {{ donnees.rapport.police }}.
              @if (autrePolice()) {
                Le catalogue ne charge que Poppins : une autre police ne s'affichera que si elle est
                installée sur la machine.
              }
            </p>
          }
        </div>

        <mat-form-field class="nom">
          <mat-label>Nom du thème</mat-label>
          <input matInput autocomplete="off" [formField]="formulaire.nom" />
          <mat-hint>{{ NOM_MAX }} caractères au plus, unique parmi les thèmes importés.</mat-hint>
          @for (erreurNom of formulaire.nom().errors(); track erreurNom.kind) {
            <mat-error>{{ erreurNom.message }}</mat-error>
          }
        </mat-form-field>
      }

      @if (erreurAjout()) {
        <p class="erreur" role="alert">{{ erreurAjout() }}</p>
      }

      <button matButton="filled" type="button" [disabled]="!pret()" (click)="importer()">
        Importer
      </button>
    </section>
  `,
  styles: `
    h2 {
      margin: 24px 0 8px;
      font: var(--mat-sys-title-large);
    }

    .fichier {
      display: grid;
      gap: 4px;
      max-width: 80ch;
    }

    label {
      font: var(--mat-sys-label-large);
    }

    .aide,
    .annonce {
      margin: 4px 0;
      color: var(--mat-sys-on-surface-variant);
    }

    .annonce:empty {
      margin: 0;
    }

    .erreur {
      max-width: 80ch;
      margin: 8px 0;
      padding: 8px 12px;
      border-radius: var(--mat-sys-corner-small);
      background: var(--mat-sys-error-container);
      color: var(--mat-sys-on-error-container);
      overflow-wrap: anywhere;
      white-space: pre-line;
    }

    .rapport {
      max-width: 80ch;
      margin: 12px 0;
      padding: 12px 16px;
      border: 1px solid var(--mat-sys-outline-variant);
      border-radius: var(--mat-sys-corner-medium);
      background: var(--mat-sys-surface);
    }

    .rapport p {
      margin: 4px 0;
    }

    .familles {
      display: flex;
      flex-wrap: wrap;
      gap: 4px 16px;
      margin: 8px 0;
      padding: 0;
      list-style: none;
    }

    .pastille {
      display: inline-block;
      width: 16px;
      height: 16px;
      margin-inline-end: 4px;
      border: 1px solid var(--mat-sys-outline);
      border-radius: 50%;
      vertical-align: middle;
    }

    .avertissements {
      margin: 4px 0;
      overflow-wrap: anywhere;
    }

    .nom {
      display: block;
      max-width: 480px;
      margin-block-end: 8px;
    }

    code {
      font-family: monospace;
    }
  `,
})
export class ImportForm {
  private readonly imported = inject(ImportedThemes);
  private readonly service = inject(ThemeService);
  private readonly chargerGenerateur = inject(THEME_GENERATOR);
  private readonly champFichier = viewChild.required<ElementRef<HTMLInputElement>>('fichier');

  /** Un thème vient d'être importé : identifiant de l'import (le focus va sur son titre dans la liste). */
  readonly importe = output<string>();

  protected readonly NOM_MAX = NOM_MAX;
  protected readonly pluriel = pluriel;
  protected readonly annonce = signal('');
  protected readonly erreur = signal('');
  protected readonly erreurAjout = signal('');
  protected readonly analyse = signal<Analyse | null>(null);
  protected readonly enCours = signal(false);
  /** Numéro de la dernière analyse demandée : écarte les résultats devenus périmés. */
  private derniere = 0;

  private readonly modele = signal({ nom: '' });
  protected readonly formulaire = form(this.modele, (chemin) => {
    required(chemin.nom, { message: 'Saisissez un nom pour ce thème.' });
    maxLength(chemin.nom, NOM_MAX, {
      message: `Le nom ne peut pas dépasser ${NOM_MAX} caractères.`,
    });
    validate(chemin.nom, ({ value }) => {
      const nom = value();
      if (nom.length > 0 && nom.trim() === '')
        return { kind: 'required', message: 'Saisissez un nom pour ce thème.' };
      return this.nomPris(nom)
        ? { kind: 'unique', message: 'Un thème importé porte déjà ce nom.' }
        : undefined;
    });
  });

  protected readonly pret = computed(
    () => !!this.analyse() && !this.enCours() && this.formulaire().valid(),
  );
  protected readonly resume = computed(() => {
    const analyse = this.analyse();
    if (!analyse) return '';
    const { rapport, familles } = analyse;
    return [
      `${pluriel(rapport.modes, 'mode lu', 'modes lus')}`,
      `${pluriel(familles.length, 'famille')} : ${familles.map((f) => f.libelle).join(', ')}`,
      pluriel(rapport.md3, 'variable MD3', 'variables MD3'),
      pluriel(rapport.custom, 'variable du design system', 'variables du design system'),
    ].join(' · ');
  });
  protected readonly autrePolice = computed(
    () => !/\bPoppins\b/.test(this.analyse()?.rapport.police ?? ''),
  );

  /** Donne le focus au champ fichier (après la suppression du dernier thème). */
  focusFichier(): void {
    this.champFichier().nativeElement.focus();
  }

  protected async choisir(evenement: Event): Promise<void> {
    const fichier = (evenement.target as HTMLInputElement).files?.[0];
    const numero = ++this.derniere;
    this.reinitialiser();
    if (!fichier) return;
    if (fichier.size > TAILLE_MAX_ZIP) {
      this.erreur.set(`« ${fichier.name} » dépasse 5 Mo : archive refusée.`);
      return;
    }

    this.enCours.set(true);
    this.annonce.set('Analyse en cours…');
    try {
      const octets = new Uint8Array(await fichier.arrayBuffer());
      const { genererThemeImporte } = await this.chargerGenerateur();
      if (numero !== this.derniere) return;
      const id = this.genererId();
      const resultat = genererThemeImporte(octets, { base: id, nomSource: fichier.name });
      this.analyse.set({ ...resultat, id, nomSource: fichier.name });
      this.modele.set({ nom: nomPropose(fichier.name) });
      this.annonce.set(`Analyse terminée : ${pluriel(resultat.familles.length, 'famille')}.`);
    } catch (erreur) {
      if (numero !== this.derniere) return;
      this.annonce.set('');
      this.erreur.set(
        erreur instanceof Error ? erreur.message : "L'analyse de l'archive a échoué.",
      );
    } finally {
      if (numero === this.derniere) this.enCours.set(false);
    }
  }

  protected importer(): void {
    const analyse = this.analyse();
    if (!analyse || !this.formulaire().valid()) return;

    const meta: ImportedThemeMeta = {
      id: analyse.id,
      name: this.modele().nom.trim(),
      createdAt: new Date().toISOString(),
      sourceName: analyse.nomSource,
      families: analyse.familles.map((f) => ({ ...f })),
      warnings: analyse.rapport.avertissements.slice(0, AVERTISSEMENTS_MAX),
    };
    const resultat = this.imported.add(meta, analyse.css);
    if (!resultat.ok) {
      this.erreurAjout.set(MESSAGES_ECHEC[resultat.reason]);
      return;
    }

    const famille = meta.families.find((f) => f.defaut) ?? meta.families[0];
    this.service.theme.set(`${meta.id}-${famille.id}`);
    this.reinitialiser();
    this.champFichier().nativeElement.value = '';
    this.annonce.set(`Thème « ${meta.name} » importé et appliqué.`);
    this.importe.emit(meta.id);
  }

  /** Vide l'analyse, les messages et le nom : le formulaire est prêt pour un autre zip. */
  private reinitialiser(): void {
    this.analyse.set(null);
    this.erreur.set('');
    this.erreurAjout.set('');
    this.annonce.set('');
    this.modele.set({ nom: '' });
    this.formulaire().reset();
  }

  private nomPris(nom: string): boolean {
    const cherche = normaliser(nom);
    return this.imported.themes().some((theme) => normaliser(theme.name) === cherche);
  }

  /** `imp-` + 6 caractères a-z0-9 tirés par `crypto.getRandomValues`, jamais déjà pris. */
  private genererId(): string {
    for (;;) {
      const aleatoire = crypto.getRandomValues(new Uint8Array(6));
      const id = `imp-${Array.from(aleatoire, (octet) => ALPHABET[octet % ALPHABET.length]).join('')}`;
      if (!this.imported.themes().some((theme) => theme.id === id)) return id;
    }
  }
}
