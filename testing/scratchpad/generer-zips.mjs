// Régénère les zips d'essai de l'import de thèmes (page /themes-importes) dans ./zips/, depuis `tokens/`
// (lu en lecture seule). Usage : node testing/scratchpad/generer-zips.mjs
// Aucun zip n'est versionné (dossier `zips/` ignoré par git) : ils sont déterministes et régénérables, et les zips
// natifs (≈ 1,8 Mo pour les sémantiques) comme `gros-zip.zip` (6 Mo) dépassent de toute façon les 200 Ko.
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { strToU8, zipSync } from 'fflate';
import { versNatif } from '../../scripts/themes/fixtures-natif.mjs';

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
/** Jeux pastel : palette primitive → teinte (degrés) et saturation. */
const PASTELS = {
  'pastel-bleu.zip': {
    Olive: { teinte: 216, saturation: 0.6 }, // primaire : bleu ciel
    Sage: { teinte: 232, saturation: 0.45 }, // secondaire : bleu pervenche
    Mint: { teinte: 172, saturation: 0.45 }, // tertiaire : menthe bleutée
    Neutral: { teinte: 215, saturation: 0.08 }, // gris bleuté
    'Neutral Variant': { teinte: 215, saturation: 0.16 },
    Red: { teinte: 352, saturation: 0.7 }, // erreur : corail rosé
    Green: { teinte: 145, saturation: 0.45 }, // succès
    Blue: { teinte: 204, saturation: 0.6 }, // info
    Amber: { teinte: 40, saturation: 0.75 }, // alerte
  },
  'pastel-rose.zip': {
    Olive: { teinte: 338, saturation: 0.65 }, // primaire : rose bonbon
    Sage: { teinte: 318, saturation: 0.4 }, // secondaire : orchidée
    Mint: { teinte: 18, saturation: 0.6 }, // tertiaire : pêche
    Neutral: { teinte: 340, saturation: 0.08 }, // gris rosé
    'Neutral Variant': { teinte: 340, saturation: 0.16 },
    Red: { teinte: 6, saturation: 0.8 }, // erreur : corail, distinct du rose primaire
    Green: { teinte: 150, saturation: 0.4 }, // succès
    Blue: { teinte: 200, saturation: 0.55 }, // info
    Amber: { teinte: 42, saturation: 0.75 }, // alerte
  },
};
for (const [fichier, reglages] of Object.entries(PASTELS)) {
  const primitivesPastel = JSON.parse(base['primitives.tokens.json']);
  for (const [palette, teintes] of Object.entries(primitivesPastel.Colors)) {
    if (!reglages[palette]) throw new Error(`Palette sans réglage pastel : ${palette}`);
    for (const jeton of Object.values(teintes)) jeton.$value = versPastel(jeton.$value, reglages[palette]);
  }
  ecrire(
    fichier,
    zip({
      ...Object.fromEntries(Object.entries(base).filter(([chemin]) => !chemin.includes('monochrome'))),
      'primitives.tokens.json': JSON.stringify(primitivesPastel),
    }),
  );
}

// --- Export natif de Figma (Primitives.zip + Semantics.zip), reconstitué depuis `tokens/` par l'inverse de l'adaptateur
// (`versNatif`). À envoyer à la page ensemble : voir le README pour les paires.
const natif = versNatif({
  primitives: JSON.parse(base['primitives.tokens.json']),
  semantiques: Object.fromEntries(
    Object.entries(base)
      .filter(([chemin]) => chemin.startsWith('semantics/'))
      .map(([chemin, texte]) => [chemin.slice('semantics/'.length, -'.tokens.json'.length), JSON.parse(texte)]),
  ),
});
const fichiersNatifs = (primitives = natif.primitives, semantiques = natif.semantiques) => ({
  primitives: { 'Baseline.tokens.json': JSON.stringify(primitives, null, 2) },
  semantiques: Object.fromEntries(Object.entries(semantiques).map(([nom, json]) => [`${nom}.tokens.json`, JSON.stringify(json, null, 2)])),
});
/** Écrit `<nom>-primitives.zip` et `<nom>-semantiques.zip` (et, pour la référence, `natif-combine.zip`). */
const ecrireNatif = (nom, { primitives, semantiques }) => {
  ecrire(`${nom}-primitives.zip`, zip(primitives));
  ecrire(`${nom}-semantiques.zip`, zip(semantiques));
};
const copie = (objet) => structuredClone(objet);

ecrireNatif('natif', fichiersNatifs());
ecrire('natif-combine.zip', zip({ ...fichiersNatifs().primitives, ...fichiersNatifs().semantiques }));

// Variantes (la moitié modifiée est suffixée ; l'autre moitié est celle de `natif-*.zip`).
{
  const { 'Dark.tokens.json': _sombre, ...sansSombre } = fichiersNatifs().semantiques;
  ecrire('natif-sans-mode-sombre-semantiques.zip', zip(sansSombre));

  const groupe = copie(natif.semantiques);
  for (const json of Object.values(groupe)) json.Colors.Schemes.Brand = { Accent: copie(json.Colors.Schemes.Standard.Primary) };
  ecrire('natif-groupe-inconnu-semantiques.zip', zip(fichiersNatifs(natif.primitives, groupe).semantiques));

  const graisse = copie(natif.primitives);
  graisse['Font theme'].Static.Weight.Bold.$value = 'Gras';
  ecrire('natif-graisse-inconnue-primitives.zip', zip(fichiersNatifs(graisse).primitives));

  const p3 = copie(natif.semantiques);
  p3.Light.Colors.Schemes.Standard.Primary.$value.colorSpace = 'display-p3';
  ecrire('natif-display-p3-semantiques.zip', zip(fichiersNatifs(natif.primitives, p3).semantiques));

  const hex = copie(natif.semantiques);
  hex.Light.Colors.Schemes.Standard.Primary.$value.hex = '#00FF00';
  ecrire('natif-hex-incoherent-semantiques.zip', zip(fichiersNatifs(natif.primitives, hex).semantiques));

  const autreExport = copie(natif.primitives);
  autreExport.Colors.Olive['Shade-012'].$value = { colorSpace: 'srgb', components: [0, 0, 0], alpha: 1, hex: '#000000' };
  ecrire('natif-autre-export-primitives.zip', zip(fichiersNatifs(autreExport).primitives));

  const { 'Baseline.tokens.json': baseline } = fichiersNatifs().primitives;
  ecrire('natif-primitives-dupliquees-primitives.zip', zip({ 'Baseline.tokens.json': baseline, 'Baseline (1).tokens.json': baseline }));

  ecrire('natif-mode-duplique-semantiques.zip', zip({ ...fichiersNatifs().semantiques, 'light.tokens.json': fichiersNatifs().semantiques['Light.tokens.json'] }));
}

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
