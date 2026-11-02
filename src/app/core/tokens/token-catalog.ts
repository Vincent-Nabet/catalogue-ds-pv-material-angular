import { DOCUMENT } from '@angular/common';
import { Service, afterRenderEffect, inject, signal } from '@angular/core';
import { DS_PREFIX } from './color-roles';
import { declaredProperties } from './discover-tokens';
import { injectThemeKey } from './theme-key';

const sameNames = (a: ReadonlySet<string> | null, b: ReadonlySet<string> | null): boolean =>
  a === b || (a !== null && b !== null && a.size === b.size && [...a].every((name) => b.has(name)));

/**
 * Variables `--app-*` déclarées dans le CSS chargé (union de tous les thèmes), relues à chaque
 * changement de thème : une feuille pas encore chargée au premier passage est reprise ensuite.
 * `null` tant qu'aucune n'a été trouvée : un résultat vide n'est pas mémorisé, pour ne pas prendre
 * un chargement en cours pour une absence de jetons.
 */
@Service()
export class TokenCatalog {
  private readonly document = inject(DOCUMENT);
  private readonly themeKey = injectThemeKey();
  private readonly found = signal<ReadonlySet<string> | null>(null, { equal: sameNames });

  readonly names = this.found.asReadonly();

  constructor() {
    afterRenderEffect({
      read: () => {
        this.themeKey();
        const names = declaredProperties(Array.from(this.document.styleSheets), DS_PREFIX);
        if (names.size > 0) {
          this.found.set(names);
        }
      },
    });
  }
}
