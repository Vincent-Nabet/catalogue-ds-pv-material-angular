// Lecture des tokens DTCG depuis des fichiers déjà en mémoire (zip ou liste de fichiers) : sans `node:fs`,
// donc utilisable dans le navigateur comme dans Node (cf. `lire-source.mjs` et `navigateur.mjs`).
import { unzipSync } from 'fflate';
import { assemblerFigma, detecterFormat } from './format-figma.mjs';

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

/** Mémorise le texte d'un lecteur : la détection du format et l'assemblage lisent chacun les mêmes fichiers. */
const memoriser = (lecteur) => {
  let texte;
  return () => (texte ??= lecteur());
};

const ignore = (chemin) => chemin.startsWith('__MACOSX/') || nomDe(chemin).startsWith('._');
const nomDeSource = (source) => nomDe(source.replaceAll('\\', '/'));
const nommer = (noms) => noms.map((nom) => `« ${nom} »`).join(', ');

const aStructureAncienne = (fichiers) =>
  [...fichiers.keys()].some(
    (c) => c === FICHIER_PRIMITIVES || c.endsWith(`/${FICHIER_PRIMITIVES}`) || c.startsWith('semantics/') || c.includes('/semantics/'),
  );

/**
 * Chemins que l'ancien chemin (`assembler`) lirait, ou `null` sans `primitives.tokens.json` unique (aucune structure de
 * l'ancien format à protéger). Pour une source seule, la détection du format s'y limite : un autre `.json` (parasite,
 * y compris au format natif) reste ignoré, comme avant l'ajout du format natif.
 */
function lusParAncien(fichiers) {
  const chemins = [...fichiers.keys()];
  const primitives = chemins.filter((c) => c === FICHIER_PRIMITIVES || c.endsWith(`/${FICHIER_PRIMITIVES}`));
  if (primitives.length !== 1) return null;
  const dossier = `${primitives[0].slice(0, -FICHIER_PRIMITIVES.length)}semantics/`;
  const semantiques = chemins.filter((c) => c.startsWith(dossier) && c.endsWith(SUFFIXE_SEMANTIQUE) && !c.slice(dossier.length).includes('/'));
  return new Set([primitives[0], ...semantiques]);
}

/**
 * Point d'entrée commun : assemble une ou plusieurs sources (`listes` : Map chemin → lecteur de texte, une par source ;
 * `noms` : leurs noms, pour les messages) quel que soit le format, reconnu d'après le CONTENU des fichiers JSON :
 *   - ancien format (`primitives.tokens.json` + `semantics/*.tokens.json`, couleurs en `#hex`) : une seule source, déléguée
 *     telle quelle à `assembler` (mêmes résultat et messages qu'avant) ;
 *   - export natif de Figma (un fichier par mode, couleurs en objets) : une ou plusieurs sources dont l'ensemble contient
 *     un fichier de primitives et au moins un mode sémantique (cf. `format-figma.mjs`) ; résultat `{ …, format: 'natif', avertissements }`.
 * Un JSON illisible ne fait pas échouer la détection (il est neutre) : seul le chemin choisi signale son erreur.
 */
export function assemblerSources(listes, noms) {
  const total = listes.reduce((n, liste) => n + liste.size, 0);
  if (listes.length > 1 && total > NOMBRE_MAX_JSON) {
    throw new Error(`Trop de fichiers JSON dans ${nommer(noms)} : ${NOMBRE_MAX_JSON} au plus au total (${total}).`);
  }
  const sources = listes.map((liste) => new Map([...liste].map(([chemin, lecteur]) => [chemin, memoriser(lecteur)])));

  const formats = [];
  const lus = sources.length === 1 ? lusParAncien(sources[0]) : null;
  for (const fichiers of sources) {
    for (const [chemin, lecteur] of fichiers) {
      if (ignore(chemin) || (lus && !lus.has(chemin))) continue;
      let format = null;
      try {
        format = detecterFormat(JSON.parse(lecteur().replace(/^﻿/, '')));
      } catch {
        // JSON illisible : fichier neutre pour la détection.
      }
      formats.push({ chemin, format });
    }
  }
  const natif = formats.find((f) => f.format === 'natif');
  const ancien = formats.find((f) => f.format === 'ancien');
  if (natif && ancien) {
    throw new Error(
      `Formats mélangés : « ${natif.chemin} » est au format natif de Figma, « ${ancien.chemin} » à l'ancien format. Fournissez l'un ou l'autre.`,
    );
  }

  if (natif) {
    const entrees = [];
    const ignores = [];
    for (const [i, fichiers] of sources.entries()) {
      for (const [chemin, lecteur] of fichiers) {
        if (ignore(chemin)) continue;
        if (chemin.endsWith(SUFFIXE_SEMANTIQUE)) entrees.push({ chemin, json: lireJson(lecteur(), chemin) });
        else ignores.push(`Fichier JSON ignoré (hors « *${SUFFIXE_SEMANTIQUE} ») : ${chemin} (dans « ${noms[i]} »)`);
      }
    }
    const resultat = assemblerFigma(entrees, noms.map(nomDeSource).join(' + '));
    resultat.avertissements.unshift(...ignores);
    return resultat;
  }

  // Une seule source sans signal natif : ancien chemin, avec ses résultat et messages d'origine (même sans primitives.tokens.json).
  if (listes.length <= 1) return assembler(sources[0] ?? new Map(), noms[0]);
  if (ancien || sources.some(aStructureAncienne)) {
    throw new Error(`Une seule source est acceptée pour l'ancien format de tokens (reçu : ${nommer(noms)}).`);
  }
  throw new Error(
    `Format de tokens non reconnu dans ${nommer(noms)} : ni l'ancien format (primitives.tokens.json + semantics/*.tokens.json, couleurs en texte #RRGGBB) ` +
      `ni l'export natif de Figma (un fichier par mode, couleurs en objet { colorSpace, components, hex }). Voir docs/generation-themes.md, « Exporter depuis Figma ».`,
  );
}
