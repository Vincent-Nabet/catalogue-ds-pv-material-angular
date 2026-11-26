import assert from 'node:assert/strict';
import { test } from 'node:test';
import { ROLES_CUSTOM, ROLES_MD3 } from './correspondance.mjs';
import { comparerSorties } from './comparer-sorties.mjs';
import { classeFamille, genererManifeste } from './ecrire-manifeste.mjs';
import { genererMaterial } from './ecrire-material.mjs';
import { genererVariables } from './ecrire-variables.mjs';
import { extraitReel, fichiersNatifs } from './fixtures-natif.mjs';
import { fichiersTokens } from './fixtures-tokens.mjs';
import { adapter, assemblerFigma, classerFichierFigma, detecterFormat, normaliserMode } from './format-figma.mjs';

const couleur = (hex, alpha = 1, extra = {}) => ({ $type: 'color', $value: { colorSpace: 'srgb', components: hex, alpha, ...extra } });
const un = (arbre, chemin) => chemin.split('.').reduce((noeud, cle) => noeud?.[cle], arbre);
const adapte = (json) => adapter(json, { fichier: 'essai' });
const valeur = (json, chemin) => un(adapte(json).arbre, chemin);

test('couleur : components fait foi, arrondi à l\'octet, hex en majuscules', () => {
  const { arbre } = adapte({ Colors: { Schemes: { Primary: couleur([0.5254902243614197, 0.6392157077789307, 0.08235294371843338]) } } });
  assert.deepEqual(arbre.Colors.Schemes.Primary, { $type: 'color', $value: '#86A315' });
  assert.equal(valeur({ C: { Noir: couleur([0, 0, 0]), Blanc: couleur([1, 1, 1]) } }, 'C.Blanc.$value'), '#FFFFFF');
  assert.equal(valeur({ C: { Noir: couleur([0, 0, 0]) } }, 'C.Noir.$value'), '#000000');
});

test('couleur : alpha < 1 → #RRGGBBAA', () => {
  assert.equal(valeur({ C: { X: couleur([0.5254902243614197, 0.6392157077789307, 0.08235294371843338], 0.07999999821186066) } }, 'C.X.$value'), '#86A31514');
  assert.equal(valeur({ C: { X: couleur([1, 1, 1], 0) } }, 'C.X.$value'), '#FFFFFF00');
  assert.equal(valeur({ C: { X: couleur([1, 1, 1], 1) } }, 'C.X.$value'), '#FFFFFF');
});

test('couleur : espace non sRGB, composantes ou alpha invalides → erreur nommant le jeton', () => {
  const erreur = (jeton, motif) => assert.throws(() => adapte({ Colors: { Test: jeton } }), motif);
  erreur({ $type: 'color', $value: { colorSpace: 'display-p3', components: [1, 0, 0], alpha: 1 } }, /Colors\.Test.*display-p3.*srgb/);
  erreur(couleur([1.2, 0, 0]), /Colors\.Test.*composantes/);
  erreur(couleur([-0.1, 0, 0]), /Colors\.Test.*composantes/);
  erreur(couleur([Number.NaN, 0, 0]), /Colors\.Test.*composantes/);
  erreur(couleur(['1', 0, 0]), /Colors\.Test.*composantes/);
  erreur(couleur([1, 0]), /Colors\.Test.*composantes/);
  erreur(couleur([1, 0, 0], 2), /Colors\.Test.*opacité/);
  erreur(couleur([1, 0, 0], 'x'), /Colors\.Test.*opacité/);
  erreur({ $type: 'color', $value: 12 }, /Colors\.Test.*illisible/);
});

