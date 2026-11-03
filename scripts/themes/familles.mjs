// Détection des familles de contraste à partir des NOMS des fichiers `semantics/<mode>.tokens.json`.
//
// Une famille = une paire clair/sombre. Le nom d'un mode est découpé en mots (séparateurs `-`, `_`, `.`,
// espace) ; le mot clair (`light`, `lt`, `clair`) ou sombre (`dark`, `dt`, `sombre`) indique le schéma, les
// autres mots forment la clé de famille :
//   light / dark                          → clé ``                (famille standard)
//   light-medium-contrast / dark-…        → clé `medium-contrast`
//   monochrome-lt / monochrome-dt         → clé `monochrome`
// Les mots communs à toutes les clés (ex. `theme-` devant chaque fichier) sont retirés. Un nombre quelconque
// de familles est accepté (une seule suffit) ; un fichier sans mot clair/sombre est ignoré (avertissement).

const MOTS_CLAIR = new Set(['light', 'lt', 'clair', 'claire']);
const MOTS_SOMBRE = new Set(['dark', 'dt', 'sombre']);

/** Clés connues → suffixe de classe (français), libellé et rang d'affichage. Les autres clés sont déduites du nom. */
const CONNUES = new Map([
  ['medium-contrast', { suffixe: 'contraste-moyen', libelle: 'Contraste moyen', rang: 1 }],
  ['medium', { suffixe: 'contraste-moyen', libelle: 'Contraste moyen', rang: 1 }],
  ['mc', { suffixe: 'contraste-moyen', libelle: 'Contraste moyen', rang: 1 }],
  ['contraste-moyen', { suffixe: 'contraste-moyen', libelle: 'Contraste moyen', rang: 1 }],
  ['high-contrast', { suffixe: 'contraste-eleve', libelle: 'Contraste élevé', rang: 2 }],
  ['high', { suffixe: 'contraste-eleve', libelle: 'Contraste élevé', rang: 2 }],
  ['hc', { suffixe: 'contraste-eleve', libelle: 'Contraste élevé', rang: 2 }],
  ['contraste-eleve', { suffixe: 'contraste-eleve', libelle: 'Contraste élevé', rang: 2 }],
]);

const mots = (nomMode) => nomMode.toLowerCase().split(/[-_.\s]+/).filter(Boolean);
const slug = (texte) => texte.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const capitaliser = (texte) => texte.charAt(0).toUpperCase() + texte.slice(1);

/**
 * `nomsModes` : noms des fichiers sémantiques (sans `.tokens.json`).
 * Retourne `{ familles, ignores }` : `familles` triées (la famille par défaut d'abord), chacune
 * `{ id, cle, suffixe, libelle, clair, sombre, defaut, progression }` ; `ignores` : modes sans schéma reconnu.
 */
export function detecterFamilles(nomsModes) {
  const groupes = new Map();
  const ignores = [];
  for (const mode of nomsModes) {
    const liste = mots(mode);
    const claires = liste.filter((m) => MOTS_CLAIR.has(m));
    const sombres = liste.filter((m) => MOTS_SOMBRE.has(m));
    if (claires.length + sombres.length !== 1) {
      ignores.push(mode);
      continue;
    }
    const schema = claires.length === 1 ? 'clair' : 'sombre';
    const cle = liste.filter((m) => !MOTS_CLAIR.has(m) && !MOTS_SOMBRE.has(m));
    const id = cle.join('-');
    const groupe = groupes.get(id) ?? { mots: cle };
    if (groupe[schema]) {
      throw new Error(`Modes « ${groupe[schema]} » et « ${mode} » ambigus : tous deux « ${schema} » de la même famille.`);
    }
    groupe[schema] = mode;
    groupes.set(id, groupe);
  }

  const incompletes = [...groupes.values()].filter((g) => !g.clair || !g.sombre);
  if (incompletes.length > 0) {
    throw new Error(
      `Famille incomplète : ${incompletes.map((g) => `« ${g.clair ?? g.sombre} » n'a pas de ${g.clair ? 'mode sombre' : 'mode clair'}`).join(' ; ')} ` +
        `(un mode clair et un mode sombre sont requis par famille ; mots reconnus : light/lt/clair, dark/dt/sombre).`,
    );
  }
  if (groupes.size === 0) {
    throw new Error(
      `Aucune paire clair/sombre reconnue parmi : ${nomsModes.join(', ') || '(aucun)'}. ` +
        `Les noms de fichiers doivent contenir light/lt/clair et dark/dt/sombre.`,
    );
  }

  // Mots communs à toutes les clés (préfixe ou suffixe) : sans intérêt pour distinguer les familles.
  const brutes = [...groupes.values()];
  if (brutes.length > 1) {
    while (brutes.every((g) => g.mots.length > 0 && g.mots[0] === brutes[0].mots[0])) brutes.forEach((g) => g.mots.shift());
    while (brutes.every((g) => g.mots.length > 0 && g.mots.at(-1) === brutes[0].mots.at(-1))) brutes.forEach((g) => g.mots.pop());
  } else {
    brutes[0].mots = [];
  }

  const familles = brutes.map((g) => {
    const cle = g.mots.join('-');
    const connue = CONNUES.get(cle);
    const suffixe = connue?.suffixe ?? slug(cle);
    return {
      id: suffixe || 'standard',
      cle,
      suffixe,
      libelle: connue?.libelle ?? (cle ? capitaliser(g.mots.join(' ')) : 'Standard'),
      clair: g.clair,
      sombre: g.sombre,
      rang: cle === '' ? -1 : (connue?.rang ?? 100),
    };
  });
  familles.sort((a, b) => a.rang - b.rang || (a.cle < b.cle ? -1 : 1));

  const doublons = familles.filter((f, i) => familles.findIndex((g) => g.suffixe === f.suffixe) !== i);
  if (doublons.length > 0) {
    throw new Error(`Familles de même nom de classe : ${doublons.map((f) => `« ${f.clair} » / « ${f.sombre} »`).join(', ')}.`);
  }
  // Famille par défaut (appliquée aussi sur :root) : la standard (clé vide), sinon la première.
  // `progression` : familles de la progression du contraste (standard, moyen, élevé), hors familles libres.
  return { familles: familles.map(({ rang, ...f }, i) => ({ ...f, defaut: i === 0, progression: rang < 100 })), ignores };
}
