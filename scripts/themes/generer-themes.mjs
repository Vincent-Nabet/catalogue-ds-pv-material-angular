// Génère les variables CSS MD3 + custom et le thème Angular Material depuis les tokens DTCG.
//
//   npm run themes
//   npm run themes -- --source design.zip --nom pv
//   npm run themes -- --palettes --palette-repli azure
//
// Voir docs/generation-themes.md.
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { validerNom } from './correspondance.mjs';
import { ecrireFichiers } from './ecrire-fichiers.mjs';
import { controlerMaterial, genererMaterial, PALETTE_REPLI_DEFAUT, validerPaletteRepli } from './ecrire-material.mjs';
import { genererVariables } from './ecrire-variables.mjs';
import { lireSource } from './lire-source.mjs';

const racine = resolve(fileURLToPath(new URL('.', import.meta.url)), '../..');

const AIDE = `Génère les variables CSS MD3 + custom et le thème Angular Material depuis les tokens du design system.

Options :
  --source <dossier|zip>   tokens à lire : primitives.tokens.json + semantics/*.tokens.json (défaut : tokens)
  --nom <nom>              préfixe des variables custom, des classes et du mixin (défaut : app)
  --sortie <dossier>       dossier généré (défaut : src/styles/themes-<nom>)
  --palette-repli <nom>    palette Material prédéfinie utilisée en repli (défaut : ${PALETTE_REPLI_DEFAUT})
  --palettes               expose aussi les primitives Shade-NNN en --<nom>-ref-<palette>-<NNN>
  --help                   affiche cette aide`;

/** Enchaîne lecture, génération et écriture ; retourne le rapport (cf. `formaterRapport`). */
export function generer({ source = resolve(racine, 'tokens'), nom = 'app', sortie, paletteRepli = PALETTE_REPLI_DEFAUT, palettes = false }) {
  validerNom(nom);
  validerPaletteRepli(paletteRepli);
  const dossierSortie = resolve(sortie ?? resolve(racine, 'src/styles', `themes-${nom}`));
  const chemin = resolve(source);

  const tokens = lireSource(chemin);
  const variables = genererVariables(tokens, { nom, palettes });
  const material = genererMaterial({ nom, variables: variables.variables, paletteRepli });
  const controle = controlerMaterial({ nom, scss: material.fichiers.get(`_themes-${nom}.scss`), surcharges: material.surcharges });
  if (controle.ecarts.length > 0) {
    throw new Error(`Le thème Material généré ne se compile pas comme prévu :\n  ${controle.ecarts.join('\n  ')}`);
  }

  const fichiers = new Map([...variables.fichiers, ...material.fichiers]);
  const ecriture = ecrireFichiers(dossierSortie, fichiers, chemin);
  return {
    source: chemin,
    sortie: dossierSortie,
    modes: Object.keys(tokens.semantiques).sort(),
    variables: variables.rapport,
    material: material.rapport,
    ecriture,
  };
}

/** Rapport lisible : comptes, puis avertissements (tokens non reconnus, variables Material en repli…). */
export function formaterRapport(r) {
  const parRaison = Map.groupBy(r.variables.ignores, (i) => i.raison);
  const ignores = [...parRaison].map(([raison, liste]) => `    - ${liste.length} : ${raison}`);
  const { ecrits, inchanges, supprimes } = r.ecriture;
  const lignes = [
    `Source : ${r.source} (${r.modes.length} modes)`,
    `Sortie : ${r.sortie}`,
    `Fichiers : ${ecrits.length} écrit(s), ${inchanges.length} inchangé(s), ${supprimes.length} supprimé(s)`,
    ...ecrits.map((f) => `    + ${f}`),
    ...supprimes.map((f) => `    - ${f}`),
    'Variables CSS :',
    `  MD3 : ${r.variables.md3}`,
    `  custom : ${r.variables.custom}`,
    `  ignorés : ${r.variables.ignores.length}`,
    ...ignores,
    `  non reconnus : ${r.variables.inconnus.length}`,
    'Thème Angular Material :',
    `  variables --mat-sys-* branchées sur les tokens : ${r.material.surcharges}`,
    `  variables en repli (palette Material) : ${r.material.repliAttendu.length + r.material.repliInattendu.length}`,
  ];
  const avertissements = [
    ...r.variables.inconnus.map((c) => `token non reconnu, non écrit : ${c}`),
    ...r.material.repliInattendu.map((v) => `variable Material sans source dans les tokens (nouvelle version de Material ?) : ${v}`),
    ...r.variables.modesIgnores.map((m) => `mode non utilisé : ${m}`),
    ...r.ecriture.etrangers.map((f) => `fichier étranger laissé en place dans la sortie : ${f}`),
  ];
  if (r.material.repliAttendu.length > 0) lignes.push(`    attendues : ${r.material.repliAttendu.join(', ')}`);
  return [...lignes, ...avertissements.map((a) => `Avertissement : ${a}`)].join('\n');
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const { values } = parseArgs({
      options: {
        source: { type: 'string' },
        nom: { type: 'string' },
        sortie: { type: 'string' },
        'palette-repli': { type: 'string' },
        palettes: { type: 'boolean', default: false },
        help: { type: 'boolean', default: false },
      },
    });
    if (values.help) {
      console.log(AIDE);
    } else {
      console.log(
        formaterRapport(
          generer({
            source: values.source,
            nom: values.nom,
            sortie: values.sortie,
            paletteRepli: values['palette-repli'],
            palettes: values.palettes,
          }),
        ),
      );
    }
  } catch (erreur) {
    console.error(`Erreur : ${erreur.message}`);
    process.exitCode = 1;
  }
}
