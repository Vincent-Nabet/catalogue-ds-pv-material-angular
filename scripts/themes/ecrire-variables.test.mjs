import assert from 'node:assert/strict';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, statSync, utimesSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { after, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import * as sass from 'sass';
import { classer } from './correspondance.mjs';
import { ecrireFichiers } from './ecrire-fichiers.mjs';
import { detecterFamilles } from './familles.mjs';
import { formater, genererVariables, selecteurFamille } from './ecrire-variables.mjs';
import { lireSource } from './lire-source.mjs';
import { resoudreMode } from './resoudre-tokens.mjs';

const source = lireSource(fileURLToPath(new URL('../../tokens', import.meta.url)));
const { fichiers, variables, rapport } = genererVariables(source, { nom: 'app' });
const FAMILLES = rapport.familles;
const temp = mkdtempSync(join(tmpdir(), 'themes-variables-'));
after(() => rmSync(temp, { recursive: true, force: true }));

/** Déclarations `--x: valeur;` du bloc dont le sélecteur est `selecteur`. */
function declarationsDe(css, selecteur) {
  const debut = css.indexOf(`\n${selecteur} {\n`) >= 0 ? css.indexOf(`\n${selecteur} {\n`) + 1 : css.startsWith(`${selecteur} {\n`) ? 0 : -1;
  assert.ok(debut >= 0, `bloc « ${selecteur} » introuvable`);
  const corps = css.slice(debut, css.indexOf('\n}', debut));
  return new Map([...corps.matchAll(/^ {2}(--[\w-]+): (.*);$/gm)].map((m) => [m[1], m[2]]));
}

test('fichiers produits', () => {
  assert.deepEqual([...fichiers.keys()], ['index.css', 'md3/ref.css', 'md3/sys.css', 'md3/couleurs.css', 'app.css']);
  assert.match(fichiers.get('index.css'), /@import 'md3\/couleurs\.css';/);
});

test('chaque fichier est du CSS valide', () => {
  for (const [chemin, corps] of fichiers) {
    assert.doesNotThrow(() => sass.compileString(corps, { syntax: 'css' }), chemin);
  }
});

test('primary clair standard = #86A315', () => {
  const standard = declarationsDe(fichiers.get('md3/couleurs.css'), ':root, .theme-app');
  assert.equal(standard.get('--md-sys-color-primary'), 'light-dark(#86A315, #BCD078)');
});

test('chaque couleur résolue des 8 modes se retrouve au bon endroit', () => {
  const resolus = Object.fromEntries(
    Object.entries(source.semantiques).map(([mode, json]) => [mode, resoudreMode(source.primitives, json, mode).semantiques]),
  );
  let verifiees = 0;
  for (const famille of FAMILLES) {
    const md3 = declarationsDe(fichiers.get('md3/couleurs.css'), selecteurFamille(famille, 'app'));
    const app = declarationsDe(fichiers.get('app.css'), selecteurFamille(famille, 'app'));
    assert.equal(md3.size, 49, famille.id);
    for (const [chemin, clair] of resolus[famille.clair]) {
      if (clair.type !== 'color' || chemin.startsWith('Colors.State Layers.')) continue;
      const sombre = resolus[famille.sombre].get(chemin).valeur;
      const attendu = clair.valeur.toLowerCase() === sombre.toLowerCase() ? clair.valeur : `light-dark(${clair.valeur}, ${sombre})`;
      const { variable } = classer(chemin, 'app');
      assert.equal(md3.get(variable) ?? app.get(variable), attendu, `${famille.id} ${chemin}`);
      verifiees++;
    }
  }
  assert.equal(verifiees, 4 * 63 + 4 * 1);
});

test('typographie, formes, opacités et espacements', () => {
  const sys = fichiers.get('md3/sys.css');
  const racine = declarationsDe(sys, ':root');
  assert.ok(racine.size > 0);
  assert.match(sys, /--md-sys-typescale-body-large-size: 16px;/);
  assert.match(sys, /--md-sys-typescale-title-medium-tracking: 0\.15px;/);
  assert.match(sys, /--md-sys-typescale-body-small-tracking: 0\.4px;/);
  assert.match(sys, /--md-sys-typescale-label-large-weight-prominent: 600;/);
  assert.match(sys, /--md-sys-shape-corner-extra-large: 28px;/);
  assert.match(sys, /--md-sys-state-hover-state-layer-opacity: 0\.08;/);
  assert.match(fichiers.get('md3/ref.css'), /--md-ref-typeface-brand: Poppins;/);
  assert.match(fichiers.get('app.css'), /--app-spacing-medium: 16px;/);
  assert.match(fichiers.get('app.css'), /--app-shape-corner-extra-extra-large: 48px;/);
  assert.match(fichiers.get('app.css'), /--app-typescale-emphasized-body-large-weight: 500;/);
  assert.doesNotMatch(sys, /0000000/);
});

test('rapport : comptes', () => {
  assert.deepEqual(rapport.inconnus, []);
  assert.equal(rapport.ignores.filter((i) => i.chemin.startsWith('Colors.State Layers.')).length, 147);
  assert.ok(variables.has('--md-sys-color-primary') && variables.has('--app-color-success'));
});

test('--nom pv : aucune occurrence de « app » dans la sortie', () => {
  const { fichiers: pv } = genererVariables(source, { nom: 'pv', palettes: true });
  assert.ok(pv.has('pv.css') && !pv.has('app.css'));
  for (const [chemin, corps] of pv) assert.doesNotMatch(corps, /\bapp\b|-app-/, chemin);
  assert.match(pv.get('md3/ref.css'), /--pv-ref-olive-012: #86A315;/);
});

test('--palettes absent : pas de primitives de palette', () => {
  assert.doesNotMatch(fichiers.get('md3/ref.css'), /-ref-olive/);
});

test('tokens non couleur différents selon le mode = erreur explicite', () => {
  const copie = structuredClone(source);
  copie.semantiques.dark.Typescale.Static['Body Large'].Size.$value = '17px';
  assert.throws(() => genererVariables(copie, { nom: 'app' }), /valeurs non couleur[^]*identiques[^]*dark : --md-sys-typescale-body-large-size = 17px/);
});

test('famille incomplète (clair sans sombre) = erreur explicite', () => {
  const copie = structuredClone(source);
  delete copie.semantiques['monochrome-dt'];
  assert.throws(() => genererVariables(copie, { nom: 'app' }), /Famille incomplète : « monochrome-lt » n'a pas de mode sombre/);
});

test('familles détectées : jeu complet, familles en moins, noms différents', () => {
  const resume = (noms) => detecterFamilles(noms).familles.map((f) => `${f.suffixe || 'standard'}${f.defaut ? '*' : ''}`).join(' ');
  assert.equal(resume(Object.keys(source.semantiques)), 'standard* contraste-moyen contraste-eleve monochrome');
  assert.equal(resume(['light', 'dark']), 'standard*');
  assert.equal(resume(['dark', 'light', 'light-high-contrast', 'dark-high-contrast']), 'standard* contraste-eleve');
  assert.equal(resume(['theme-light', 'theme-dark', 'theme-light-mc', 'theme-dark-mc', 'theme-clair-sepia', 'theme-sombre-sepia']), 'standard* contraste-moyen sepia');
  assert.equal(resume(['marque-clair', 'marque-sombre']), 'standard*');
  assert.equal(resume(['a-light', 'a-dark', 'b-light', 'b-dark']), 'a* b');
  assert.deepEqual(detecterFamilles(['light', 'dark', 'brand-extra']).ignores, ['brand-extra']);
  assert.throws(() => detecterFamilles(['brand', 'extra']), /Aucune paire clair\/sombre reconnue/);
  assert.throws(() => detecterFamilles(['light', 'Light', 'dark']), /ambigus/);
});

test('une seule paire clair/sombre : sortie valide, sans bloc de contraste', () => {
  const copie = structuredClone(source);
  for (const mode of Object.keys(copie.semantiques)) if (mode !== 'light' && mode !== 'dark') delete copie.semantiques[mode];
  const { fichiers: f, rapport: r } = genererVariables(copie, { nom: 'app' });
  assert.equal(r.familles.length, 1);
  assert.doesNotMatch(f.get('md3/couleurs.css'), /contraste|monochrome/);
  assert.match(f.get('md3/couleurs.css'), /:root, \.theme-app \{/);
});

test('formater : dimensions, familles, graisses', () => {
  assert.equal(formater('dimension', '0.15000000596046448px'), '0.15px');
  assert.equal(formater('dimension', '-0.25px'), '-0.25px');
  assert.equal(formater('dimension', '1000px'), '1000px');
  assert.equal(formater('fontFamily', 'Poppins'), 'Poppins');
  assert.equal(formater('fontFamily', 'Open Sans'), '"Open Sans"');
  assert.equal(formater('fontWeight', 400), '400');
});

test('ecrireFichiers : idempotent, supprime les fichiers périmés, refuse un dossier étranger', () => {
  const sortie = join(temp, 'sortie');
  const jeu = new Map([['a.css', ':root {}\n'], ['sous/b.css', ':root {}\n']]);
  const premier = ecrireFichiers(sortie, jeu, 'tokens', '2026-01-01');
  assert.deepEqual(premier.ecrits, ['a.css', 'sous/b.css']);
  assert.match(readFileSync(join(sortie, 'a.css'), 'utf8'), /^\/\* Fichier généré par `npm run themes` — ne pas modifier\.\n \* Source : tokens — 2026-01-01 \*\/\n\n:root \{\}\n$/);

  utimesSync(join(sortie, 'a.css'), new Date(2020, 0, 1), new Date(2020, 0, 1));
  const fige = statSync(join(sortie, 'a.css')).mtimeMs;
  const second = ecrireFichiers(sortie, jeu, 'autre.zip', '2026-02-02');
  assert.deepEqual(second.ecrits, []);
  assert.deepEqual(second.inchanges, ['a.css', 'sous/b.css']);
  assert.equal(statSync(join(sortie, 'a.css')).mtimeMs, fige);
  assert.match(readFileSync(join(sortie, 'a.css'), 'utf8'), /2026-01-01/);

  // Fins de ligne CRLF (checkout Windows) : toujours inchangé.
  writeFileSync(join(sortie, 'a.css'), readFileSync(join(sortie, 'a.css'), 'utf8').replaceAll('\n', '\r\n'));
  assert.deepEqual(ecrireFichiers(sortie, jeu, 'tokens', '2026-02-02').ecrits, []);

  const modifie = ecrireFichiers(sortie, new Map([['a.css', ':root { --x: 1; }\n']]), 'tokens', '2026-03-03');
  assert.deepEqual(modifie.ecrits, ['a.css']);
  assert.deepEqual(modifie.supprimes, ['sous/b.css']);
  assert.equal(existsSync(join(sortie, 'sous')), false);

  writeFileSync(join(sortie, 'notes.md'), 'à moi');
  const etranger = ecrireFichiers(sortie, new Map([['a.css', ':root { --x: 1; }\n']]), 'tokens', '2026-03-03');
  assert.deepEqual(etranger.etrangers, ['notes.md']);
  assert.equal(readFileSync(join(sortie, 'notes.md'), 'utf8'), 'à moi');

  const autre = join(temp, 'autre');
  mkdirSync(autre);
  writeFileSync(join(autre, 'perso.txt'), 'important');
  assert.throws(() => ecrireFichiers(autre, jeu, 'tokens'), /aucun fichier généré/);
  assert.equal(readFileSync(join(autre, 'perso.txt'), 'utf8'), 'important');
});

test('manifeste familles.ts et classes SCSS suivent les familles générées', async () => {
  const { genererManifeste } = await import('./ecrire-manifeste.mjs');
  const manifeste = genererManifeste({ nom: 'app', familles: rapport.familles });
  assert.match(manifeste, /\{ id: 'app', libelle: 'Standard', apercu: '#86a315', defaut: true, progression: true \}/);
  assert.match(manifeste, /\{ id: 'app-contraste-moyen', libelle: 'Contraste moyen', apercu: '#657c08', defaut: false, progression: true \}/);
  assert.match(manifeste, /\{ id: 'app-monochrome', libelle: 'Monochrome', apercu: '#1a1a1a', defaut: false, progression: false \}/);
  const copie = structuredClone(source);
  for (const mode of Object.keys(copie.semantiques)) if (mode !== 'light' && mode !== 'dark') delete copie.semantiques[mode];
  const seule = genererManifeste({ nom: 'pv', familles: genererVariables(copie, { nom: 'pv' }).rapport.familles });
  assert.equal(seule.match(/id: '/g).length, 1);
  assert.match(seule, /id: 'pv'/);
});
