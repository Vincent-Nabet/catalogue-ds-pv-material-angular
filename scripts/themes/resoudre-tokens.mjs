// Aplatit un arbre DTCG en « chemin → token » et résout les alias `{Chemin.Du.Token}`.
// Les alias sont résolus récursivement (sémantique → sémantique → primitive) ; un alias absent
// ou un cycle est une erreur.

const ALIAS = /^\{([^{}]+)\}$/;

/** `{ Colors: { Primary: { $type, $value } } }` → Map « Colors.Primary » → `{ type, brut }`. */
export function aplatir(arbre, origine = 'tokens') {
  const tokens = new Map();
  const parcourir = (noeud, chemin) => {
    for (const [cle, valeur] of Object.entries(noeud)) {
      if (cle.startsWith('$')) continue;
      if (cle.includes('.')) {
        throw new Error(`Clé « ${cle} » invalide dans ${origine} : le point est réservé au séparateur de chemin.`);
      }
      const suite = chemin ? `${chemin}.${cle}` : cle;
      if (valeur === null || typeof valeur !== 'object') {
        throw new Error(`Valeur inattendue pour « ${suite} » dans ${origine}.`);
      }
      if ('$value' in valeur) {
        tokens.set(suite, { type: valeur.$type, brut: valeur.$value });
      } else {
        parcourir(valeur, suite);
      }
    }
  };
  parcourir(arbre, '');
  return tokens;
}

/**
 * Résout les alias de `cibles` (Map aplatie) en cherchant dans `cibles` puis dans `references`.
 * Retourne Map chemin → `{ type, brut, valeur }`.
 */
export function resoudre(cibles, references = new Map()) {
  const trouver = (chemin) => cibles.get(chemin) ?? references.get(chemin);
  const memo = new Map();

  const valeurDe = (chemin, pile) => {
    if (memo.has(chemin)) return memo.get(chemin);
    if (pile.includes(chemin)) {
      throw new Error(`Cycle d'alias : ${[...pile, chemin].join(' → ')}.`);
    }
    const token = trouver(chemin);
    if (!token) {
      throw new Error(`Alias vers un token absent : « ${chemin} » (référencé par ${pile.at(-1) ?? 'racine'}).`);
    }
    const alias = typeof token.brut === 'string' ? ALIAS.exec(token.brut) : null;
    const valeur = alias ? valeurDe(alias[1], [...pile, chemin]) : token.brut;
    memo.set(chemin, valeur);
    return valeur;
  };

  const resolus = new Map();
  for (const [chemin, token] of cibles) {
    resolus.set(chemin, { ...token, valeur: valeurDe(chemin, []) });
  }
  return resolus;
}

/**
 * Résout les primitives puis les sémantiques d'un mode.
 * Retourne `{ primitives, semantiques }` (Map chemin → `{ type, brut, valeur }`).
 */
export function resoudreMode(primitivesJson, semantiqueJson, nomMode = 'mode') {
  const primitives = aplatir(primitivesJson, 'primitives.tokens.json');
  const semantiques = aplatir(semantiqueJson, `semantics/${nomMode}.tokens.json`);
  for (const chemin of semantiques.keys()) {
    if (primitives.has(chemin)) {
      throw new Error(`Token « ${chemin} » défini à la fois dans les primitives et dans « ${nomMode} ».`);
    }
  }
  return {
    primitives: resoudre(primitives),
    semantiques: resoudre(semantiques, primitives),
  };
}
