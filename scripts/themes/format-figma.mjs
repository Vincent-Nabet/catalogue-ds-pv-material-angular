// Adaptateur de l'export natif de Figma (panneau Variables → « Export modes » : `Primitives.zip` + `Semantics.zip`)
// vers la forme interne du générateur (`{ primitives, semantiques, origine }`, dialecte de l'ancien format).
// Pur, sans `node:fs` : partagé par Node et le navigateur. Les modules en aval n'en savent rien.
//
// Différences avec l'ancien format, absorbées ici (cf. docs/generation-themes.md) :
//   - couleur en objet `{ colorSpace, components, alpha, hex }` ; alias de couleur déjà résolus (le lien est dans
//     `$extensions`, utilisé seulement comme contrôle de cohérence) ;
//   - dimensions en nombres, graisses et familles en chaînes (`"SemiBold"`) ;
//   - rôles groupés (`Colors.Schemes.Standard.Primary`) et `Neutral.{White,Black}`.
import { ROLES_CUSTOM, ROLES_MD3 } from './correspondance.mjs';
import { aplatir } from './resoudre-tokens.mjs';

const ALIAS = /^\{([^{}]+)\}$/;
const HEX_COULEUR = /^#[0-9a-f]{6}$/i;
const HEX_ANCIEN = /^#[0-9a-f]{3,8}$/i;
const EXTENSION_MODE = 'com.figma.modeName';
const EXTENSION_LIEN = 'com.figma.aliasData';
const EXEMPLES_MAX = 10;

/** Graisses nommées (clé normalisée : minuscules, sans espace, tiret ni soulignement) → valeur numérique. */
const GRAISSES = new Map([
  ['thin', 100], ['extralight', 200], ['ultralight', 200], ['light', 300],
  ['regular', 400], ['normal', 400], ['book', 400], ['medium', 500],
  ['semibold', 600], ['demibold', 600], ['bold', 700],
  ['extrabold', 800], ['ultrabold', 800], ['black', 900], ['heavy', 900],
]);
/** Rôles connus du générateur (clés en kebab, comme `correspondance.mjs`), dans l'ordre canonique. */
const ORDRE_ROLES = new Map([...ROLES_MD3, ...ROLES_CUSTOM].map((role, i) => [role, i]));
const NEUTRE = new Map([['White', '0'], ['Black', '900']]);
/** Noms qui, utilisés comme clé de l'arbre (`poser`), atteindraient le prototype des objets au lieu d'un nœud du thème. */
const SEGMENTS_INTERDITS = new Set(['__proto__', 'constructor', 'prototype']);

const kebab = (texte) => texte.trim().toLowerCase().replace(/\s+/g, '-');
const estObjet = (valeur) => valeur !== null && typeof valeur === 'object' && !Array.isArray(valeur);

/** Parcourt les jetons d'un arbre DTCG : `visiter(jeton, segments)` pour chaque nœud portant `$value`. */
function parcourirJetons(arbre, visiter, segments = []) {
  for (const [cle, valeur] of Object.entries(arbre)) {
    if (cle.startsWith('$') || !estObjet(valeur)) continue;
    if ('$value' in valeur) visiter(valeur, [...segments, cle]);
    else parcourirJetons(valeur, visiter, [...segments, cle]);
  }
}

/**
 * Format d'un fichier JSON de tokens, d'après son contenu : `'natif'` (export de Figma : `modeName` à la racine ou
 * couleur en objet `{ colorSpace, components }`), `'ancien'` (couleur littérale `#hex`) ou `null` (aucun signal).
 */
export function detecterFormat(json) {
  if (!estObjet(json)) return null;
  if (typeof json.$extensions?.[EXTENSION_MODE] === 'string') return 'natif';
  let format = null;
  parcourirJetons(json, (jeton) => {
    if (format === 'natif' || jeton.$type !== 'color') return;
    const valeur = jeton.$value;
    if (estObjet(valeur) && 'colorSpace' in valeur && 'components' in valeur) format = 'natif';
    else if (typeof valeur === 'string' && HEX_ANCIEN.test(valeur)) format = 'ancien';
  });
  return format;
}

/**
 * Rôle d'un fichier natif : `'semantique'` (contient `Colors.Schemes` ou `Typescale`), `'primitives'`
 * (`Font theme`, `Radius`, `Spacing` ou `Colors.<palette>`) ou `null`.
 */
