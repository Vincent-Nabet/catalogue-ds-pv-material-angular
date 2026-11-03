// Lecture des tokens DTCG depuis des fichiers déjà en mémoire (zip ou liste de fichiers) : sans `node:fs`,
// donc utilisable dans le navigateur comme dans Node (cf. `lire-source.mjs` et `navigateur.mjs`).
import { unzipSync } from 'fflate';

export const FICHIER_PRIMITIVES = 'primitives.tokens.json';
export const SUFFIXE_SEMANTIQUE = '.tokens.json';
/** Garde-fous contre une archive démesurée : taille décompressée d'un fichier JSON et nombre de fichiers JSON. */
export const TAILLE_MAX_JSON = 5 * 1024 * 1024;
export const NOMBRE_MAX_JSON = 40;

/**
 * Zip → Map « chemin relatif (séparateur /) » → fonction qui lit le texte du fichier.
 * Seuls les `.json` sont extraits (en mémoire) ; `__MACOSX/` et les `._*` sont ignorés.
 * `origine` nomme l'archive dans les messages d'erreur.
 */
export function lireZipOctets(octets, origine) {
  let limite = null;
  let compte = 0;
  const filtre = (fichier) => {
    const chemin = fichier.name.replaceAll('\\', '/');
    if (!chemin.endsWith('.json') || chemin.startsWith('__MACOSX/') || nomDe(chemin).startsWith('._')) return false;
    if (limite) return false;
    if (++compte > NOMBRE_MAX_JSON) {
      limite = `Trop de fichiers JSON dans « ${origine} » : ${NOMBRE_MAX_JSON} au plus.`;
    } else if (fichier.originalSize > TAILLE_MAX_JSON) {
      limite = `« ${chemin} » dépasse ${TAILLE_MAX_JSON / 1024 / 1024} Mo une fois décompressé (limite par fichier JSON).`;
    }
    return !limite;
  };

  let contenu;
  try {
    contenu = unzipSync(octets, { filter: filtre });
  } catch (erreur) {
    throw new Error(`Archive illisible : « ${origine} » (${erreur.message}).`);
  }
  if (limite) throw new Error(limite);

  const fichiers = new Map();
  for (const [nom, contenuFichier] of Object.entries(contenu)) {
    fichiers.set(nom.replaceAll('\\', '/'), () => new TextDecoder().decode(contenuFichier));
  }
  return fichiers;
}

const nomDe = (chemin) => chemin.slice(chemin.lastIndexOf('/') + 1);

/**
 * Assemble les fichiers (Map chemin → lecteur de texte) en `{ primitives, semantiques, origine }` :
 * `semantiques` associe le nom du mode (nom du fichier sans `.tokens.json`) à son JSON.
 */
export function assembler(fichiers, source) {
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
  let json;
  try {
    json = JSON.parse(texte.replace(/^﻿/, ''));
  } catch (erreur) {
    throw new Error(`JSON invalide dans « ${chemin} » : ${erreur.message}`);
  }
  if (json === null || typeof json !== 'object' || Array.isArray(json)) {
    throw new Error(`« ${chemin} » doit contenir un objet JSON de tokens.`);
  }
  return json;
}
