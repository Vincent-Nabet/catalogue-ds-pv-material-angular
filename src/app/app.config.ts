import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {
  ApplicationConfig,
  LOCALE_ID,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatIconRegistry } from '@angular/material/icon';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

registerLocaleData(localeFr);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideNativeDateAdapter(),
    { provide: LOCALE_ID, useValue: 'fr' },
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
    provideAppInitializer(() => {
      inject(MatIconRegistry).setDefaultFontSetClass('material-symbols-outlined');
    }),
  ],
};
