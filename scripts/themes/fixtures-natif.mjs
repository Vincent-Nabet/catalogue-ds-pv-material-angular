// Fixtures du format natif de Figma : l'INVERSE de l'adaptateur (`format-figma.mjs`). Elles convertissent l'ancien
// format (`tokens/`, lecture seule) en export natif (`Primitives.zip` + `Semantics.zip`) pour les tests et les bancs.
// Limite : écrites par nous, elles partagent nos hypothèses ; `fixtures/natif-extrait/` (copie littérale de l'export
// réel) est le garde-fou contre cette circularité. Rien n'est écrit sur le disque.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { strToU8, zipSync } from 'fflate';
import { aplatir } from './resoudre-tokens.mjs';
import { fichiersTokens } from './fixtures-tokens.mjs';

/** Mode de l'ancien format → nom du mode natif (nom du fichier, sans `.tokens.json`). */
export const MODES_NATIFS = {
  light: 'Light',
  'light-medium-contrast': 'Light Medium Contrast',
  'light-high-contrast': 'Light High Contrast',
  dark: 'Dark',
  'dark-medium-contrast': 'Dark Medium Contrast',
  'dark-high-contrast': 'Dark High Contrast',
  'monochrome-lt': 'Monochrome LT',
  'monochrome-dt': 'Monochrome DT',
};

/**
 * Regroupement des rôles par Figma, relevé dans l'export réel (ordre compris). Codé en dur à dessein : la fixture
 * imite Figma, l'adaptateur n'en dépend pas.
 */
export const GROUPES_NATIFS = {
  Standard: [
    'Primary', 'On Primary', 'Primary Container', 'On Primary Container', 'Secondary', 'On Secondary', 'Secondary Container',
    'On Secondary Container', 'Tertiary', 'On Tertiary', 'Tertiary Container', 'On Tertiary Container', 'Background',
    'On Background', 'Outline', 'Outline Variant', 'Shadow',
  ],
  Surface: [
    'Surface Tint', 'Surface', 'On Surface', 'Inverse Surface', 'Inverse On Surface', 'Surface Variant', 'On Surface Variant',
    'Scrim', 'Inverse Primary', 'Surface Dim', 'Surface Bright', 'Surface Container Lowest', 'Surface Container Low',
    'Surface Container', 'Surface Container High', 'Surface Container Highest',
  ],
  Fixed: [
    'On Primary Fixed', 'Primary Fixed', 'Primary Fixed Dim', 'On Primary Fixed Variant', 'Secondary Fixed', 'On Secondary Fixed',
    'Secondary Fixed Dim', 'On Secondary Fixed Variant', 'Tertiary Fixed', 'On Tertiary Fixed', 'Tertiary Fixed Dim',
    'On Tertiary Fixed Variant',
  ],
  States: [
    'Error', 'On Error', 'Error Container', 'On Error Container', 'Success', 'On Success', 'Success Container',
    'On Success Container', 'Info', 'On Info', 'Info Container', 'On Info Container', 'Warning', 'On Warning',
    'Warning Container', 'On Warning Container',
  ],
};

const GRAISSES = new Map([[400, 'Regular'], [500, 'Medium'], [600, 'SemiBold']]);
const NEUTRE = { 0: 'White', 900: 'Black' };
const ALIAS = /^\{([^{}]+)\}$/;

/** `#RRGGBB` → objet couleur de Figma (`components` en float32, comme l'export réel). */
function couleur(hex, alpha = 1) {
  const octets = [1, 3, 5].map((i) => Number.parseInt(hex.slice(i, i + 2), 16));
  return { colorSpace: 'srgb', components: octets.map((o) => Math.fround(o / 255)), alpha, hex: hex.toUpperCase() };
}

/**
 * `{ primitives, semantiques }` (ancien format, objets JSON ; `semantiques` : mode → JSON) →
 * `{ primitives, semantiques }` natifs (`semantiques` : nom natif du mode → JSON).
 */
