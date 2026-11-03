// Fixtures des tests : zips construits en mémoire depuis `tokens/` (lecture seule, rien n'est écrit sur le disque).
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { strToU8, zipSync } from 'fflate';

const TOKENS = fileURLToPath(new URL('../../tokens', import.meta.url));

/** Fichiers de `tokens/` : `{ 'primitives.tokens.json': texte, 'semantics/<mode>.tokens.json': texte }`. */
export function fichiersTokens() {
  const fichiers = { 'primitives.tokens.json': readFileSync(`${TOKENS}/primitives.tokens.json`, 'utf8') };
  for (const nom of readdirSync(`${TOKENS}/semantics`)) {
    fichiers[`semantics/${nom}`] = readFileSync(`${TOKENS}/semantics/${nom}`, 'utf8');
  }
  return fichiers;
}

/** Zip (octets) des fichiers donnés (chemin → texte), éventuellement sous un préfixe de dossier. */
export function zipDe(fichiers, prefixe = '') {
  return zipSync(Object.fromEntries(Object.entries(fichiers).map(([chemin, texte]) => [`${prefixe}${chemin}`, strToU8(texte)])));
}

/** Copie de `fichiers` dont les fichiers sémantiques passent par `transformer(json, nomFichier)`. */
export function modifierSemantiques(fichiers, transformer) {
  return Object.fromEntries(
    Object.entries(fichiers).map(([chemin, texte]) => {
      if (!chemin.startsWith('semantics/')) return [chemin, texte];
      const json = JSON.parse(texte);
      return [chemin, JSON.stringify(transformer(json, chemin) ?? json)];
    }),
  );
}

/** Une seule famille : `light` et `dark` (+ primitives). */
export function fichiersUneFamille() {
  const { 'primitives.tokens.json': primitives, 'semantics/light.tokens.json': clair, 'semantics/dark.tokens.json': sombre } =
    fichiersTokens();
  return { 'primitives.tokens.json': primitives, 'semantics/light.tokens.json': clair, 'semantics/dark.tokens.json': sombre };
}