export function classerFichierFigma(json) {
  if (!estObjet(json)) return null;
  if (estObjet(json.Colors?.Schemes) || estObjet(json.Typescale)) return 'semantique';
  if (['Font theme', 'Radius', 'Spacing', 'Colors'].some((cle) => estObjet(json[cle]))) return 'primitives';
  return null;
}

/** Nom de mode normalisé : minuscules, séparateurs (`-`, `_`, `.`, espace) → un seul `-` (`Dark High Contrast` → `dark-high-contrast`). */
export const normaliserMode = (nom) => nom.toLowerCase().split(/[-_.\s]+/).filter(Boolean).join('-');

const estGraisse = (segments) => segments.at(-1).startsWith('Weight') || segments.at(-2) === 'Weight';
const estFamille = (segments) => segments.at(-1) === 'Font' || segments.at(-2) === 'Font';

/** Octet hexadécimal d'une composante dans [0, 1] ; `null` si la valeur n'est pas un nombre fini dans cet intervalle. */
function octet(composante) {
  if (typeof composante !== 'number' || !Number.isFinite(composante) || composante < 0 || composante > 1) return null;
  return Math.round(composante * 255).toString(16).padStart(2, '0').toUpperCase();
}

/** Objet couleur de Figma → `#RRGGBB` (ou `#RRGGBBAA` si `alpha` < 1) ; `components` fait foi, `hex` n'est que comparé. */
function convertirCouleur(valeur, nom, avertir) {
  if (valeur.colorSpace !== undefined && valeur.colorSpace !== 'srgb') {
    throw new Error(`Jeton « ${nom} » : espace colorimétrique « ${String(valeur.colorSpace)} » non géré (seul srgb l'est).`);
  }
  const alpha = valeur.alpha ?? 1;
  const octetAlpha = octet(alpha);
  if (octetAlpha === null) throw new Error(`Jeton « ${nom} » : opacité invalide (${JSON.stringify(valeur.alpha)}).`);
  const suffixe = alpha < 1 ? octetAlpha : '';

  if (valeur.components === undefined && typeof valeur.hex === 'string' && HEX_COULEUR.test(valeur.hex.slice(0, 7))) {
    return `${valeur.hex.slice(0, 7).toUpperCase()}${suffixe}`;
  }
  const octets = Array.isArray(valeur.components) && valeur.components.length === 3 ? valeur.components.map(octet) : null;
  if (!octets || octets.includes(null)) {
    throw new Error(`Jeton « ${nom} » : composantes de couleur invalides (${JSON.stringify(valeur.components)} ; trois nombres entre 0 et 1 attendus).`);
  }
  const hex = `#${octets.join('')}`;
  if (typeof valeur.hex === 'string' && valeur.hex.slice(0, 7).toUpperCase() !== hex) {
    avertir(`Couleur « ${nom} » : « hex » (${valeur.hex}) ne correspond pas à « components » (${hex}) ; « components » est retenu`);
  }
  return `${hex}${suffixe}`;
}

/** Graisse nommée (`"SemiBold"`) ou numérique (`"400"`, `400`) → nombre. Une graisse inconnue est une erreur. */
function convertirGraisse(valeur, nom) {
  if (typeof valeur === 'number' && Number.isFinite(valeur)) return valeur;
  if (typeof valeur === 'string') {
    if (/^\d+$/.test(valeur.trim())) return Number(valeur);
    const graisse = GRAISSES.get(valeur.toLowerCase().replace(/[\s_-]+/g, ''));
    if (graisse !== undefined) return graisse;
  }
  throw new Error(
    `Jeton « ${nom} » : graisse « ${String(valeur)} » inconnue (noms acceptés : ${[...GRAISSES.keys()].join(', ')}, ou un nombre).`,
  );
}

/**
 * Réécrit un chemin de jeton (segments) vers celui que le générateur attend : les groupes de rôles de
 * `Colors.Schemes` sont aplatis, `Neutral.White/Black` deviennent `Neutral.0/900`. Un chemin plus profond perd son
 * seul groupe ; tout autre chemin est inchangé.
 */
function reecrireChemin(segments) {
  if (segments[0] !== 'Colors' || segments[1] !== 'Schemes' || segments.length < 4) return segments;
  if (segments[2] === 'Neutral') return segments.length === 4 && NEUTRE.has(segments[3]) ? ['Colors', 'Schemes', 'Neutral', NEUTRE.get(segments[3])] : segments;
  return ['Colors', 'Schemes', ...segments.slice(3)];
}

const reecrireAlias = (cible) => `{${reecrireChemin(cible.split('.')).join('.')}}`;

