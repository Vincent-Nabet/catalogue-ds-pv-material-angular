// Lecture des tokens DTCG depuis un dossier ou un fichier .zip de même arborescence :
//   primitives.tokens.json
//   semantics/<mode>.tokens.json   (un fichier par mode)
// Pour un zip, l'arborescence peut se trouver à la racine ou dans un unique sous-dossier.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { basename, join } from 'node:path';
import { unzipSync } from 'fflate';

const FICHIER_PRIMITIVES = 'primitives.tokens.json';
const SUFFIXE_SEMANTIQUE = '.tokens.json';

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
  let contenu;
  try {
    contenu = unzipSync(new Uint8Array(readFileSync(fichierZip)), { filter: (f) => f.name.endsWith('.json') });
  } catch (erreur) {
    throw new Error(`Archive illisible : « ${fichierZip} » (${erreur.message}).`);
  }
  const fichiers = new Map();
  for (const [nom, octets] of Object.entries(contenu)) {
    const chemin = nom.replaceAll('\\', '/');
    if (chemin.startsWith('__MACOSX/') || basename(chemin).startsWith('._')) continue;
    fichiers.set(chemin, () => new TextDecoder().decode(octets));
  }
  return fichiers;
}

function assembler(fichiers, source) {
  const chemins = [...fichiers.keys()];
  const primitives = chemins.filter((c) => c === FICHIER_PRIMITIVES || c.endsWith(`/${FICHIER_PRIMITIVES}`));
  if (primitives.length === 0) {
    throw new Error(`« ${FICHIER_PRIMITIVES} » introuvable dans « ${source} ».`);
  }
  if (primitives.length > 1) {
    throw new Error(`« ${FICHIER_PRIMITIVES} » présent ${primitives.length} fois dans « ${source} » : ${primitives.join(', ')}.`);
  }
  const racine = primitives[0].slice(0, primitives[0].length - FICHIER_PRIMITIVES.length);
  if (racine.split('/').filter(Boolean).length > 1) {
    throw new Error(`Arborescence trop profonde dans « ${source} » : « ${primitives[0]} » (au plus un sous-dossier racine).`);
  }

  const semantiques = {};
  for (const chemin of chemins.filter((c) => c.startsWith(`${racine}semantics/`))) {
    const nom = chemin.slice(`${racine}semantics/`.length);
    if (nom.includes('/') || !nom.endsWith(SUFFIXE_SEMANTIQUE)) continue;
    semantiques[nom.slice(0, -SUFFIXE_SEMANTIQUE.length)] = lireJson(fichiers.get(chemin)(), chemin);
  }
  if (Object.keys(semantiques).length === 0) {
    throw new Error(`Aucun fichier « semantics/*${SUFFIXE_SEMANTIQUE} » dans « ${source} ».`);
  }
  return { primitives: lireJson(fichiers.get(primitives[0])(), primitives[0]), semantiques, origine: source };
}

function lireJson(texte, chemin) {
  try {
    return JSON.parse(texte.replace(/^﻿/, ''));
  } catch (erreur) {
    throw new Error(`JSON invalide dans « ${chemin} » : ${erreur.message}`);
  }
}
