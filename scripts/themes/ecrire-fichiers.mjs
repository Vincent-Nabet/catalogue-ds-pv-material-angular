// Écriture déterministe des fichiers générés : en-tête commun, aucune réécriture si le contenu
// est identique (la date de l'en-tête ne change donc que lorsque le contenu change), et
// suppression limitée aux fichiers que le script a lui-même produits.
import { existsSync, mkdirSync, readdirSync, readFileSync, rmdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { basename, dirname, join } from 'node:path';

const MARQUEUR = 'Fichier généré par `npm run themes` — ne pas modifier.';
const ENTETE = /^\/\* Fichier généré par `npm run themes`[^]*?\*\/\n\n/;

export const entete = (origine, date) => `/* ${MARQUEUR}\n * Source : ${basename(origine)} — ${date} */\n\n`;

const corpsDe = (texte) => texte.replace(ENTETE, '');
const estGenere = (texte) => texte.startsWith(`/* ${MARQUEUR}`);

function listerFichiers(dossier, prefixe = '') {
  return readdirSync(dossier, { withFileTypes: true }).flatMap((entree) =>
    entree.isDirectory()
      ? listerFichiers(join(dossier, entree.name), `${prefixe}${entree.name}/`)
      : [`${prefixe}${entree.name}`],
  );
}

/**
 * Écrit `fichiers` (Map chemin relatif → corps sans en-tête) dans `sortie`.
 * Retourne `{ ecrits, inchanges, supprimes, etrangers }` (listes de chemins relatifs).
 * Refuse un dossier non vide qui ne contient aucun fichier généré.
 */
export function ecrireFichiers(sortie, fichiers, origine, date = new Date().toISOString().slice(0, 10)) {
  const existants = existsSync(sortie) && statSync(sortie).isDirectory() ? listerFichiers(sortie) : [];
  const generes = existants.filter((chemin) => estGenere(readFileSync(join(sortie, chemin), 'utf8')));
  if (existants.length > 0 && generes.length === 0) {
    throw new Error(
      `Le dossier « ${sortie} » n'est pas vide et ne contient aucun fichier généré : choisir un dossier dédié (--sortie).`,
    );
  }

  const resultat = { ecrits: [], inchanges: [], supprimes: [], etrangers: existants.filter((c) => !generes.includes(c)) };

  for (const [chemin, corps] of fichiers) {
    const cible = join(sortie, chemin);
    if (existants.includes(chemin) && corpsDe(readFileSync(cible, 'utf8')) === corps) {
      resultat.inchanges.push(chemin);
      continue;
    }
    mkdirSync(dirname(cible), { recursive: true });
    writeFileSync(cible, entete(origine, date) + corps);
    resultat.ecrits.push(chemin);
  }

  for (const chemin of generes.filter((c) => !fichiers.has(c))) {
    rmSync(join(sortie, chemin));
    resultat.supprimes.push(chemin);
    // Retire les sous-dossiers devenus vides.
    for (let dossier = dirname(join(sortie, chemin)); dossier !== sortie && readdirSync(dossier).length === 0; dossier = dirname(dossier)) {
      rmdirSync(dossier);
    }
  }
  return resultat;
}
