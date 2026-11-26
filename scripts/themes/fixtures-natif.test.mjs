import assert from 'node:assert/strict';
import { test } from 'node:test';
import { unzipSync } from 'fflate';
import { aplatir } from './resoudre-tokens.mjs';
import { extraitReel, fichiersNatifs, GROUPES_NATIFS, MODES_NATIFS, zipsNatifs } from './fixtures-natif.mjs';

const { primitives, semantiques } = fichiersNatifs();
const json = (texte) => JSON.parse(texte);
const parcourir = (arbre, visiter) => {
  for (const [cle, valeur] of Object.entries(arbre)) {
    if (cle.startsWith('$')) continue;
    if ('$value' in valeur) visiter(valeur);
    else parcourir(valeur, visiter);
  }
};
const compter = (arbre) => {
  let n = 0;
  parcourir(arbre, () => n++);
  return n;
};

test('fixture : 8 modes sémantiques de 301 jetons, nommés comme Figma, et un fichier de primitives de 233 jetons', () => {
  assert.deepEqual(Object.keys(semantiques).sort(), Object.values(MODES_NATIFS).map((m) => `${m}.tokens.json`).sort());
  for (const [fichier, texte] of Object.entries(semantiques)) {
    const arbre = json(texte);
    assert.equal(compter(arbre), 301, fichier);
    assert.equal(arbre.$extensions['com.figma.modeName'], fichier.replace('.tokens.json', ''));
  }
  const base = json(primitives['Baseline.tokens.json']);
  assert.equal(compter(base), 233);
  assert.equal(base.$extensions['com.figma.modeName'], 'Baseline');
});

test('fixture : groupes Standard 17, Surface 16, Fixed 12, States 16 et Neutral Black/White', () => {
  const { Colors } = json(semantiques['Light.tokens.json']);
  assert.deepEqual(Object.keys(Colors), ['Schemes', 'State Layers', 'Add-ons']);
  assert.deepEqual(Object.keys(Colors.Schemes), ['Standard', 'Surface', 'Fixed', 'States', 'Neutral']);
  assert.deepEqual(
    Object.fromEntries(Object.entries(GROUPES_NATIFS).map(([g, roles]) => [g, roles.length])),
    { Standard: 17, Surface: 16, Fixed: 12, States: 16 },
  );
  for (const [groupe, roles] of Object.entries(GROUPES_NATIFS)) assert.deepEqual(Object.keys(Colors.Schemes[groupe]), roles);
  assert.deepEqual(Object.keys(Colors.Schemes.Neutral).sort(), ['Black', 'White']);
  assert.equal(Colors.Schemes.Neutral.Black.$value.hex, '#1A1A1A');
  assert.equal(Colors.Schemes.Neutral.White.$value.hex, '#FFFFFF');
});

test('fixture : couleurs en objets, dimensions en nombres, graisses nommées, alias résolus sauf vers Neutral', () => {
  const clair = json(semantiques['Light.tokens.json']);
  const primary = clair.Colors.Schemes.Standard.Primary;
  assert.equal(primary.$type, 'color');
  assert.deepEqual(Object.keys(primary.$value), ['colorSpace', 'components', 'alpha', 'hex']);
  assert.equal(primary.$value.hex, '#86A315');
  assert.equal(primary.$extensions['com.figma.aliasData'].targetVariableName, 'Colors/Olive/Shade-012');
  assert.equal(clair.Colors.Schemes.Standard['On Primary'].$value, '{Colors.Schemes.Neutral.Black}');
  const typo = clair.Typescale.Static['Display Large'];
  assert.deepEqual([typo.Size.$type, typo.Size.$value, typo.Tracking.$value], ['number', 57, -0.25]);
  assert.deepEqual([typo.Font.$type, typo.Font.$value, typo.Weight.$value], ['string', 'Poppins', 'Regular']);
  assert.equal(clair.Typescale.Static['Label Large']['Weight-emphasized'].$value, 'SemiBold');
  const opacite = clair.Colors['State Layers'].Primary['Opacity-08'].$value;
  assert.ok(opacite.alpha < 1 && opacite.hex === '#86A315');

  // Seuls des alias vers Neutral subsistent.
  for (const [chemin, jeton] of aplatir(clair)) {
    if (typeof jeton.brut === 'string' && jeton.brut.startsWith('{')) {
      assert.match(jeton.brut, /^\{Colors\.Schemes\.Neutral\.(Black|White)\}$/, chemin);
    }
  }
});