export function versNatif({ primitives, semantiques }) {
  let compteur = 0;
  const extensions = (supplement = {}) => ({ 'com.figma.variableId': `VariableID:essai:${++compteur}`, ...supplement });
  const prim = aplatir(primitives, 'primitives');

  /** Valeur résolue d'un token (suit les alias) et nom, en notation Figma, du primitif visé s'il y en a un. */
  const suivre = (chemin, jetons) => {
    let courant = chemin;
    let cible = null;
    for (;;) {
      const jeton = jetons.get(courant) ?? prim.get(courant);
      const alias = typeof jeton.brut === 'string' ? ALIAS.exec(jeton.brut) : null;
      if (!alias) return { jeton, cible };
      courant = alias[1];
      if (prim.has(courant)) cible = courant;
    }
  };
  const lienFigma = (cible) => ({
    'com.figma.aliasData': { targetVariableName: cible.replaceAll('.', '/'), targetVariableSetName: 'Primitives' },
  });

  const convertir = ({ type, valeur }, chemin) => {
    if (type === 'color') return { $type: 'color', $value: couleur(valeur) };
    if (type === 'dimension') return { $type: 'number', $value: Number.parseFloat(valeur) };
    if (type === 'fontFamily') return { $type: 'string', $value: valeur };
    if (type === 'fontWeight') {
      if (!GRAISSES.has(valeur)) throw new Error(`Graisse ${valeur} sans nom natif (${chemin}).`);
      return { $type: 'string', $value: GRAISSES.get(valeur) };
    }
    throw new Error(`Type ${type} non géré par la fixture (${chemin}).`);
  };

  const poser = (arbre, segments, jeton) => {
    let noeud = arbre;
    for (const segment of segments.slice(0, -1)) noeud = noeud[segment] ??= {};
    noeud[segments.at(-1)] = jeton;
  };

  const primitivesNatives = {};
  for (const [chemin, { type, brut }] of prim) {
    if (chemin === 'Number' || chemin === 'Number 2') continue;
    poser(primitivesNatives, chemin.split('.'), { ...convertir({ type, valeur: brut }, chemin), $extensions: extensions() });
  }
  primitivesNatives.$extensions = { 'com.figma.modeName': 'Baseline' };

  const semantiquesNatives = {};
  for (const [mode, json] of Object.entries(semantiques)) {
    const nom = MODES_NATIFS[mode];
    if (!nom) throw new Error(`Mode « ${mode} » sans nom natif.`);
    const jetons = aplatir(json, mode);
    const natifs = new Map();

    for (const [chemin, jeton] of jetons) {
      const segments = chemin.split('.');
      const alias = typeof jeton.brut === 'string' ? ALIAS.exec(jeton.brut) : null;
      const [racine, groupe, cle] = segments;
      let chemins = segments;
      if (racine === 'Colors' && groupe === 'Schemes' && segments.length === 3) {
        const groupeFigma = Object.keys(GROUPES_NATIFS).find((g) => GROUPES_NATIFS[g].includes(cle));
        if (!groupeFigma) throw new Error(`Rôle « ${cle} » absent des groupes de la fixture.`);
        chemins = ['Colors', 'Schemes', groupeFigma, cle];
      } else if (racine === 'Colors' && groupe === 'Schemes' && segments[2] === 'Neutral') {
        chemins = ['Colors', 'Schemes', 'Neutral', NEUTRE[segments[3]]];
      }

      // Alias littéral conservé (comme Figma) : uniquement vers `Neutral`.
      if (alias && alias[1].startsWith('Colors.Schemes.Neutral.')) {
        const cibleNeutre = alias[1].split('.');
        natifs.set(chemin, { chemins, jeton: { $type: 'color', $value: `{${[...cibleNeutre.slice(0, 3), NEUTRE[cibleNeutre[3]]].join('.')}}`, $extensions: extensions() } });
        continue;
      }
      const { jeton: final, cible } = suivre(chemin, jetons);
      const natif = convertir({ type: jeton.type, valeur: final.brut }, chemin);
      if (racine === 'Colors' && groupe === 'State Layers') {
        // Couleur littérale avec alpha (`Opacity-08` → 0,08), comme l'export réel.
        const alpha = Math.fround(Number(segments[3].slice('Opacity-'.length)) / 100);
        natif.$value = couleur(final.brut, alpha);
        natifs.set(chemin, { chemins, jeton: { ...natif, $extensions: extensions() } });
        continue;
      }
      natifs.set(chemin, { chemins, jeton: { ...natif, $extensions: extensions(cible ? lienFigma(cible) : {}) } });
    }

    // Arbre dans l'ordre de Figma : Schemes (groupes puis Neutral), State Layers, Add-ons, Typescale.
    const arbre = {};
    for (const roles of Object.values(GROUPES_NATIFS)) {
      for (const role of roles) {
        const entree = natifs.get(`Colors.Schemes.${role}`);
        if (!entree) throw new Error(`Rôle « ${role} » absent du mode « ${mode} ».`);
        poser(arbre, entree.chemins, entree.jeton);
      }
    }
    for (const n of ['900', '0']) {
      const entree = natifs.get(`Colors.Schemes.Neutral.${n}`);
      if (entree) poser(arbre, entree.chemins, entree.jeton);
    }
    for (const [chemin, { chemins, jeton }] of natifs) {
      if (!chemin.startsWith('Colors.Schemes.')) poser(arbre, chemins, jeton);
    }
    arbre.$extensions = { 'com.figma.modeName': nom };
    semantiquesNatives[nom] = arbre;
  }
  return { primitives: primitivesNatives, semantiques: semantiquesNatives };
}

/**
 * Export natif construit depuis `tokens/` : `{ primitives: { 'Baseline.tokens.json': texte },
 * semantiques: { 'Light.tokens.json': texte, … } }`.
 */
export function fichiersNatifs() {
  const brut = fichiersTokens();
  const semantiques = {};
  for (const [chemin, texte] of Object.entries(brut)) {
    if (chemin.startsWith('semantics/')) semantiques[chemin.slice('semantics/'.length, -'.tokens.json'.length)] = JSON.parse(texte);
  }
  const natif = versNatif({ primitives: JSON.parse(brut['primitives.tokens.json']), semantiques });
  const texte = (json) => `${JSON.stringify(json, null, 2)}\n`;
  return {
    primitives: { 'Baseline.tokens.json': texte(natif.primitives) },
    semantiques: Object.fromEntries(Object.entries(natif.semantiques).map(([nom, json]) => [`${nom}.tokens.json`, texte(json)])),
  };
}

const zip = (fichiers) => zipSync(Object.fromEntries(Object.entries(fichiers).map(([chemin, texte]) => [chemin, strToU8(texte)])));

/** Octets de `Primitives.zip`, `Semantics.zip` et d'un zip combiné (les 9 fichiers). */
export function zipsNatifs() {
  const { primitives, semantiques } = fichiersNatifs();
  return { primitives: zip(primitives), semantiques: zip(semantiques), combine: zip({ ...primitives, ...semantiques }) };
}

/** Chemin et contenu JSON d'un fichier de l'extrait réel (`fixtures/natif-extrait/`). */
export function extraitReel(nom) {
  const chemin = fileURLToPath(new URL(`./fixtures/natif-extrait/${nom}`, import.meta.url));
  return JSON.parse(readFileSync(chemin, 'utf8'));
}
