// Lecture des tokens DTCG depuis un dossier ou un fichier .zip de même arborescence :
//   primitives.tokens.json
//   semantics/<mode>.tokens.json   (un fichier par mode)
// Pour un zip, l'arborescence peut se trouver à la racine ou dans un unique sous-dossier.
// La partie sans `node:fs` (zip en mémoire, assemblage) est dans `lire-source-memoire.mjs`, partagée avec le navigateur.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { assembler, lireZipOctets } from './lire-source-memoire.mjs';

/**
 * Lit la source et retourne `{ primitives, semantiques, origine }` :
 * `semantiques` associe le nom du mode (nom du fichier sans `.tokens.json`) à son JSON.
 */
export function lireSource(source) {
  let statut;
  try {
    statut = statSync(source);
  } catch {
    throw new Error(`Source introuvable : « ${source} ».`);
  }
  const fichiers = statut.isDirectory() ? lireDossier(source) : lireZip(source);
  return assembler(fichiers, source);
}

/** Dossier → Map « chemin relatif (séparateur /) » → texte. */
function lireDossier(dossier) {
  const fichiers = new Map();
  const parcourir = (courant, prefixe) => {
    for (const entree of readdirSync(courant, { withFileTypes: true })) {
      if (entree.isDirectory()) {
        parcourir(join(courant, entree.name), `${prefixe}${entree.name}/`);
      } else if (entree.name.endsWith('.json')) {
        fichiers.set(`${prefixe}${entree.name}`, () => readFileSync(join(courant, entree.name), 'utf8'));
      }
    }
  };
  parcourir(dossier, '');
  return fichiers;
}

/** Zip → même forme que `lireDossier` ; extraction en mémoire uniquement. */
function lireZip(fichierZip) {
  return lireZipOctets(new Uint8Array(readFileSync(fichierZip)), fichierZip);
}