/**
 * Convertit un jeton natif en `{ type, valeur }` du dialecte interne. Un type inconnu est transmis tel quel
 * (`classer()` le signalera). Une valeur `{chemin}` reste un alias, réécrit comme les chemins.
 */
function convertirJeton(jeton, segments, nom, avertir) {
  const valeur = jeton.$value;
  let typeInterne;
  if (jeton.$type === 'color') typeInterne = 'color';
  else if (jeton.$type === 'number') typeInterne = estGraisse(segments) ? 'fontWeight' : 'dimension';
  else if (jeton.$type === 'string') typeInterne = estGraisse(segments) ? 'fontWeight' : estFamille(segments) ? 'fontFamily' : 'string';
  else return { type: jeton.$type, valeur };

  if (typeof valeur === 'string' && ALIAS.test(valeur)) return { type: typeInterne, valeur: reecrireAlias(ALIAS.exec(valeur)[1]) };
  if (typeInterne === 'color') {
    if (!estObjet(valeur)) throw new Error(`Jeton « ${nom} » : valeur de couleur illisible (${JSON.stringify(valeur)}).`);
    return { type: 'color', valeur: convertirCouleur(valeur, nom, avertir) };
  }
  if (typeInterne === 'fontWeight') return { type: 'fontWeight', valeur: convertirGraisse(valeur, nom) };
  if (typeInterne === 'dimension') {
    if (typeof valeur !== 'number' || !Number.isFinite(valeur)) throw new Error(`Jeton « ${nom} » : nombre attendu (${JSON.stringify(valeur)}).`);
    return { type: 'dimension', valeur: `${Number(valeur.toFixed(4))}px` };
  }
  return { type: typeInterne, valeur };
}

/** Pose `jeton` dans l'arbre le long de `segments`. */
function poser(arbre, segments, jeton) {
  let noeud = arbre;
  for (const segment of segments.slice(0, -1)) noeud = noeud[segment] ??= {};
  noeud[segments.at(-1)] = jeton;
}

/** Trie les rôles de `Colors.Schemes` : ordre canonique, rôles inconnus ensuite (ordre source), `Neutral` en dernier. */
function trierRoles(arbre) {
  const schemes = arbre.Colors?.Schemes;
  if (!schemes) return;
  const rang = (cle) => (cle === 'Neutral' ? Number.MAX_SAFE_INTEGER : (ORDRE_ROLES.get(kebab(cle)) ?? ORDRE_ROLES.size));
  const cles = Object.keys(schemes).map((cle, i) => ({ cle, i })).sort((a, b) => rang(a.cle) - rang(b.cle) || a.i - b.i);
  const trie = Object.fromEntries(cles.map(({ cle }) => [cle, schemes[cle]]));
  arbre.Colors.Schemes = trie;
}

/**
 * Convertit un fichier natif en arbre du dialecte interne.
 * `fichier` nomme le fichier dans les messages. Retourne `{ arbre, avertissements, liens }` où `liens` liste les jetons
 * portant un lien d'alias de Figma vers une primitive : `{ nom, cible, valeur }` (contrôle de cohérence).
 */
export function adapter(json, { fichier = 'fichier' } = {}) {
  const avertissements = [];
  const liens = [];
  const sources = new Map(); // chemin final → chemin source (collisions)
  const groupes = new Map(); // groupe de rôles → vrai s'il contient un rôle connu
  const arbre = {};

  parcourirJetons(json, (jeton, segments) => {
    const nom = segments.join('.');
    const interdit = segments.find((segment) => SEGMENTS_INTERDITS.has(segment));
    if (interdit !== undefined) {
      throw new Error(`Jeton « ${nom} » dans « ${fichier} » : le nom « ${interdit} » est réservé et ne peut pas servir de nom de groupe ou de jeton.`);
    }
    const chemin = reecrireChemin(segments);
    if (segments[0] === 'Colors' && segments[1] === 'Schemes' && segments.length === 4 && segments[2] !== 'Neutral') {
      groupes.set(segments[2], groupes.get(segments[2]) || ORDRE_ROLES.has(kebab(segments[3])));
    }
    const final = chemin.join('.');
    if (sources.has(final)) {
      throw new Error(`Rôle « ${final} » défini deux fois dans « ${fichier} » : « ${sources.get(final)} » et « ${nom} ».`);
    }
    sources.set(final, nom);

    const { type, valeur } = convertirJeton(jeton, segments, nom, (message) => avertissements.push(`${message} (dans « ${fichier} »)`));
    poser(arbre, chemin, { $type: type, $value: valeur });
    const lien = jeton.$extensions?.[EXTENSION_LIEN];
    if (typeof lien?.targetVariableName === 'string' && !(typeof valeur === 'string' && ALIAS.test(valeur))) {
      liens.push({ nom, cible: lien.targetVariableName.split('/').join('.'), ensemble: lien.targetVariableSetName, valeur });
    }
  });

  for (const [groupe, connu] of groupes) {
    if (!connu) avertissements.push(`Groupe de rôles inconnu aplati dans « ${fichier} » : « ${groupe} » (aucun de ses rôles n'est reconnu).`);
  }
  trierRoles(arbre);
  return { arbre, avertissements, liens };
}

