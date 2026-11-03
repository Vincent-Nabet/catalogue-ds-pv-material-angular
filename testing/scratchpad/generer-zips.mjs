// Régénère les zips d'essai de l'import de thèmes (page /themes-importes) dans ./zips/, depuis `tokens/`
// (lu en lecture seule). Usage : node testing/scratchpad/generer-zips.mjs
// Les fichiers générés sont versionnés, sauf `gros-zip.zip` (6 Mo, régénérable, ignoré par git).
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { strToU8, zipSync } from 'fflate';

const racine = fileURLToPath(new URL('../../', import.meta.url));
const sortie = fileURLToPath(new URL('./zips/', import.meta.url));
mkdirSync(sortie, { recursive: true });

const base = { 'primitives.tokens.json': readFileSync(`${racine}tokens/primitives.tokens.json`, 'utf8') };
for (const nom of readdirSync(`${racine}tokens/semantics`)) {
  base[`semantics/${nom}`] = readFileSync(`${racine}tokens/semantics/${nom}`, 'utf8');
}

// Date fixe : deux générations donnent les mêmes octets.
const zip = (fichiers) =>
  zipSync(Object.fromEntries(Object.entries(fichiers).map(([chemin, texte]) => [chemin, strToU8(texte)])), {
    mtime: new Date('2026-01-01T00:00:00Z'),
  });
const ecrire = (nom, octets) => writeFileSync(`${sortie}${nom}`, octets);

/** Copie de `base` dont chaque fichier sémantique passe par `modifier(json, chemin)`. */
const modifier = (modifier) =>
  Object.fromEntries(
    Object.entries(base).map(([chemin, texte]) => {
      if (!chemin.startsWith('semantics/')) return [chemin, texte];
      const json = JSON.parse(texte);
      modifier(json, chemin);
      return [chemin, JSON.stringify(json)];
    }),
  );
const clair = (chemin) => chemin.endsWith('semantics/light.tokens.json');

// --- Acceptés
ecrire('tokens-test.zip', zip(base));
ecrire('tokens-primary.zip', zip(modifier((json, chemin) => clair(chemin) && (json.Colors.Schemes.Primary.$value = '#E8F5A0'))));
ecrire(
  'une-famille.zip',
  zip({
    'primitives.tokens.json': base['primitives.tokens.json'],
    'semantics/light.tokens.json': base['semantics/light.tokens.json'],
    'semantics/dark.tokens.json': base['semantics/dark.tokens.json'],
  }),
);

// --- Refusés
const { 'primitives.tokens.json': _, ...sansPrimitives } = base;
ecrire('sans-primitives.zip', zip(sansPrimitives));
const { 'semantics/dark-medium-contrast.tokens.json': __, ...incomplete } = base;
ecrire('famille-incomplete.zip', zip(incomplete));
ecrire('cycle.zip', zip(modifier((json, chemin) => clair(chemin) && (json.Colors.Schemes.Primary.$value = '{Colors.Schemes.Primary}'))));
ecrire('json-invalide.zip', zip({ ...base, 'semantics/dark.tokens.json': '{ pas du json' }));
ecrire('injection.zip', zip(modifier((json, chemin) => clair(chemin) && (json.Colors.Schemes.Primary.$value = 'red; } body { display: none'))));
ecrire('json-decompresse-gros.zip', zip({ ...base, 'semantics/enorme.tokens.json': `{"a":"${'x'.repeat(5 * 1024 * 1024 + 100)}"}` }));
ecrire('pas-un-zip.zip', strToU8("ceci n'est pas une archive"));
writeFileSync(`${sortie}notes.txt`, 'texte simple\n');
// Plus de 5 Mo : refusé avant analyse (octets pseudo-aléatoires ; ignoré par git)
ecrire('gros-zip.zip', Uint8Array.from({ length: 6 * 1024 * 1024 }, (_octet, i) => (i * 2654435761) >>> 24));

console.log(`Zips d'essai écrits dans ${sortie}`);