test('fixture : pas de Number / Number 2, valeurs numériques sans unité', () => {
  const base = json(primitives['Baseline.tokens.json']);
  assert.deepEqual(Object.keys(base), ['Font theme', 'Radius', 'Spacing', 'Colors', '$extensions']);
  assert.deepEqual([base.Radius['Extra-small'].$type, base.Radius['Extra-small'].$value], ['number', 4]);
  assert.equal(base['Font theme'].Static.Weight.Bold.$value, 'SemiBold');
});

test('fixture : chaque jeton a un variableId distinct', () => {
  const ids = new Set();
  const noter = (jeton) => ids.add(jeton.$extensions['com.figma.variableId']);
  parcourir(json(primitives['Baseline.tokens.json']), noter);
  parcourir(json(semantiques['Light.tokens.json']), noter);
  assert.equal(ids.size, 233 + 301);
});

test('zips natifs : Primitives (1 fichier), Semantics (8) et combiné (9)', () => {
  const { primitives: p, semantiques: s, combine } = zipsNatifs();
  assert.deepEqual(Object.keys(unzipSync(p)), ['Baseline.tokens.json']);
  assert.equal(Object.keys(unzipSync(s)).length, 8);
  assert.equal(Object.keys(unzipSync(combine)).length, 9);
});

test("extrait réel : forme conforme à l'export de Figma", () => {
  const base = extraitReel('Baseline.tokens.json');
  const clair = extraitReel('Light.tokens.json');
  const mono = extraitReel('Monochrome LT.tokens.json');
  assert.equal(base.$extensions['com.figma.modeName'], 'Baseline');
  assert.equal(clair.$extensions['com.figma.modeName'], 'Light');
  assert.equal(mono.$extensions['com.figma.modeName'], 'Monochrome LT');
  assert.equal(base['Font theme'].Static.Weight.Bold.$value, 'SemiBold');
  assert.equal(base['Font theme'].Tracking.Small.$value, 0.10000000149011612);
  const primary = clair.Colors.Schemes.Standard.Primary;
  assert.equal(primary.$value.colorSpace, 'srgb');
  assert.equal(primary.$value.hex, '#86A315');
  assert.equal(primary.$extensions['com.figma.aliasData'].targetVariableName, 'Colors/Olive/Shade-012');
  assert.equal(clair.Colors.Schemes.Standard['On Primary'].$value, '{Colors.Schemes.Neutral.Black}');
  assert.ok(clair.Colors['State Layers'].Primary['Opacity-08'].$value.alpha < 1);
  assert.equal(clair.Colors.Schemes.States.Success.$value.hex, '#477A14');
  assert.equal(clair.Typescale.Static['Label Large']['Weight-emphasized'].$value, 'SemiBold');
  assert.equal(mono.Colors.Schemes.Standard.Primary.$value, '{Colors.Schemes.Neutral.Black}');
});

test("la fixture et l'extrait réel décrivent les mêmes jetons (mêmes valeurs pour ceux qu'ils partagent)", () => {
  const clairFixture = aplatir(json(semantiques['Light.tokens.json']));
  const clairReel = aplatir(extraitReel('Light.tokens.json'));
  for (const [chemin, jeton] of clairReel) {
    // Success : changement réel du design system (Green Shade-007 ; Shade-009 dans l'ancien format).
    if (chemin === 'Colors.Schemes.States.Success') continue;
    assert.equal(JSON.stringify(clairFixture.get(chemin).brut), JSON.stringify(jeton.brut), chemin);
  }
});
