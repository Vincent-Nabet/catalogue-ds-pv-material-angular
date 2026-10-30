// Utilitaires communs aux scripts de vérification (a11y.mjs, captures.mjs).
import { execSync, spawn } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

export const racine = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const CLE_STOCKAGE = 'catalogue-material-theme';
const PORT = process.env['PORT'] ?? '4300';

/** Convertit une option « a,b,c » en tableau (ou la valeur par défaut). */
export function liste(valeur, parDefaut) {
  return valeur ? valeur.split(',').map((v) => v.trim()).filter(Boolean) : parDefaut;
}

/** Identifiants des thèmes, lus dans `themes.ts` pour rester synchronisés. */
export function themesDisponibles() {
  const source = readFileSync(resolve(racine, 'src/app/core/theme/themes.ts'), 'utf8');
  const type = source.match(/type ThemeId = ([^;]+);/)?.[1] ?? '';
  return [...type.matchAll(/'([^']+)'/g)].map((m) => m[1]);
}

/** Identifiants des pages de composants, lus dans le registre. */
export function routesComposants() {
  const source = readFileSync(resolve(racine, 'src/app/core/catalog/catalog.registry.ts'), 'utf8');
  return [...source.matchAll(/\{\s*id: '([^']+)',\s*label: '[^']*',\s*category:/g)].map(
    (m) => `composants/${m[1]}`,
  );
}

/** Accueil + toutes les pages, ou la sélection demandée (ex. « bouton,carte »). */
export function resoudreRoutes(selection) {
  const toutes = ['', ...routesComposants()];
  if (!selection) return toutes;
  return selection.map((r) => {
    const route = r === 'accueil' ? '' : r.replace(/^\/+/, '').replace(/^(?!composants\/)(.+)$/, 'composants/$1');
    if (!toutes.includes(route)) {
      throw new Error(`Route inconnue : « ${r} ». Valeurs possibles : accueil, ${routesComposants().map((x) => x.slice(11)).join(', ')}`);
    }
    return route;
  });
}

function cheminNavigateur() {
  const candidats = [
    process.env['CHROME_PATH'],
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
  ].filter(Boolean);
  const trouve = candidats.find((c) => existsSync(c));
  if (!trouve) {
    throw new Error('Chrome introuvable. Définir la variable CHROME_PATH vers un exécutable Chrome ou Chromium.');
  }
  return trouve;
}

export function lancerNavigateur() {
  return puppeteer.launch({ executablePath: cheminNavigateur(), headless: true, args: ['--no-sandbox'] });
}

async function repond(url) {
  try {
    const reponse = await fetch(url, { signal: AbortSignal.timeout(2000) });
    return reponse.ok;
  } catch {
    return false;
  }
}

/**
 * Exécute `action(baseUrl)` avec un serveur disponible :
 * - `BASE_URL` défini : utilise ce serveur (erreur s'il ne répond pas) ;
 * - sinon, réutilise `http://localhost:<PORT>` s'il répond, ou démarre `ng serve` puis l'arrête.
 */
export async function avecServeur(action) {
  const imposee = process.env['BASE_URL'];
  const baseUrl = imposee ?? `http://localhost:${PORT}`;
  if (await repond(baseUrl)) {
    return action(baseUrl);
  }
  if (imposee) {
    throw new Error(`Aucun serveur ne répond sur ${baseUrl}.`);
  }

  console.log(`Démarrage de ng serve sur le port ${PORT}…`);
  const serveur = spawn(`npx ng serve --port ${PORT}`, {
    cwd: racine,
    shell: true,
    stdio: 'ignore',
    detached: process.platform !== 'win32',
  });
  const arreter = () => {
    try {
      if (process.platform === 'win32') {
        execSync(`taskkill /pid ${serveur.pid} /T /F`, { stdio: 'ignore' });
      } else {
        process.kill(-serveur.pid);
      }
    } catch {
      // déjà arrêté
    }
  };
  process.on('exit', arreter);

  try {
    const limite = Date.now() + 180_000;
    while (!(await repond(baseUrl))) {
      if (Date.now() > limite) throw new Error('ng serve ne répond pas après 3 minutes.');
      await new Promise((r) => setTimeout(r, 1000));
    }
    return await action(baseUrl);
  } finally {
    arreter();
  }
}

/**
 * Ouvre une page dont le thème, le mode et la densité sont fixés avant le chargement
 * (comme le ferait le `localStorage` d'un utilisateur). Les erreurs console sont collectées.
 */
export async function ouvrirPage(navigateur, { theme, scheme, density = 0, width = 1280, height = 900 }) {
  const page = await navigateur.newPage();
  await page.setViewport({ width, height });
  await page.evaluateOnNewDocument(
    (cle, valeur) => localStorage.setItem(cle, valeur),
    CLE_STOCKAGE,
    JSON.stringify({ theme, scheme, density }),
  );
  const erreurs = [];
  page.on('console', (message) => {
    if (['error', 'warning'].includes(message.type())) erreurs.push(`[${message.type()}] ${message.text().slice(0, 300)}`);
  });
  page.on('pageerror', (erreur) => erreurs.push(`[pageerror] ${erreur.message}`));
  return { page, erreurs };
}

/** Charge une route et attend que la page soit stable (titre, polices, animation d'apparition). */
export async function charger(page, baseUrl, route) {
  await page.goto(`${baseUrl}/${route}`, { waitUntil: 'networkidle0' });
  await page.waitForSelector('main h1');
  await page.evaluate(() => document.fonts.ready);
  await new Promise((r) => setTimeout(r, 400));
}
