import { DOCUMENT } from '@angular/common';
import { DestroyRef, Signal, computed, inject, signal } from '@angular/core';
import { THEMES } from '../theme/themes';
import { ThemeService } from '../theme/theme.service';

/**
 * Clé qui change dès que les valeurs CSS lues dans le DOM peuvent avoir changé : thème, mode, et,
 * en mode « système », préférence de couleur du système d'exploitation.
 *
 * À lire dans la phase `read` d'un `afterRenderEffect` : ThemeService pose les classes de `<html>`
 * dans un effet racine, le DOM doit être à jour avant la lecture (un `effect` ordinaire lirait
 * l'ancien thème).
 */
export function injectThemeKey(): Signal<string> {
  const service = inject(ThemeService);
  const query = inject(DOCUMENT).defaultView?.matchMedia('(prefers-color-scheme: dark)');
  const systemDark = signal(query?.matches ?? false);

  if (query) {
    const listener = (event: MediaQueryListEvent) => systemDark.set(event.matches);
    query.addEventListener('change', listener);
    inject(DestroyRef).onDestroy(() => query.removeEventListener('change', listener));
  }

  return computed(() => {
    const scheme = service.scheme();
    return `${service.theme()}|${scheme}|${scheme === 'system' ? systemDark() : ''}`;
  });
}

/** Vrai quand le thème courant est un thème du design system (les jetons `--app-*` y sont significatifs). */
export function injectIsDesignSystem(): Signal<boolean> {
  const service = inject(ThemeService);
  return computed(
    () => THEMES.find((theme) => theme.id === service.theme())?.group === 'design-system',
  );
}
