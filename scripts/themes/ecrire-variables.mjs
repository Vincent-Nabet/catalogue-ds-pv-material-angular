// Étape 1 : variables CSS MD3 (`--md-sys-*`, `--md-ref-*`) et custom (`--<nom>-*`).
//
// Le clair/sombre passe par `light-dark()` (donc par `color-scheme`, posé par l'hôte) ; la famille
// de contraste est une classe `theme-<nom>[-<famille>]`. Les tokens non couleur sont identiques dans
// les 8 modes : le script le vérifie et ne les écrit qu'une fois.
import { classer, OPACITES_ETAT, variableOpacite } from './correspondance.mjs';
import { resoudreMode } from './resoudre-tokens.mjs';

/** Familles de contraste : une paire clair/sombre chacune, une classe `theme-<nom>[-<suffixe>]`. */
export const FAMILLES = [
  { id: 'standard', suffixe: '', libelle: 'Standard', clair: 'light', sombre: 'dark' },
  { id: 'contraste-moyen', suffixe: 'contraste-moyen', libelle: 'Contraste moyen', clair: 'light-medium-contrast', sombre: 'dark-medium-contrast' },
  { id: 'contraste-eleve', suffixe: 'contraste-eleve', libelle: 'Contraste élevé', clair: 'light-high-contrast', sombre: 'dark-high-contrast' },
  { id: 'monochrome', suffixe: 'monochrome', libelle: 'Monochrome', clair: 'monochrome-lt', sombre: 'monochrome-dt' },
];

/** Sélecteur CSS d'une famille : la famille standard est aussi appliquée par défaut sur `:root`. */
export function selecteurFamille(famille, nom) {
  const classe = famille.suffixe ? `.theme-${nom}-${famille.suffixe}` : `.theme-${nom}`;
  return famille.suffixe ? classe : `:root, ${classe}`;
}

/** Valeur CSS d'un token résolu ; seul nettoyage : le bruit flottant des dimensions (4 décimales). */
export function formater(type, valeur) {
  if (type === 'dimension' && typeof valeur === 'string') {
    const m = /^(-?\d+(?:\.\d+)?)px$/.exec(valeur);
    return m ? `${Number(Number.parseFloat(m[1]).toFixed(4))}px` : valeur;
  }
  if (type === 'fontFamily' && typeof valeur === 'string') {
    return valeur
      .split(',')
      .map((famille) => famille.trim())
      .map((famille) => (/^[A-Za-z_][\w-]*$/.test(famille) ? famille : JSON.stringify(famille)))
      .join(', ');
  }
  return String(valeur);
}

/** Tokens écrits d'un mode, dans l'ordre de la source (primitives puis sémantiques). */
function jetonsDuMode(resolus, nom, palettes) {
  const jetons = [];
  const ignores = [];
  const inconnus = [];
  for (const groupe of [resolus.primitives, resolus.semantiques]) {
    for (const [chemin, token] of groupe) {
      const classement = classer(chemin, nom, { palettes });
      if (classement.cible === 'ignore') ignores.push({ chemin, raison: classement.raison });
      else if (classement.cible === 'inconnu') inconnus.push(chemin);
      else jetons.push({ chemin, ...classement, type: token.type, valeur: formater(token.type, token.valeur) });
    }
  }
  return { jetons, ignores, inconnus };
}

const lignes = (declarations) => declarations.map(([variable, valeur]) => `  ${variable}: ${valeur};\n`).join('');
const bloc = (selecteur, declarations) => `${selecteur} {\n${lignes(declarations)}}\n`;
const section = (titre, ...blocs) => `/* ${titre} */\n${blocs.join('\n')}`;

/**
 * Génère les fichiers CSS de l'étape 1.
 * `source` : `{ primitives, semantiques }` (cf. `lireSource`).
 * Retourne `{ fichiers: Map chemin → corps, variables: Set, rapport }`.
 */
