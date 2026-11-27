import assert from 'node:assert/strict';
import { test } from 'node:test';
import { strToU8 } from 'fflate';
import { genererThemeImporte } from './navigateur.mjs';
import { fichiersTokens, fichiersUneFamille, modifierSemantiques, zipDe } from './fixtures-tokens.mjs';

const BASE = 'imp-k3f9a2';
const generer = (fichiers, prefixe) => genererThemeImporte(zipDe(fichiers, prefixe), { base: BASE, nomSource: 'essai.zip' });

test('tokens/ : 4 familles, aucun avertissement, CSS sans :root', () => {
  const { css, familles, rapport } = generer(fichiersTokens());
  assert.deepEqual(familles.map((f) => f.id), ['standard', 'medium-contrast', 'high-contrast', 'monochrome']);
  assert.deepEqual(familles.map((f) => f.libelle), ['Standard', 'Contraste moyen', 'Contraste élevé', 'Monochrome']);
  assert.ok(familles.every((f) => /^#[0-9a-f]{6}$/.test(f.apercu)));
  assert.equal(familles.filter((f) => f.defaut).length, 1);
  assert.equal(familles[0].defaut, true);
  assert.deepEqual(familles.map((f) => f.progression), [true, true, true, false]);
  assert.deepEqual(rapport.inconnus, []);
  assert.deepEqual(rapport.avertissements, []);
  assert.deepEqual(rapport.modesIgnores, []);
  assert.equal(rapport.modes, 8);
  assert.equal(rapport.md3, 148);
  assert.equal(rapport.custom, 41);
  assert.equal(rapport.police, 'Poppins');
  assert.doesNotMatch(css, /:root/);
  assert.doesNotMatch(css, /@import/);
  assert.ok(css.includes(`html.theme-${BASE}-high-contrast {`));
});

test('zip avec un sous-dossier racine', () => {
  assert.equal(generer(fichiersTokens(), 'tokens/').familles.length, 4);
});

test('une seule paire clair/sombre : une seule famille', () => {
  const { familles, css } = generer(fichiersUneFamille());
  assert.equal(familles.length, 1);
  assert.deepEqual([familles[0].id, familles[0].defaut], ['standard', true]);
  assert.ok(css.includes(`html.theme-${BASE}-standard {`));
});

test('une variable indispensable absente : erreur nommant la variable et le token', () => {
  const fichiers = modifierSemantiques(fichiersTokens(), (json) => {
    delete json.Colors.Schemes['Surface Dim'];
    delete json.Colors['State Layers']['Surface Dim'];
  });
  assert.throws(
    () => generer(fichiers),
    (erreur) => /--md-sys-color-surface-dim absent : token Colors\.Schemes\.Surface Dim/.test(erreur.message) && /absentes/.test(erreur.message),
  );
});

test('une variable du design system absente : avertissement seulement', () => {
  const fichiers = modifierSemantiques(fichiersTokens(), (json) => {
    delete json.Colors.Schemes.Success;
  });
  const { rapport } = generer(fichiers);
  assert.equal(rapport.custom, 40);
  assert.deepEqual(rapport.avertissements.length, 1);
  assert.match(rapport.avertissements[0], /--app-color-success \(token Colors\.Schemes\.Success\)/);
});

test('un token non reconnu et un mode sans clair/sombre : avertissements', () => {
  const fichiers = modifierSemantiques(fichiersTokens(), (json) => {
    json.Divers = { Truc: { $type: 'color', $value: '#123456' } };
  });
  fichiers['semantics/notes.tokens.json'] = '{}';
  const { rapport } = generer(fichiers);
  assert.deepEqual(rapport.inconnus, ['Divers.Truc']);
  assert.ok(rapport.avertissements.some((a) => a.includes('Token non reconnu') && a.includes('Divers.Truc')));
  assert.deepEqual(rapport.modesIgnores, ['notes']);
  assert.ok(rapport.avertissements.some((a) => a.includes('Mode non utilisé') && a.includes('notes')));
});

test('alias en cycle : erreur française', () => {
  const fichiers = modifierSemantiques(fichiersTokens(), (json, chemin) => {
    if (chemin.endsWith('semantics/light.tokens.json')) json.Colors.Schemes.Primary.$value = '{Colors.Schemes.Primary}';
  });
  assert.throws(() => generer(fichiers), /Cycle d'alias : Colors\.Schemes\.Primary → Colors\.Schemes\.Primary/);
});

test('famille incomplète (clair sans sombre) : erreur française', () => {
  const { 'semantics/dark-medium-contrast.tokens.json': _, ...fichiers } = fichiersTokens();
  assert.throws(() => generer(fichiers), /Famille incomplète : « light-medium-contrast » n'a pas de mode sombre/);
});

test('refus : pas un zip, pas de primitives, JSON invalide', () => {
  assert.throws(() => genererThemeImporte(strToU8('texte'), { base: BASE, nomSource: 'a.txt' }), /Archive illisible : « a\.txt »/);
  const { 'primitives.tokens.json': _, ...sansPrimitives } = fichiersTokens();
  assert.throws(() => generer(sansPrimitives), /primitives\.tokens\.json » introuvable/);
  assert.throws(() => generer({ ...fichiersTokens(), 'semantics/dark.tokens.json': '{ nope' }), /JSON invalide/);
});

test('une valeur de token malveillante est refusée par validerCss', () => {
  const fichiers = modifierSemantiques(fichiersTokens(), (json, chemin) => {
    if (chemin.endsWith('semantics/light.tokens.json')) json.Colors.Schemes.Primary.$value = 'red; } body { display: none';
  });
  assert.throws(() => generer(fichiers), /CSS généré invalide ligne \d+/);
});

test('un token mal formé donne un message français, pas une erreur technique', () => {
  const fichiers = modifierSemantiques(fichiersTokens(), (json, chemin) => {
    if (chemin.endsWith('semantics/light.tokens.json')) json.Colors.Schemes.Primary = null;
  });
  assert.throws(() => generer(fichiers), /Valeur inattendue pour « Colors\.Schemes\.Primary »/);
});

test('identifiant de thème invalide', () => {
  assert.throws(() => genererThemeImporte(zipDe(fichiersTokens()), { base: 'Imp X', nomSource: 'a.zip' }), /Identifiant de thème/);
});

// --- Export natif de Figma (un ou deux zips) -----------------------------------------------------------------
import { comparerSorties } from './comparer-sorties.mjs';
import { fichiersNatifs, zipsNatifs } from './fixtures-natif.mjs';

const natif = fichiersNatifs();
const sourcesNatives = () => {
  const { primitives, semantiques } = zipsNatifs();
  return [
    { nom: 'Primitives.zip', octets: primitives },
    { nom: 'Semantics.zip', octets: semantiques },
  ];
};
const depuisNatif = (sources) => genererThemeImporte(sources, { base: BASE });
/** Zips des fichiers natifs (texte), après transformation des JSON par `modifier(json, nomFichier)`. */
const zipsModifies = (modifier) => {
  const transformer = (fichiers) => Object.fromEntries(Object.entries(fichiers).map(([nom, texte]) => {
    const json = JSON.parse(texte);
    return [nom, JSON.stringify(modifier(json, nom) ?? json)];
  }));
  return [
    { nom: 'Primitives.zip', octets: zipDe(transformer(natif.primitives)) },
    { nom: 'Semantics.zip', octets: zipDe(transformer(natif.semantiques)) },
  ];
};

test('natif, deux zips : mêmes familles et même rapport que tokens/, CSS équivalent (ordre des rôles seul)', () => {
  const ancien = generer(fichiersTokens());
  const resultat = depuisNatif(sourcesNatives());
  assert.deepEqual(resultat.familles, ancien.familles);
  assert.deepEqual(resultat.rapport, { ...ancien.rapport, format: 'natif', ignores: ancien.rapport.ignores - 2 });
  assert.deepEqual([resultat.rapport.modes, resultat.rapport.md3, resultat.rapport.custom], [8, 148, 41]);
  assert.deepEqual(resultat.rapport.avertissements, []);
  assert.equal(ancien.rapport.format, 'ancien');
  const comparaison = comparerSorties(ancien.css, resultat.css).get('css');
  assert.deepEqual(comparaison, { statut: 'equivalent', ecarts: [] });
  assert.doesNotMatch(resultat.css, /:root/);
});

test('natif : zips inversés et zip combiné, avec l\'ancienne signature ou la nouvelle', () => {
  const [p, s] = sourcesNatives();
  const reference = depuisNatif([p, s]);
  assert.deepEqual(depuisNatif([s, p]), reference);
  const combine = zipsNatifs().combine;
  assert.deepEqual(depuisNatif([{ nom: 'tout.zip', octets: combine }]), reference);
  assert.deepEqual(genererThemeImporte(combine, { base: BASE, nomSource: 'tout.zip' }), reference);
});

test('natif : un seul zip incomplet → export incomplet ; trois fichiers mélangés avec l\'ancien format → erreur', () => {
  const [p, s] = sourcesNatives();
  assert.throws(() => depuisNatif([p]), /Export Figma incomplet : aucun mode sémantique/);
  assert.throws(() => depuisNatif([s]), /Export Figma incomplet : aucun fichier de primitives/);
  assert.throws(() => genererThemeImporte(p.octets, { base: BASE, nomSource: 'Primitives.zip' }), /Export Figma incomplet/);
  assert.throws(() => depuisNatif([p, { nom: 'ancien.zip', octets: zipDe(fichiersTokens()) }]), /Formats mélangés/);
});

test('natif : les avertissements de l\'adaptateur sont ajoutés au rapport', () => {
  const sources = zipsModifies((json, nom) => {
    if (nom === 'Light.tokens.json') json.Colors.Schemes.Standard.Primary.$value.hex = '#00FF00';
  });
  const { rapport } = depuisNatif(sources);
  assert.equal(rapport.avertissements.length, 1);
  assert.match(rapport.avertissements[0], /Light\.tokens\.json.*Colors\.Schemes\.Standard\.Primary : #00FF00 ≠ #86A315/);
});

test('natif : garde-fous (trop de JSON au total, JSON trop gros)', () => {
  const beaucoup = (prefixe) => zipDe(Object.fromEntries(Array.from({ length: 25 }, (_, i) => [`${prefixe}${i}.tokens.json`, '{}'])));
  assert.throws(() => depuisNatif([{ nom: 'a.zip', octets: beaucoup('a') }, { nom: 'b.zip', octets: beaucoup('b') }]), /Trop de fichiers JSON.*40 au plus au total/);
  const [p] = sourcesNatives();
  const gros = zipDe({ 'Light.tokens.json': `{"Colors":{"Schemes":{}},"x":"${'a'.repeat(5 * 1024 * 1024)}"}` });
  assert.throws(() => depuisNatif([p, { nom: 'gros.zip', octets: gros }]), /dépasse 5 Mo/);
});

test('natif : une valeur dangereuse est refusée (couleur par construction, nom de police par validerCss)', () => {
  const couleur = zipsModifies((json, nom) => {
    if (nom === 'Light.tokens.json') json.Colors.Schemes.Standard.Primary.$value.components = ['red; } body { display: none', 0, 0];
  });
  assert.throws(() => depuisNatif(couleur), /composantes de couleur invalides/);
  const hex = zipsModifies((json, nom) => {
    if (nom === 'Light.tokens.json') json.Colors.Schemes.Standard.Primary.$value = { colorSpace: 'srgb', hex: 'red; } body { display: none' };
  });
  assert.throws(() => depuisNatif(hex), /composantes de couleur invalides/);
  const police = zipsModifies((json, nom) => {
    if (nom === 'Baseline.tokens.json') json['Font theme'].Static.Font.Plain.$value = 'Poppins; } body { display: none';
  });
  assert.throws(() => depuisNatif(police), /CSS généré invalide ligne \d+/);
});

test('natif : graisse ou espace colorimétrique inconnus → erreur française', () => {
  const graisse = zipsModifies((json, nom) => {
    if (nom === 'Baseline.tokens.json') json['Font theme'].Static.Weight.Bold.$value = 'Gras';
  });
  assert.throws(() => depuisNatif(graisse), /Font theme\.Static\.Weight\.Bold.*« Gras » inconnue/);
  const espace = zipsModifies((json, nom) => {
    if (nom === 'Dark.tokens.json') json.Colors.Schemes.Standard.Primary.$value.colorSpace = 'display-p3';
  });
  assert.throws(() => depuisNatif(espace), /display-p3.*srgb/);
});

test('l\'ancien zip seul passe toujours par l\'ancienne signature et garde son format', () => {
  const { rapport } = genererThemeImporte(zipDe(fichiersTokens()), { base: BASE, nomSource: 'tokens.zip' });
  assert.equal(rapport.format, 'ancien');
});
