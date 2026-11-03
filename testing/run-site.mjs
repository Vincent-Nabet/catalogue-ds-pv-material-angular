// Teste le catalogue avec chaque jeu de tokens « passant » de testing/variantes/ :
// génère src/styles/themes-app depuis la variante, compile (ng build), sert dist/ et vérifie dans Chromium
// que le sélecteur de thème, les classes <html> et les variables CSS suivent les familles générées.
// À la fin, src/styles/themes-app est restauré (git checkout). Lancer d'abord : node testing/run-variantes.mjs
//   node testing/run-site.mjs [cas…]
import { execFileSync } from 'node:child_process';
import { createReadStream, existsSync, readFileSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const { chromium } = createRequire(import.meta.url)('playwright'); // Playwright global (ou devDependency)

const racine = resolve(fileURLToPath(new URL('.', import.meta.url)), '..');
const dist = join(racine, 'dist/poc-ds-isagri/browser');
const captures = join(racine, 'testing/captures');
const CAS = process.argv.slice(2).length > 0 ? process.argv.slice(2) : [
  'ref-identique', 'sans-monochrome', 'sans-contraste-eleve', 'clair-sombre-seulement', 'noms-renommes', 'abreviations-mc-hc',
  'famille-sepia-ajoutee', 'nouvelle-famille-info', 'mode-supplementaire', 'noms-francais-une-paire', 'noms-majuscules', 'fichiers-parasites',
];
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.woff2': 'font/woff2' };

const serveur = createServer((req, res) => {
  const chemin = join(dist, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  const fichier = existsSync(chemin) && statSync(chemin).isFile() ? chemin : join(dist, 'index.html');
  res.writeHead(200, { 'content-type': TYPES[extname(fichier)] ?? 'application/octet-stream' });
  createReadStream(fichier).pipe(res);
}).listen(4310);

const sh = (cmd, args) => execFileSync(cmd, args, { cwd: racine, encoding: 'utf8', stdio: 'pipe' });
const navigateur = await chromium.launch();
let echecs = 0;
const verdict = (ok, texte) => { if (!ok) echecs++; console.log(`   ${ok ? 'PASS' : 'FAIL'}  ${texte}`); };

try {
  for (const cas of CAS) {
    console.log(`\n■ ${cas}`);
    sh('node', ['scripts/themes/generer-themes.mjs', '--source', `testing/variantes/${cas}`, '--nom', 'app']);
    const manifeste = readFileSync(join(racine, 'src/styles/themes-app/familles.ts'), 'utf8');
    const familles = [...manifeste.matchAll(/id: '([^']+)', libelle: '([^']+)', apercu: '([^']+)', defaut: (true|false)/g)].map((m) => ({ id: m[1], libelle: m[2], apercu: m[3], defaut: m[4] === 'true' }));
    sh('npx', ['ng', 'build']);

    const erreurs = [];
    const page = await navigateur.newPage({ viewport: { width: 1280, height: 800 } });
    page.on('console', (m) => m.type() === 'error' && erreurs.push(m.text().slice(0, 120)));
    page.on('pageerror', (e) => erreurs.push(String(e).slice(0, 120)));

    // 1. Sélecteur : une entrée par famille générée, libellés conformes.
    await page.goto('http://localhost:4310/composants/bouton', { waitUntil: 'networkidle' });
    await page.getByRole('button', { name: /Thème :/ }).click();
    await page.waitForTimeout(300);
    await page.getByRole('menuitem', { name: /^Design system/ }).click();
    await page.waitForTimeout(400);
    const entrees = await page.locator('.mat-mdc-menu-panel [role^="menuitem"]').allTextContents();
    const nettoye = entrees.map((t) => t.replace(/\s+/g, ' ').trim());
    console.log(`   sélecteur : ${nettoye.join(' | ')}`);
    verdict(familles.every((f) => nettoye.some((t) => t.includes(f.libelle))), `${familles.length} famille(s) du design system présentes dans le sélecteur (${familles.map((f) => f.libelle).join(', ')})`);
    const absentes = ['Standard', 'Contraste moyen', 'Contraste élevé', 'Monochrome'].filter((l) => !familles.some((f) => f.libelle === l));
    verdict(absentes.every((l) => !nettoye.some((t) => t.includes(l))), `familles non générées absentes du sélecteur${absentes.length ? ` (${absentes.join(', ')})` : ''}`);
    await page.keyboard.press('Escape');

    // 2. Chaque famille × clair/sombre : classe sur <html>, primary résolu, aperçu cohérent.
    for (const famille of familles) {
      for (const scheme of ['light', 'dark']) {
        await page.addInitScript(([t, s]) => localStorage.setItem('catalogue-material-theme', JSON.stringify({ theme: t, scheme: s, density: 0 })), [famille.id, scheme]);
        await page.goto('http://localhost:4310/composants/bouton', { waitUntil: 'networkidle' });
        const r = await page.evaluate(() => {
          const s = getComputedStyle(document.documentElement);
          const bouton = document.querySelector('button[matButton="filled"], .mat-mdc-unelevated-button');
          return { classe: document.documentElement.className, primary: s.getPropertyValue('--md-sys-color-primary').trim(), mat: s.getPropertyValue('--mat-sys-primary').trim(), fond: bouton ? getComputedStyle(bouton).backgroundColor : null };
        });
        const attendu = new RegExp(`theme-${famille.id}\\b`);
        verdict(attendu.test(r.classe) && r.primary !== '' && r.mat !== '' && r.fond !== null, `${famille.id} ${scheme} : classe ok, primary ${r.primary.slice(0, 38)}, bouton ${r.fond}`);
        if (scheme === 'light') await page.screenshot({ path: join(captures, `${cas}-${famille.id}.png`) });
      }
    }
    verdict(erreurs.length === 0, `aucune erreur console${erreurs.length ? ' : ' + erreurs[0] : ''}`);
    await page.close();
  }
} finally {
  navigateur.close();
  serveur.close();
  sh('git', ['checkout', '--', 'src/styles/themes-app']);
  sh('git', ['clean', '-fdq', 'src/styles/themes-app']);
}
console.log(echecs === 0 ? '\nTous les cas sont conformes.' : `\n${echecs} écart(s).`);
process.exitCode = echecs === 0 ? 0 : 1;
