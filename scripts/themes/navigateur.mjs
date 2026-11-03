// Point d'entrée pur (sans Node) de la génération d'un thème depuis un zip de tokens, pour le navigateur :
// zip en mémoire → variables CSS (mêmes modules que `npm run themes`) → contrôles → CSS prêt à injecter.
// Importé par la page « Thèmes importés » du catalogue, par `import()` dynamique.
import { variablesCustomAttendues, variablesRequises } from './correspondance.mjs';
import { genererVariables } from './ecrire-variables.mjs';
import { assembler, lireZipOctets } from './lire-source-memoire.mjs';
import { validerCss } from './valider-css.mjs';

/** Préfixe des variables : fixe (les pages Fondations et le pont Material lisent `--app-*` et `--md-sys-*`). */
const NOM = 'app';
const BASE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const HEX = /^#[0-9a-f]{3,8}$/;
const EXEMPLES_MAX = 10;

/** Une ligne par élément (au plus `EXEMPLES_MAX`), puis « … et N autres » ; `ligne` met en forme un élément. */
function lister(elements, ligne) {
  const lignes = elements.slice(0, EXEMPLES_MAX).map(ligne);
  if (elements.length > EXEMPLES_MAX) lignes.push(`… et ${elements.length - EXEMPLES_MAX} autre(s).`);
  return lignes;
}

/**
 * `octets` : contenu du zip ; `base` : identifiant du thème (`imp-k3f9a2`), qui entre dans les sélecteurs ;
 * `nomSource` : nom du zip, pour les messages. Retourne `{ css, familles, rapport }` (cf. `navigateur.d.mts`)
 * ou lève une `Error` dont le message français est prêt à afficher.
 */
export function genererThemeImporte(octets, { base, nomSource }) {
  if (!BASE.test(base)) throw new Error(`Identifiant de thème « ${base} » invalide (a-z, 0-9 et tirets).`);
  try {
    const source = assembler(lireZipOctets(octets, nomSource), nomSource);
    const { fichiers, variables, rapport } = genererVariables(source, { nom: NOM, portee: { base } });

    const absentes = variablesRequises().filter((v) => !variables.has(v.variable));
    if (absentes.length > 0) {
      throw new Error(
        `Variables indispensables absentes du thème (${absentes.length}) :\n${lister(absentes, (v) => `${v.variable} absent : token ${v.token}`).join('\n')}`,
      );
    }

    const css = [...fichiers].filter(([chemin]) => chemin !== 'index.css').map(([, corps]) => corps).join('\n');
    validerCss(css, { base });

    const customAbsentes = variablesCustomAttendues(NOM).filter((v) => !variables.has(v.variable));
    const avertissements = [
      ...lister(rapport.inconnus, (chemin) => `Token non reconnu, non écrit : ${chemin}`),
      ...rapport.modesIgnores.map((mode) => `Mode non utilisé (ni clair ni sombre reconnu dans son nom) : ${mode}`),
      ...lister(
        customAbsentes,
        (v) => `Variable du design system absente : ${v.variable} (token ${v.token}) ; la valeur du thème intégré s'applique`,
      ),
    ];

    const police = /^ {2}--md-ref-typeface-plain: (.+);$/m.exec(fichiers.get('md3/ref.css'))?.[1] ?? '';
    return {
      css,
      familles: rapport.familles.map((f) => ({
        id: f.id,
        libelle: f.libelle,
        apercu: HEX.test(f.apercu) ? f.apercu : '#808080',
        defaut: f.defaut,
        progression: f.progression,
      })),
      rapport: {
        modes: Object.keys(source.semantiques).length,
        md3: rapport.md3,
        custom: rapport.custom,
        inconnus: rapport.inconnus,
        ignores: rapport.ignores.length,
        modesIgnores: rapport.modesIgnores,
        police,
        avertissements,
      },
    };
  } catch (erreur) {
    // Les erreurs du générateur sont des `Error` françaises ; toute autre (TypeError sur un token mal formé…) est reformulée.
    if (erreur?.constructor === Error) throw erreur;
    throw new Error(`Fichiers de tokens inexploitables (${erreur?.message ?? erreur}).`);
  }
}