export function genererVariables(source, { nom, palettes = false }) {
  const manquants = FAMILLES.flatMap((f) => [f.clair, f.sombre]).filter((mode) => !(mode in source.semantiques));
  if (manquants.length > 0) {
    throw new Error(`Mode(s) absent(s) de la source : ${manquants.join(', ')}.`);
  }
  const attendus = new Set(FAMILLES.flatMap((f) => [f.clair, f.sombre]));
  const modesIgnores = Object.keys(source.semantiques).filter((mode) => !attendus.has(mode));

  const parMode = new Map();
  for (const mode of attendus) {
    const resolus = resoudreMode(source.primitives, source.semantiques[mode], mode);
    parMode.set(mode, jetonsDuMode(resolus, nom, palettes));
  }

  const reference = parMode.get('light');
  verifierCoherence(parMode, reference);

  const nonCouleurs = reference.jetons.filter((j) => j.type !== 'color');
  const couleurs = (famille, fichier) => {
    const clair = new Map(parMode.get(famille.clair).jetons.map((j) => [j.variable, j.valeur]));
    const sombre = new Map(parMode.get(famille.sombre).jetons.map((j) => [j.variable, j.valeur]));
    return reference.jetons
      .filter((j) => j.type === 'color' && j.fichier === fichier)
      .map((j) => {
        const [c, s] = [clair.get(j.variable), sombre.get(j.variable)];
        return [j.variable, c.toLowerCase() === s.toLowerCase() ? c : `light-dark(${c}, ${s})`];
      });
  };
  const blocsCouleurs = (fichier) =>
    FAMILLES.map((famille) =>
      section(`${famille.libelle} (${famille.clair} / ${famille.sombre})`, bloc(selecteurFamille(famille, nom), couleurs(famille, fichier))),
    ).join('\n');
  const declarations = (fichier, filtre = () => true) =>
    nonCouleurs.filter((j) => j.fichier === fichier && filtre(j)).map((j) => [j.variable, j.valeur]);
  const parNom = (a, b) => (a[0] < b[0] ? -1 : 1);

  const typescale = declarations('md3/sys', (j) => j.variable.startsWith('--md-sys-typescale-')).sort(parNom);
  const formes = declarations('md3/sys', (j) => j.variable.startsWith('--md-sys-shape-'));
  const etats = Object.entries(OPACITES_ETAT).map(([etat, valeur]) => [variableOpacite(etat), valeur]);

  const fichiers = new Map([
    ['index.css', ['md3/ref.css', 'md3/sys.css', 'md3/couleurs.css', `${nom}.css`].map((f) => `@import '${f}';\n`).join('')],
    ['md3/ref.css', bloc(':root', reference.jetons.filter((j) => j.fichier === 'md3/ref').map((j) => [j.variable, j.valeur]))],
    ['md3/sys.css', [
      section('Formes', bloc(':root', formes)),
      section('Typographie', bloc(':root', typescale)),
      section("Opacités d'état (valeurs MD3 : les tokens n'en fournissent pas)", bloc(':root', etats)),
    ].join('\n')],
    ['md3/couleurs.css', blocsCouleurs('md3/couleurs')],
    [`${nom}.css`, [
      section('Variables hors MD3 identiques dans tous les modes', bloc(':root', declarations('app'))),
      blocsCouleurs('app'),
    ].join('\n')],
  ]);

  const variables = new Set([...reference.jetons.map((j) => j.variable), ...etats.map(([v]) => v)]);
  const rapport = {
    md3: reference.jetons.filter((j) => j.cible === 'md3').length + etats.length,
    custom: reference.jetons.filter((j) => j.cible === 'custom').length,
    ignores: reference.ignores,
    inconnus: reference.inconnus,
    modesIgnores,
  };
  return { fichiers, variables, rapport };
}

/** Mêmes tokens écrits dans tous les modes, et valeurs non couleur identiques. */
function verifierCoherence(parMode, reference) {
  const attendu = reference.jetons.map((j) => j.variable);
  const problemes = [];
  for (const [mode, { jetons, inconnus }] of parMode) {
    const variables = jetons.map((j) => j.variable);
    const differences = [...attendu.filter((v) => !variables.includes(v)), ...variables.filter((v) => !attendu.includes(v))];
    if (differences.length > 0) problemes.push(`${mode} : jeu de tokens différent de « light » (${differences.slice(0, 5).join(', ')}…)`);
    if (inconnus.join() !== reference.inconnus.join()) problemes.push(`${mode} : tokens non reconnus différents de « light »`);
    const valeurs = new Map(jetons.map((j) => [j.variable, j.valeur]));
    for (const j of reference.jetons.filter((x) => x.type !== 'color')) {
      if (valeurs.get(j.variable) !== j.valeur) {
        problemes.push(`${mode} : ${j.variable} = ${valeurs.get(j.variable)} (« light » : ${j.valeur})`);
      }
    }
  }
  if (problemes.length > 0) {
    throw new Error(`Les tokens non couleur doivent être identiques dans les 8 modes :\n  ${problemes.join('\n  ')}`);
  }
}
