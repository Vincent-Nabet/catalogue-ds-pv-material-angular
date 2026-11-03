// Contrôle de sécurité du CSS généré pour être injecté dans la page (thèmes importés dans le navigateur).
//
// Le CSS est fabriqué à partir de valeurs fournies par l'utilisateur, que le générateur écrit sans les
// échapper : un token `red; } body { display: none` sortirait de sa déclaration. La sortie de
// `genererVariables` est parfaitement régulière (cf. `lignes()`, `bloc()` et `section()`), donc on la contrôle
// ligne à ligne et on refuse tout ce qui n'est pas exactement de la forme attendue.

const BASE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const CARACTERES_INTERDITS_VALEUR = /[;{}<>@\\\u0000-\u001f\u007f]/;
const SEQUENCES_INTERDITES_VALEUR = /\/\*|url\(|src\(|image\(|image-set\(|expression\(|@import/i;
const CONTROLE_OU_BALISE = /[<>\u0000-\u001f\u007f]/;

/** Parenthèses équilibrées et guillemets par paire : sans cela une valeur « avalerait » la suite du CSS. */
function equilibre(valeur) {
  let profondeur = 0;
  for (const c of valeur) {
    if (c === '(') profondeur++;
    else if (c === ')' && --profondeur < 0) return false;
  }
  return profondeur === 0 && (valeur.split('"').length - 1) % 2 === 0;
}

/**
 * Vérifie que `css` n'est constitué que de commentaires, de blocs `html.theme-<base>-<famille> { … }` et de
 * déclarations `--variable: valeur;` sans caractère dangereux. Lève une `Error` française à la première
 * ligne invalide (« CSS généré invalide ligne N »), sinon retourne `css`.
 */
export function validerCss(css, { base }) {
  if (!BASE.test(base)) throw new Error(`Identifiant de thème « ${base} » invalide (a-z, 0-9 et tirets).`);
  const selecteur = `html\\.theme-${base}-[a-z0-9]+(?:-[a-z0-9]+)*`;
  const ligneSelecteur = new RegExp(`^${selecteur}(?:, ${selecteur})* \\{$`);
  const ligneDeclaration = /^ {2}--[a-z0-9-]+: (.+);$/;

  const invalide = (numero, raison) => new Error(`CSS généré invalide ligne ${numero} : ${raison}.`);
  let ouvert = false;
  css.split('\n').forEach((ligne, index) => {
    const numero = index + 1;
    if (ligne === '') return;
    if (ligne.startsWith('/* ') && ligne.endsWith(' */')) {
      const texte = ligne.slice(3, -3);
      if (texte.includes('*/') || CONTROLE_OU_BALISE.test(texte)) throw invalide(numero, 'commentaire inattendu');
      return;
    }
    if (ligneSelecteur.test(ligne)) {
      if (ouvert) throw invalide(numero, 'bloc imbriqué');
      ouvert = true;
      return;
    }
    if (ligne === '}') {
      if (!ouvert) throw invalide(numero, 'accolade fermante sans bloc');
      ouvert = false;
      return;
    }
    const declaration = ligneDeclaration.exec(ligne);
    if (declaration && ouvert) {
      const valeur = declaration[1];
      if (CARACTERES_INTERDITS_VALEUR.test(valeur) || SEQUENCES_INTERDITES_VALEUR.test(valeur) || !equilibre(valeur)) {
        throw invalide(numero, `valeur refusée pour ${ligne.slice(2, ligne.indexOf(':'))}`);
      }
      return;
    }
    throw invalide(numero, 'ligne inattendue');
  });
  if (ouvert) throw new Error('CSS généré invalide : bloc non fermé.');
  return css;
}