test('couleur : components absent mais hex valide → hex ; hex incohérent → avertissement, components retenu', () => {
  const sansComposantes = { Colors: { X: { $type: 'color', $value: { colorSpace: 'srgb', alpha: 1, hex: '#abcdef' } } } };
  assert.equal(valeur(sansComposantes, 'Colors.X.$value'), '#ABCDEF');
  assert.throws(() => adapte({ Colors: { X: { $type: 'color', $value: { colorSpace: 'srgb', hex: 'rouge' } } } }), /composantes/);
  // Sans components, l'alpha du hex à 8 chiffres est conservé tant que le champ « alpha » est absent ; sinon « alpha » fait foi.
  const hexSeul = (extra) => valeur({ Colors: { X: { $type: 'color', $value: { colorSpace: 'srgb', ...extra } } } }, 'Colors.X.$value');
  assert.equal(hexSeul({ hex: '#12345678' }), '#12345678');
  assert.equal(hexSeul({ hex: '#abcdef' }), '#ABCDEF');
  assert.equal(hexSeul({ hex: '#12345678', alpha: 1 }), '#123456');
  assert.equal(hexSeul({ hex: '#12345678', alpha: 0 }), '#12345600');
  assert.throws(() => hexSeul({ hex: '#1234567' }), /composantes/);

  const incoherent = adapte({ Colors: { X: couleur([1, 0, 0], 1, { hex: '#00FF00' }) } });
  assert.equal(incoherent.arbre.Colors.X.$value, '#FF0000');
  assert.equal(incoherent.avertissements.length, 1);
  assert.match(incoherent.avertissements[0], /pour 1 couleur\(s\) de « essai ».*components.*retenu.*Colors\.X : #00FF00 ≠ #FF0000/);
  assert.deepEqual(adapte({ Colors: { X: couleur([1, 0, 0], 1, { hex: '#ff0000' }) } }).avertissements, []);
});

test('couleur : hex incohérents en nombre → un seul avertissement, au plus 10 exemples', () => {
  const couleurs = Object.fromEntries(Array.from({ length: 25 }, (_, i) => [`C${i}`, couleur([1, 0, 0], 1, { hex: '#00FF00' })]));
  const { avertissements } = adapte({ Colors: couleurs });
  assert.equal(avertissements.length, 1);
  assert.match(avertissements[0], /pour 25 couleur\(s\)/);
  assert.match(avertissements[0], /… et 15 autre\(s\)/);
  assert.equal(avertissements[0].split(' ≠ ').length - 1, 10);
});

test('aplatissement : tout groupe de Colors.Schemes est aplati, Neutral White/Black → 0/900', () => {
  const { arbre, avertissements } = adapte({
    Colors: {
      Schemes: {
        Standard: { Primary: couleur([1, 0, 0]) },
        Surface: { Surface: couleur([0, 1, 0]) },
        Neutral: { Black: couleur([0, 0, 0]), White: couleur([1, 1, 1]) },
        Plate: { Secondary: couleur([0, 0, 1]) },
      },
    },
  });
  assert.deepEqual(Object.keys(arbre.Colors.Schemes), ['Primary', 'Secondary', 'Surface', 'Neutral']);
  assert.deepEqual(Object.keys(arbre.Colors.Schemes.Neutral), ['0', '900']);
  assert.equal(arbre.Colors.Schemes.Neutral[0].$value, '#FFFFFF');
  assert.equal(arbre.Colors.Schemes.Neutral[900].$value, '#000000');
  assert.deepEqual(avertissements, []);
});

test('aplatissement : groupe inconnu aplati avec avertissement ; rôle défini deux fois → erreur ; chemins déjà plats ou profonds', () => {
  const { arbre, avertissements } = adapte({ Colors: { Schemes: { Brand: { Inconnu: couleur([1, 0, 0]) }, Standard: { Primary: couleur([1, 0, 0]) } } } });
  assert.deepEqual(Object.keys(arbre.Colors.Schemes), ['Primary', 'Inconnu']);
  assert.equal(avertissements.length, 1);
  assert.match(avertissements[0], /Groupe de rôles inconnu aplati dans « essai » : « Brand »/);

  assert.throws(
    () => adapte({ Colors: { Schemes: { Standard: { Primary: couleur([1, 0, 0]) }, Autre: { Primary: couleur([0, 0, 1]) } } } }),
    /Rôle « Colors\.Schemes\.Primary » défini deux fois.*Standard\.Primary.*Autre\.Primary/,
  );
  // Déjà à plat : inchangé. Profondeur supérieure : un seul niveau retiré.
  const plat = adapte({ Colors: { Schemes: { Primary: couleur([1, 0, 0]), G: { Sous: { Role: couleur([1, 0, 0]) } } } } });
  assert.deepEqual(Object.keys(plat.arbre.Colors.Schemes), ['Primary', 'Sous']);
  assert.ok(plat.arbre.Colors.Schemes.Sous.Role);
});

test('noms réservés (__proto__, constructor, prototype) → erreur, le prototype des objets reste intact', () => {
  const brut = (chemin) => JSON.parse(`{"Colors":{"Schemes":{"Standard":{${chemin}}}}}`);
  const jeton = '{"$type":"color","$value":{"colorSpace":"srgb","components":[1,0,0]}}';
  for (const nom of ['__proto__', 'constructor', 'prototype']) {
    assert.throws(() => adapte(brut(`"${nom}":{"toString":${jeton}}`)), new RegExp(`Jeton « Colors\\.Schemes\\.Standard\\.${nom}\\.toString ».*« ${nom} » est réservé`));
  }
  assert.throws(() => adapte(brut(`"Primary":${jeton},"Primary2":{"constructor":{"prototype":{"polluee":${jeton}}}}`)), /est réservé/);
  assert.equal(({}).toString, Object.prototype.toString);
  assert.equal(({}).polluee, undefined);
});

test('groupe nommé comme une méthode d\'Object (toString, valueOf, hasOwnProperty) → nœud propre, prototype intact', () => {
  const jeton = { $type: 'color', $value: { colorSpace: 'srgb', components: [1, 0, 0] } };
  for (const nom of ['toString', 'valueOf', 'hasOwnProperty']) {
    const { arbre } = adapte({ Colors: { [nom]: { Role: jeton } } });
    assert.ok(Object.hasOwn(arbre.Colors, nom), `${nom} : nœud propre`);
    assert.ok(arbre.Colors[nom].Role, `${nom} : jeton posé`);
    assert.equal(Object.prototype[nom].Role, undefined, `${nom} : prototype intact`);
  }
});

test('tri : ordre de ROLES_MD3 puis ROLES_CUSTOM, rôles inconnus ensuite, Neutral en dernier', () => {
  const { arbre } = adapte({
    Colors: {
      Schemes: {
        Neutral: { Black: couleur([0, 0, 0]) },
        States: { Warning: couleur([1, 0, 0]), 'Zorglub': couleur([1, 0, 0]), Success: couleur([1, 0, 0]) },
        Standard: { Secondary: couleur([1, 0, 0]), Primary: couleur([1, 0, 0]), 'Autre Inconnu': couleur([1, 0, 0]) },
        Surface: { 'On Surface': couleur([1, 0, 0]), 'Surface Tint': couleur([1, 0, 0]) },
      },
    },
  });
  assert.deepEqual(Object.keys(arbre.Colors.Schemes), ['Primary', 'Surface Tint', 'Secondary', 'On Surface', 'Success', 'Warning', 'Zorglub', 'Autre Inconnu', 'Neutral']);
  const roles = [...ROLES_MD3, ...ROLES_CUSTOM];
  assert.ok(roles.indexOf('primary') < roles.indexOf('surface-tint') && roles.indexOf('secondary') < roles.indexOf('on-surface'));
});

test('alias : réécrit comme les chemins, type conservé', () => {
  const { arbre } = adapte({
    Colors: { Schemes: { Standard: { 'On Primary': { $type: 'color', $value: '{Colors.Schemes.Neutral.Black}' } }, Neutral: { White: { $type: 'color', $value: '{Colors.Schemes.Neutral.Black}' } } } },
    Typescale: { Static: { 'Body Large': { Weight: { $type: 'string', $value: '{Font theme.Static.Weight.Bold}' } } } },
  });
  assert.deepEqual(arbre.Colors.Schemes['On Primary'], { $type: 'color', $value: '{Colors.Schemes.Neutral.900}' });
  assert.equal(arbre.Colors.Schemes.Neutral[0].$value, '{Colors.Schemes.Neutral.900}');
  assert.deepEqual(arbre.Typescale.Static['Body Large'].Weight, { $type: 'fontWeight', $value: '{Font theme.Static.Weight.Bold}' });
  assert.equal(valeur({ Colors: { Schemes: { Standard: { A: { $type: 'color', $value: '{Colors.Schemes.Standard.B}' } } } } }, 'Colors.Schemes.A.$value'), '{Colors.Schemes.B}');
});

test('nombres : dimension en px, bruit flottant, négatifs, entiers ; non fini → erreur', () => {
  const nombres = { Radius: { A: { $type: 'number', $value: 57 }, B: { $type: 'number', $value: 0.15000000596046448 }, C: { $type: 'number', $value: -0.25 }, D: { $type: 'number', $value: 0 }, E: { $type: 'number', $value: 0.10000000149011612 } } };
  const { arbre } = adapte(nombres);
  assert.deepEqual(Object.values(arbre.Radius).map((j) => [j.$type, j.$value]), [['dimension', '57px'], ['dimension', '0.15px'], ['dimension', '-0.25px'], ['dimension', '0px'], ['dimension', '0.1px']]);
  assert.throws(() => adapte({ Radius: { A: { $type: 'number', $value: Number.POSITIVE_INFINITY } } }), /Radius\.A.*nombre/);
  assert.throws(() => adapte({ Radius: { A: { $type: 'number', $value: '12' } } }), /Radius\.A.*nombre/);
  assert.throws(() => adapte({ Radius: { A: { $type: 'number', $value: 1e21 } } }), /Radius\.A.*démesurée/);
  assert.throws(() => adapte({ Radius: { A: { $type: 'number', $value: -2e6 } } }), /Radius\.A.*démesurée/);
  assert.equal(valeur({ Radius: { A: { $type: 'number', $value: 1e6 } } }, 'Radius.A.$value'), '1000000px');
});

test('graisses : par la valeur (jamais par le nom du jeton), nombre sous Weight, numérique, inconnue → erreur', () => {
  const { arbre } = adapte({
    'Font theme': { Static: { Weight: {
      Regular: { $type: 'string', $value: 'Regular' }, Medium: { $type: 'string', $value: 'Medium' }, Bold: { $type: 'string', $value: 'SemiBold' },
      Num: { $type: 'string', $value: '400' }, Souple: { $type: 'string', $value: 'Extra Bold' }, Nombre: { $type: 'number', $value: 700 },
    } } },
    Typescale: { Static: { 'Body Large': { Weight: { $type: 'string', $value: 'semi-bold' }, 'Weight-emphasized': { $type: 'string', $value: 'BLACK' } } } },
  });
  const poids = arbre['Font theme'].Static.Weight;
  assert.deepEqual(Object.values(poids).map((j) => [j.$type, j.$value]), [['fontWeight', 400], ['fontWeight', 500], ['fontWeight', 600], ['fontWeight', 400], ['fontWeight', 800], ['fontWeight', 700]]);
  assert.deepEqual([arbre.Typescale.Static['Body Large'].Weight.$value, arbre.Typescale.Static['Body Large']['Weight-emphasized'].$value], [600, 900]);
  assert.throws(
    () => adapte({ 'Font theme': { Static: { Weight: { Bold: { $type: 'string', $value: 'Gras' } } } } }),
    /Font theme\.Static\.Weight\.Bold.*« Gras » inconnue.*semibold/,
  );
});

test('familles : string sous Font → fontFamily ; autre string transmise telle quelle ; type inconnu transmis', () => {
  const { arbre } = adapte({
    'Font theme': { Static: { Font: { Brand: { $type: 'string', $value: 'Poppins' } } } },
    Typescale: { Static: { 'Body Large': { Font: { $type: 'string', $value: 'Open Sans' } } } },
    Divers: { Texte: { $type: 'string', $value: 'abc' }, Bool: { $type: 'boolean', $value: true }, Objet: { $type: 'shadow', $value: { x: 1 } } },
  });
  assert.deepEqual(arbre['Font theme'].Static.Font.Brand, { $type: 'fontFamily', $value: 'Poppins' });
  assert.deepEqual(arbre.Typescale.Static['Body Large'].Font, { $type: 'fontFamily', $value: 'Open Sans' });
  assert.deepEqual(arbre.Divers.Texte, { $type: 'string', $value: 'abc' });
  assert.deepEqual(arbre.Divers.Bool, { $type: 'boolean', $value: true });
  assert.deepEqual(arbre.Divers.Objet, { $type: 'shadow', $value: { x: 1 } });
});

test('$extensions et $description ignorés (hors lien d\'alias)', () => {
  const { arbre } = adapte({
    $extensions: { 'com.figma.modeName': 'Light' },
    Radius: { A: { $type: 'number', $value: 4, $description: 'x', $extensions: { 'com.figma.variableId': 'V:1', 'com.figma.scopes': ['CORNER_RADIUS'] } } },
  });
  assert.deepEqual(arbre, { Radius: { A: { $type: 'dimension', $value: '4px' } } });
});

test('classement des fichiers : sémantique, primitives, inconnu', () => {
  assert.equal(classerFichierFigma({ Colors: { Schemes: {} } }), 'semantique');
  assert.equal(classerFichierFigma({ Typescale: { Static: {} } }), 'semantique');
  assert.equal(classerFichierFigma({ 'Font theme': {}, Radius: {}, Spacing: {}, Colors: { Olive: {} } }), 'primitives');
  assert.equal(classerFichierFigma({ Radius: {} }), 'primitives');
  assert.equal(classerFichierFigma({ Autre: {} }), null);
  assert.equal(classerFichierFigma([]), null);
  assert.equal(classerFichierFigma(null), null);
});

test('détection du format : natif (modeName ou couleur en objet), ancien (#hex), neutre', () => {
  assert.equal(detecterFormat({ $extensions: { 'com.figma.modeName': 'Light' } }), 'natif');
  assert.equal(detecterFormat({ C: couleur([1, 1, 1]) }), 'natif');
  assert.equal(detecterFormat({ C: { X: { $type: 'color', $value: '#86A315' } } }), 'ancien');
  assert.equal(detecterFormat({ C: { X: { $type: 'color', $value: '{Colors.Olive}' } }, R: { $type: 'dimension', $value: '4px' } }), null);
  assert.equal(detecterFormat({}), null);
  assert.equal(detecterFormat([]), null);
  assert.equal(detecterFormat('texte'), null);
  assert.equal(detecterFormat({ $extensions: { 'com.figma.modeName': 3 } }), null);
  assert.equal(detecterFormat({ C: { X: { $type: 'color', $value: '#86A315' }, Y: couleur([1, 0, 0]) } }), 'natif');
  assert.equal(detecterFormat(extraitReel('Baseline.tokens.json')), 'natif');
  assert.equal(detecterFormat(JSON.parse(fichiersTokens()['primitives.tokens.json'])), 'ancien');
});

test('noms de mode normalisés', () => {
  assert.equal(normaliserMode('Dark High Contrast'), 'dark-high-contrast');
  assert.equal(normaliserMode('Monochrome LT'), 'monochrome-lt');
  assert.equal(normaliserMode('light_medium.contrast'), 'light-medium-contrast');
  assert.equal(normaliserMode('Light'), 'light');
});

test('extrait réel : valeurs relevées à la main', () => {
  const base = adapter(extraitReel('Baseline.tokens.json'), { fichier: 'Baseline' }).arbre;
  assert.deepEqual(base['Font theme'].Static.Font.Brand, { $type: 'fontFamily', $value: 'Poppins' });
  assert.deepEqual(base['Font theme'].Static.Weight.Bold, { $type: 'fontWeight', $value: 600 });
  assert.deepEqual(base['Font theme'].Static.Weight.Regular, { $type: 'fontWeight', $value: 400 });
  assert.deepEqual(base['Font theme'].Tracking.Small, { $type: 'dimension', $value: '0.1px' });
  assert.deepEqual(base.Radius['Extra-small'], { $type: 'dimension', $value: '4px' });
  assert.equal(base.Colors.Olive['Shade-012'].$value, '#86A315');
  assert.equal(base.Colors.Neutral['Shade-005'].$value, '#1A1A1A');

  const clair = adapter(extraitReel('Light.tokens.json'), { fichier: 'Light' });
  const { Colors, Typescale } = clair.arbre;
  assert.deepEqual(clair.avertissements, []);
  assert.deepEqual(Object.keys(Colors.Schemes), ['Primary', 'On Primary', 'Success', 'Neutral']);
  assert.equal(Colors.Schemes.Primary.$value, '#86A315');
  assert.equal(Colors.Schemes['On Primary'].$value, '{Colors.Schemes.Neutral.900}');
  assert.equal(Colors.Schemes.Neutral[900].$value, '#1A1A1A');
  assert.equal(Colors.Schemes.Neutral[0].$value, '#FFFFFF');
  assert.equal(Colors.Schemes.Success.$value, '#477A14');
  assert.equal(Colors['State Layers'].Primary['Opacity-08'].$value, '#86A31514');
  assert.equal(Colors['Add-ons']['Section background'].$value, '#F5F5F5');
  assert.deepEqual(Typescale.Static['Display Large'], {
    Size: { $type: 'dimension', $value: '57px' },
    Tracking: { $type: 'dimension', $value: '-0.25px' },
    'Line Height': { $type: 'dimension', $value: '64px' },
    Font: { $type: 'fontFamily', $value: 'Poppins' },
    Weight: { $type: 'fontWeight', $value: 400 },
    'Weight-emphasized': { $type: 'fontWeight', $value: 500 },
  });
  assert.deepEqual(Typescale.Static['Label Large'], { 'Weight-emphasized': { $type: 'fontWeight', $value: 600 } });
  assert.deepEqual(clair.liens.map((l) => [l.nom, l.cible]).slice(0, 2), [
    ['Colors.Schemes.Standard.Primary', 'Colors.Olive.Shade-012'],
    ['Colors.Schemes.States.Success', 'Colors.Green.Shade-007'],
  ]);

  const mono = adapter(extraitReel('Monochrome LT.tokens.json'), { fichier: 'Monochrome LT' }).arbre;
  assert.equal(mono.Colors.Schemes.Primary.$value, '{Colors.Schemes.Neutral.900}');
  assert.equal(mono.Colors.Schemes.Surface.$value, '#FAFAFA');
});

const entreesDe = (fichiers) => [...Object.entries(fichiers.primitives), ...Object.entries(fichiers.semantiques)].map(([chemin, texte]) => ({ chemin, json: JSON.parse(texte) }));
const extrait = () => [
  { chemin: 'Baseline.tokens.json', json: extraitReel('Baseline.tokens.json') },
  { chemin: 'Light.tokens.json', json: extraitReel('Light.tokens.json') },
  { chemin: 'Monochrome LT.tokens.json', json: extraitReel('Monochrome LT.tokens.json') },
];

test('assemblage : extrait réel → forme interne (modes normalisés, format, aucun avertissement)', () => {
  const source = assemblerFigma(extrait(), 'Primitives.zip + Semantics.zip');
  assert.deepEqual(Object.keys(source.semantiques), ['light', 'monochrome-lt']);
  assert.equal(source.format, 'natif');
  assert.equal(source.origine, 'Primitives.zip + Semantics.zip');
  assert.deepEqual(source.avertissements, []);
  assert.ok(source.primitives.Colors.Olive['Shade-012']);
});

test('assemblage : rôle d\'un fichier déduit du contenu, ordre sans importance', () => {
  const [p, ...reste] = extrait();
  const source = assemblerFigma([...reste.reverse(), p], 'x');
  assert.deepEqual(Object.keys(source.semantiques), ['light', 'monochrome-lt']);
});

test('assemblage : primitives ou sémantiques manquantes, primitives en double, mode dupliqué, fichier inconnu', () => {
  const [p, l, m] = extrait();
  assert.throws(() => assemblerFigma([l, m], 'x'), /Export Figma incomplet : aucun fichier de primitives.*--source Primitives\.zip/);
  assert.throws(() => assemblerFigma([p], 'x'), /Export Figma incomplet : aucun mode sémantique/);
  assert.throws(() => assemblerFigma([p, { ...p, chemin: 'Autre.tokens.json' }, l], 'x'), /Plusieurs fichiers de primitives/);
  assert.throws(() => assemblerFigma([p, l, { ...l, chemin: 'dossier/light.tokens.json' }], 'x'), /Mode « light » défini deux fois/);
  assert.throws(() => assemblerFigma([p, l, { chemin: 'x.tokens.json', json: { Truc: {} } }], 'x'), /Fichier de tokens non reconnu : « x\.tokens\.json »/);
});

test('cohérence des liens d\'alias : primitives d\'un autre export → un seul avertissement, au plus 10 exemples', () => {
  const [p, l, m] = extrait();
  const autre = structuredClone(p.json);
  for (const jeton of [autre.Colors.Olive['Shade-012'], autre.Colors.Green['Shade-007']]) jeton.$value = { colorSpace: 'srgb', components: [0, 0, 0], alpha: 1 };
  const { avertissements } = assemblerFigma([{ ...p, json: autre }, l, m], 'x');
  assert.equal(avertissements.length, 1);
  assert.match(avertissements[0], /ne semblent pas issues du même export : 2 valeur\(s\).*Colors\.Schemes\.Standard\.Primary vaut #86A315 mais « Colors\.Olive\.Shade-012 » vaut #000000/);

  // Cible absente de la collection Primitives : signalée ; lien sans aliasData : contrôle sauté.
  const sans = structuredClone(p.json);
  delete sans.Colors.Olive;
  assert.match(assemblerFigma([{ ...p, json: sans }, l, m], 'x').avertissements[0], /\(absent\)/);
  const clair = structuredClone(l.json);
  parcourir(clair, (jeton) => delete jeton.$extensions?.['com.figma.aliasData']);
  assert.deepEqual(assemblerFigma([p, { ...l, json: clair }, m], 'x').avertissements, []);
});

function parcourir(arbre, visiter) {
  for (const [cle, valeur] of Object.entries(arbre)) {
    if (cle.startsWith('$')) continue;
    if ('$value' in valeur) visiter(valeur);
    else parcourir(valeur, visiter);
  }
}

test('cohérence : plus de 10 écarts → exemples limités', () => {
  const [p, l, m] = extrait();
  // 6 jetons de l'extrait ont un lien : on les démultiplie dans de faux modes pour dépasser 10 écarts.
  const entrees = [p, l, m];
  for (let i = 0; i < 3; i++) {
    const faux = structuredClone(l.json);
    parcourir(faux, (jeton) => {
      if (jeton.$extensions?.['com.figma.aliasData'] && typeof jeton.$value === 'object') jeton.$value = { colorSpace: 'srgb', components: [0, 0, 0], alpha: 1 };
    });
    entrees.push({ chemin: `Faux ${i} Light.tokens.json`, json: faux });
  }
  const [avertissement] = assemblerFigma(entrees, 'x').avertissements;
  assert.match(avertissement, /… et \d+ autre\(s\)/);
  assert.equal(avertissement.split(' ; ').length, 10);
});

// --- Aller-retour : tokens/ → natif (fixture) → adaptateur → mêmes sorties que tokens/ ---------------------------

function sortiesDe(source, options = {}) {
  const variables = genererVariables(source, { nom: 'app', ...options });
  const classes = variables.rapport.familles.map((f) => classeFamille(f, 'app'));
  const material = genererMaterial({ nom: 'app', variables: variables.variables, paletteRepli: 'chartreuse', classes });
  const manifeste = new Map([['families.ts', genererManifeste({ nom: 'app', familles: variables.rapport.familles })]]);
  return { fichiers: new Map([...variables.fichiers, ...material.fichiers, ...manifeste]), rapport: variables.rapport };
}

function ancienne() {
  const brut = fichiersTokens();
  const semantiques = {};
  for (const [chemin, texte] of Object.entries(brut)) {
    if (chemin.startsWith('semantics/')) semantiques[chemin.slice('semantics/'.length, -'.tokens.json'.length)] = JSON.parse(texte);
  }
  return { primitives: JSON.parse(brut['primitives.tokens.json']), semantiques, origine: 'tokens' };
}

for (const palettes of [false, true]) {
  test(`aller-retour (palettes : ${palettes}) : 6 fichiers identiques, app.css équivalent (ordre seul), même rapport`, () => {
    const natif = assemblerFigma(entreesDe(fichiersNatifs()), 'Primitives.zip + Semantics.zip');
    assert.deepEqual(natif.avertissements, []);
    assert.deepEqual(Object.keys(natif.semantiques).sort(), Object.keys(ancienne().semantiques).sort());

    const attendu = sortiesDe(ancienne(), { palettes });
    const obtenu = sortiesDe(natif, { palettes });
    const comparaison = comparerSorties(attendu.fichiers, obtenu.fichiers);
    for (const [fichier, { statut, ecarts }] of comparaison) {
      assert.equal(statut, fichier === 'app.css' ? 'equivalent' : 'identique', `${fichier} : ${ecarts.join(' ; ')}`);
    }
    assert.equal(comparaison.size, 8);

    const { ignores: ignoresAttendus, ...rapportAttendu } = attendu.rapport;
    const { ignores: ignoresObtenus, ...rapportObtenu } = obtenu.rapport;
    assert.deepEqual(rapportObtenu, rapportAttendu);
    assert.equal(rapportObtenu.familles.length, 4);
    assert.equal(ignoresAttendus.length - ignoresObtenus.length, 2); // Number et Number 2, absents de l'export natif
    if (!palettes) assert.deepEqual([ignoresAttendus.length, ignoresObtenus.length], [357, 355]);
    assert.deepEqual(obtenu.rapport.familles.map((f) => f.apercu), attendu.rapport.familles.map((f) => f.apercu));
  });
}
