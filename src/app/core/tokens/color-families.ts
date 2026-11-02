import { Signal, computed, inject } from '@angular/core';
import { ColorFamily, detectedColorFamilies } from './color-roles';
import { injectIsDesignSystem } from './theme-key';
import { TokenCatalog } from './token-catalog';

/**
 * Variables intermédiaires d'une famille `--app-color-<id>`, nommées comme celles des rôles M3 de la
 * page Bouton (`roles.button`) : une classe de page (`.perso`) les lit une seule fois, quelle que
 * soit la famille, puisque la liste des familles est détectée et non écrite dans le code.
 */
export function familyVariables(id: string): Record<string, string> {
  return {
    '--r-f': `var(--app-color-${id})`,
    '--r-sf': `var(--app-color-on-${id})`,
    '--r-c': `var(--app-color-${id}-container)`,
    '--r-sc': `var(--app-color-on-${id}-container)`,
  };
}

/**
 * Familles de couleur complètes du design system (`--app-color-*`) à présenter sur une page de
 * composant. Seul un thème Design system les porte : avec un thème Angular Material la liste est
 * vide (la page masque alors sa section « Couleurs personnalisées »).
 */
export function injectColorFamilies(): Signal<ColorFamily[]> {
  const catalog = inject(TokenCatalog);
  const designSystem = injectIsDesignSystem();
  return computed(() => {
    const names = catalog.names();
    return designSystem() && names ? detectedColorFamilies(names) : [];
  });
}
