import { definePreview } from '@storybook/angular-vite';
import addonA11y from '@storybook/addon-a11y';
import addonDocs from '@storybook/addon-docs';
import { DEFAULT_THEME_ID, DENSITIES, SCHEMES, THEMES } from '../src/app/core/theme/themes';

/**
 * Les feuilles globales (`src/styles.scss`, thème du design system) sont chargées par le builder via le target
 * `build` d'angular.json. Le thème, le mode et la densité sont portés par des classes sur `<html>`, comme le fait
 * `ThemeService` dans le catalogue : la barre d'outils les pose sur le document de l'aperçu.
 */
function appliquerTheme(theme: string, scheme: string, density: string): void {
  const classes = document.documentElement.classList;
  classes.remove(
    ...THEMES.map((t) => `theme-${t.id}`),
    ...SCHEMES.map((s) => `scheme-${s.id}`),
    ...DENSITIES.map((d) => `density-${d}`),
  );
  classes.add(`theme-${theme}`, `scheme-${scheme}`, `density-${density}`);
}

export default definePreview({
  addons: [addonA11y(), addonDocs()],
  initialGlobals: { theme: DEFAULT_THEME_ID, scheme: 'light', density: '0' },
  globalTypes: {
    theme: {
      description: 'Thème du catalogue',
      toolbar: {
        title: 'Thème',
        icon: 'paintbrush',
        dynamicTitle: true,
        items: THEMES.map((t) => ({ value: t.id, title: t.label })),
      },
    },
    scheme: {
      description: 'Mode clair ou sombre',
      toolbar: {
        title: 'Mode',
        icon: 'mirror',
        dynamicTitle: true,
        items: SCHEMES.map((s) => ({ value: s.id, title: s.label })),
      },
    },
    density: {
      description: 'Densité',
      toolbar: {
        title: 'Densité',
        icon: 'grid',
        dynamicTitle: true,
        items: DENSITIES.map((d) => ({ value: String(d), title: `Densité ${d}` })),
      },
    },
  },
  decorators: [
    (story, context) => {
      const { theme, scheme, density } = context.globals;
      appliquerTheme(theme, scheme, density);
      return story();
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
});