/**
 * Assemble un export natif : `entrees` = `[{ chemin, json }]` (un fichier `*.tokens.json` chacune, déjà lu), `origine` =
 * nom affiché dans les en-têtes. Retourne `{ primitives, semantiques, origine, format: 'natif', avertissements }` où
 * `semantiques` associe le nom normalisé du mode (nom du fichier) à son arbre.
 */
export function assemblerFigma(entrees, origine) {
  const nomFichier = (chemin) => chemin.slice(chemin.lastIndexOf('/') + 1).replace(/\.tokens\.json$/, '');
  const primitives = [];
  const semantiques = [];
  for (const entree of entrees) {
    const role = classerFichierFigma(entree.json);
    if (role === 'primitives') primitives.push(entree);
    else if (role === 'semantique') semantiques.push(entree);
    else throw new Error(`Fichier de tokens non reconnu : « ${entree.chemin} » (ni primitives ni sémantique de l'export natif de Figma).`);
  }
  if (primitives.length === 0) {
    throw new Error(
      'Export Figma incomplet : aucun fichier de primitives (collection « Primitives ») parmi les sources. ' +
        'Ajoutez --source Primitives.zip (page : sélectionnez les deux archives ensemble).',
    );
  }
  if (primitives.length > 1) {
    throw new Error(`Plusieurs fichiers de primitives : ${primitives.map((e) => `« ${e.chemin} »`).join(', ')} (un seul est attendu).`);
  }
  if (semantiques.length === 0) {
    throw new Error('Export Figma incomplet : aucun mode sémantique (Light, Dark…) parmi les sources.');
  }

  const avertissements = [];
  const base = adapter(primitives[0].json, { fichier: primitives[0].chemin });
  avertissements.push(...base.avertissements);
  const valeursPrimitives = new Map([...aplatir(base.arbre, primitives[0].chemin)].map(([chemin, jeton]) => [chemin, jeton.brut]));

  const modes = new Map();
  const ecarts = [];
  for (const entree of semantiques) {
    const mode = normaliserMode(nomFichier(entree.chemin));
    if (mode === '') throw new Error(`Nom de mode vide pour « ${entree.chemin} ».`);
    if (modes.has(mode)) throw new Error(`Mode « ${mode} » défini deux fois : « ${modes.get(mode).chemin} » et « ${entree.chemin} ».`);
    const { arbre, avertissements: avis, liens } = adapter(entree.json, { fichier: entree.chemin });
    avertissements.push(...avis);
    modes.set(mode, { chemin: entree.chemin, arbre });
    for (const lien of liens) {
      const attendu = valeursPrimitives.get(lien.cible);
      if (attendu === undefined ? lien.ensemble === 'Primitives' : String(attendu) !== String(lien.valeur)) {
        ecarts.push(`« ${entree.chemin} » : ${lien.nom} vaut ${lien.valeur} mais « ${lien.cible} » vaut ${attendu ?? '(absent)'}`);
      }
    }
  }
  if (ecarts.length > 0) {
    const exemples = ecarts.slice(0, EXEMPLES_MAX).join(' ; ');
    const suite = ecarts.length > EXEMPLES_MAX ? `, … et ${ecarts.length - EXEMPLES_MAX} autre(s)` : '';
    avertissements.push(
      `Les primitives et les sémantiques ne semblent pas issues du même export : ${ecarts.length} valeur(s) diffèrent de leur primitive (${exemples}${suite}).`,
    );
  }

  return {
    primitives: base.arbre,
    semantiques: Object.fromEntries([...modes].sort(([a], [b]) => (a < b ? -1 : 1)).map(([mode, { arbre }]) => [mode, arbre])),
    origine,
    format: 'natif',
    avertissements,
  };
}
