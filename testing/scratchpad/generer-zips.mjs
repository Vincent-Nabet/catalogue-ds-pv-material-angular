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

// Jeu « pastel » : 3 familles (standard, contraste moyen, contraste élevé), sans le monochrome, dont toutes les couleurs
// sont refaites autour d'un bleu doux. Chaque teinte de chaque palette primitive garde sa luminance WCAG (donc les
// rapports de contraste du design system) mais prend la teinte et la saturation de sa palette pastel.
const luminance = (r, g, b) => {
  const lineaire = (c) => ((c /= 255) <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lineaire(r) + 0.7152 * lineaire(g) + 0.0722 * lineaire(b);
};
const hslVersRgb = (teinte, saturation, clarte) => {
  const a = saturation * Math.min(clarte, 1 - clarte);
  const canal = (n) => {
    const k = (n + teinte / 30) % 12;
    return Math.round((clarte - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))) * 255);
  };
  return [canal(0), canal(8), canal(4)];
};
/** Même luminance que `hex`, avec la teinte et la saturation données (recherche de la clarté par dichotomie). */
function versPastel(hex, { teinte, saturation }) {
  const m = /^#([0-9A-F]{6})([0-9A-F]{2})?$/i.exec(hex);
  if (!m) throw new Error(`Couleur inattendue : ${hex}`);
  const cible = luminance(...[0, 2, 4].map((i) => parseInt(m[1].slice(i, i + 2), 16)));
  let [bas, haut] = [0, 1];
  for (let i = 0; i < 30; i++) {
    const milieu = (bas + haut) / 2;
    if (luminance(...hslVersRgb(teinte, saturation, milieu)) < cible) bas = milieu;
    else haut = milieu;
  }
  const rgb = hslVersRgb(teinte, saturation, (bas + haut) / 2);
  return `#${rgb.map((c) => c.toString(16).padStart(2, '0')).join('').toUpperCase()}${m[2] ?? ''}`;
}
/** Palette primitive → teinte (degrés) et saturation du pastel. */
const PASTEL = {
  Olive: { teinte: 216, saturation: 0.6 }, // primaire : bleu ciel
  Sage: { teinte: 232, saturation: 0.45 }, // secondaire : bleu pervenche
  Mint: { teinte: 172, saturation: 0.45 }, // tertiaire : menthe bleutée
  Neutral: { teinte: 215, saturation: 0.08 }, // gris bleuté
  'Neutral Variant': { teinte: 215, saturation: 0.16 },
  Red: { teinte: 352, saturation: 0.7 }, // erreur : corail rosé
  Green: { teinte: 145, saturation: 0.45 }, // succès
  Blue: { teinte: 204, saturation: 0.6 }, // info
  Amber: { teinte: 40, saturation: 0.75 }, // alerte
};
const primitivesPastel = JSON.parse(base['primitives.tokens.json']);
for (const [palette, teintes] of Object.entries(primitivesPastel.Colors)) {
  if (!PASTEL[palette]) throw new Error(`Palette sans réglage pastel : ${palette}`);
  for (const jeton of Object.values(teintes)) jeton.$value = versPastel(jeton.$value, PASTEL[palette]);
}
ecrire(
  'pastel.zip',
  zip({
    ...Object.fromEntries(Object.entries(base).filter(([chemin]) => !chemin.includes('monochrome'))),
    'primitives.tokens.json': JSON.stringify(primitivesPastel),
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
