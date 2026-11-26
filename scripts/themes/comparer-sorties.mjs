// Comparaison de deux sorties du générateur (textes CSS ou Map de fichiers) : « identique » (même texte hors
// en-tête « Fichier généré… »), « equivalent » (mêmes blocs, mêmes commentaires, mêmes déclarations, ordre des
// déclarations différent) ou « different » (liste des écarts nommés). Pur, sans `node:fs` : sert aux tests et au banc.

const ENTETE = /^(?:\/\* Fichier généré par `npm run themes`[^]*?\*\/|<!-- Fichier généré par `npm run themes`[^]*?-->)\n\n/;
const normaliser = (texte) => texte.replaceAll('\r\n', '\n').replace(ENTETE, '');

/**
 * CSS → blocs `{ cle, commentaire, selecteur, declarations: Map variable → valeur }`, dans l'ordre du texte.
 * Le commentaire de section (`/* … *\/` seul sur sa ligne) s'applique aux blocs qui le suivent. `cle` identifie un bloc ;
 * dans un CSS concaténé, des blocs de même commentaire et de même sélecteur se distinguent par leur rang (« (bloc 2) »).
 */
function blocsDe(texte) {
  const blocs = [];
  const occurrences = new Map();
  let commentaire = '';
  let courant = null;
  for (const ligne of texte.split('\n')) {
    const commentaireSeul = /^\/\* (.*) \*\/$/.exec(ligne);
    const ouverture = /^(.+) \{$/.exec(ligne);
    const declaration = /^ {2}(--[a-z0-9-]+): (.*);$/.exec(ligne);
    if (!courant && commentaireSeul) commentaire = commentaireSeul[1];
    else if (!courant && ouverture) courant = { commentaire, selecteur: ouverture[1], declarations: new Map() };
    else if (courant && declaration) courant.declarations.set(declaration[1], declaration[2]);
    else if (courant && ligne === '}') {
      const identifiant = `${courant.commentaire} | ${courant.selecteur}`;
      const rang = (occurrences.get(identifiant) ?? 0) + 1;
      occurrences.set(identifiant, rang);
      blocs.push({ ...courant, cle: rang === 1 ? identifiant : `${identifiant} (bloc ${rang})` });
      courant = null;
    }
  }
  return blocs;
}

/** Compare deux CSS ; retourne `{ statut, ecarts }`. */
function comparerCss(a, b) {
  const [blocsA, blocsB] = [blocsDe(a), blocsDe(b)];
  const ecarts = [];
  const parCleB = new Map(blocsB.map((bloc) => [bloc.cle, bloc]));
  for (const blocA of blocsA) {
    const blocB = parCleB.get(blocA.cle);
    if (!blocB) {
      ecarts.push(`${blocA.cle} : bloc absent de la seconde sortie`);
      continue;
    }
    for (const [variable, valeurA] of blocA.declarations) {
      if (!blocB.declarations.has(variable)) ecarts.push(`${blocA.cle} : ${variable} : ${valeurA} → (absente)`);
      else if (blocB.declarations.get(variable) !== valeurA) ecarts.push(`${blocA.cle} : ${variable} : ${valeurA} → ${blocB.declarations.get(variable)}`);
    }
    for (const variable of blocB.declarations.keys()) {
      if (!blocA.declarations.has(variable)) ecarts.push(`${blocA.cle} : ${variable} : (absente) → ${blocB.declarations.get(variable)}`);
    }
  }
  const clesA = new Set(blocsA.map((bloc) => bloc.cle));
  for (const blocB of blocsB) if (!clesA.has(blocB.cle)) ecarts.push(`${blocB.cle} : bloc absent de la première sortie`);
  if (ecarts.length === 0 && blocsA.map((bloc) => bloc.cle).join('\n') !== blocsB.map((bloc) => bloc.cle).join('\n')) {
    ecarts.push("ordre des blocs différent");
  }
  return { statut: ecarts.length > 0 ? 'different' : 'equivalent', ecarts };
}

/** Compare deux fichiers (texte) selon leur nature : CSS par blocs, autre contenu (SCSS, TS) texte à texte. */
function comparerFichier(nom, a, b) {
  const [textA, textB] = [normaliser(a), normaliser(b)];
  if (textA === textB) return { statut: 'identique', ecarts: [] };
  if (/\.(scss|ts)$/.test(nom)) {
    const [lignesA, lignesB] = [textA.split('\n'), textB.split('\n')];
    const i = lignesA.findIndex((ligne, n) => ligne !== lignesB[n]);
    const rang = i === -1 ? lignesA.length : i;
    return { statut: 'different', ecarts: [`ligne ${rang + 1} : « ${lignesA[rang] ?? '(fin)'} » → « ${lignesB[rang] ?? '(fin)'} »`] };
  }
  return comparerCss(textA, textB);
}

/**
 * `a`, `b` : un texte CSS (par exemple la sortie concaténée de `genererThemeImporte`) ou une Map « chemin → texte ».
 * Retourne une Map « chemin → `{ statut: 'identique' | 'equivalent' | 'different', ecarts: string[] }` » ;
 * un texte est comparé sous le nom `css`. `ecarts` : `bloc : variable : valeur de a → valeur de b`.
 */
export function comparerSorties(a, b) {
  const enMap = (sortie) => (typeof sortie === 'string' ? new Map([['css', sortie]]) : sortie);
  const [fichiersA, fichiersB] = [enMap(a), enMap(b)];
  const resultat = new Map();
  for (const [nom, texte] of fichiersA) {
    resultat.set(
      nom,
      fichiersB.has(nom) ? comparerFichier(nom, texte, fichiersB.get(nom)) : { statut: 'different', ecarts: ['fichier absent de la seconde sortie'] },
    );
  }
  for (const nom of fichiersB.keys()) {
    if (!fichiersA.has(nom)) resultat.set(nom, { statut: 'different', ecarts: ['fichier absent de la première sortie'] });
  }
  return resultat;
}
