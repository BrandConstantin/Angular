import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { registerLocaleData } from '@angular/common';
import localEs from '@angular/common/locales/es';
import localRo from '@angular/common/locales/ro';
import { LocalService } from './service/local.service';

registerLocaleData(localRo, 'ro');
registerLocaleData(localEs, 'es');

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    {
      provide: LOCALE_ID,
      //useValue: 'es-ES',
      deps: [LocalService],
      useFactory: (localService: LocalService) => localService.getLocale,
    }
  ]
};
