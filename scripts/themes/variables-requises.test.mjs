import assert from 'node:assert/strict';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { classer, variablesCustomAttendues, variablesRequises } from './correspondance.mjs';
import { genererVariables } from './ecrire-variables.mjs';
import { lireSource } from './lire-source.mjs';

const source = lireSource(fileURLToPath(new URL('../../tokens', import.meta.url)));
const { variables } = genererVariables(source, { nom: 'app' });

test('variablesRequises : 49 rôles, 15 styles × 5, 7 rayons, 1 police = 132', () => {
  const requises = variablesRequises();
  assert.equal(requises.filter((v) => v.variable.startsWith('--md-sys-color-')).length, 49);
  assert.equal(requises.filter((v) => v.variable.startsWith('--md-sys-typescale-')).length, 15 * 5);
  assert.equal(requises.filter((v) => v.variable.startsWith('--md-sys-shape-corner-')).length, 7);
  assert.equal(requises.filter((v) => v.variable === '--md-ref-typeface-plain').length, 1);
  assert.equal(requises.length, 132);
  assert.equal(new Set(requises.map((v) => v.variable)).size, 132);
});

test('variablesRequises : le token indiqué est bien celui que la correspondance associe à la variable', () => {
  for (const { variable, token } of variablesRequises()) {
    const classement = classer(token, 'app');
    assert.equal(classement.cible, 'md3', token);
    assert.equal(classement.variable, variable, token);
  }
});

test('variablesRequises : tokens/ n\'en manque aucune', () => {
  assert.deepEqual(variablesRequises().filter((v) => !variables.has(v.variable)), []);
});

test('variablesCustomAttendues : 41 variables, correspondance réciproque, aucune absente de tokens/', () => {
  const attendues = variablesCustomAttendues('app');
  assert.equal(attendues.length, 41);
  for (const { variable, token } of attendues) {
    const classement = classer(token, 'app');
    assert.equal(classement.cible, 'custom', token);
    assert.equal(classement.variable, variable, token);
  }
  assert.deepEqual(attendues.filter((v) => !variables.has(v.variable)), []);
});
