import assert from 'node:assert/strict';
import { test } from 'node:test';
import { aplatir, resoudre, resoudreMode } from './resoudre-tokens.mjs';

const jeton = (valeur, type = 'color') => ({ $type: type, $value: valeur });

test('aplatir : chemins séparés par des points, espaces conservés', () => {
  const tokens = aplatir({ Colors: { 'Surface Tint': jeton('#fff'), Neutral: { 0: jeton('#000') } } });
  assert.deepEqual([...tokens.keys()], ['Colors.Surface Tint', 'Colors.Neutral.0']);
  assert.equal(tokens.get('Colors.Neutral.0').brut, '#000');
});

test('aplatir : refuse une clé contenant un point', () => {
  assert.throws(() => aplatir({ 'a.b': jeton('#fff') }), /point est réservé/);
});

test('résoudre : littéral, alias simple et alias chaîné', () => {
  const primitives = aplatir({ P: { a: jeton('#111111') } });
  const semantiques = aplatir({ S: { x: jeton('{P.a}'), y: jeton('{S.x}'), z: jeton('{S.y}'), lit: jeton('#222222') } });
  const resolus = resoudre(semantiques, primitives);
  assert.equal(resolus.get('S.x').valeur, '#111111');
  assert.equal(resolus.get('S.z').valeur, '#111111');
  assert.equal(resolus.get('S.z').brut, '{S.y}');
  assert.equal(resolus.get('S.lit').valeur, '#222222');
});

test('résoudre : alias absent = erreur nommant le token fautif', () => {
  const tokens = aplatir({ S: { x: jeton('{S.inconnu}') } });
  assert.throws(() => resoudre(tokens), /token absent : « S\.inconnu » \(référencé par S\.x\)/);
});

test('résoudre : cycle = erreur', () => {
  const tokens = aplatir({ S: { a: jeton('{S.b}'), b: jeton('{S.c}'), c: jeton('{S.a}') } });
  assert.throws(() => resoudre(tokens), /Cycle d'alias : S\.a → S\.b → S\.c → S\.a/);
});

test('résoudre : les nombres ne sont pas des alias', () => {
  const resolus = resoudre(aplatir({ W: { regular: jeton(400, 'fontWeight') } }));
  assert.equal(resolus.get('W.regular').valeur, 400);
});

test('résoudreMode : primitives et sémantiques, collision refusée', () => {
  const primitives = { Colors: { Olive: { 'Shade-012': jeton('#86A315') } } };
  const semantique = { Colors: { Schemes: { Primary: jeton('{Colors.Olive.Shade-012}') } } };
  const { semantiques } = resoudreMode(primitives, semantique, 'light');
  assert.equal(semantiques.get('Colors.Schemes.Primary').valeur, '#86A315');
  assert.throws(() => resoudreMode(primitives, primitives, 'light'), /à la fois dans les primitives/);
});
