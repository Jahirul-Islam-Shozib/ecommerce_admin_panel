import {
  ApplicationConfig,
  importProvidersFrom, inject,
  provideAppInitializer,
  provideZoneChangeDetection
} from '@angular/core';
import {provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling} from '@angular/router';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';

import {providePrimeNG} from 'primeng/config';
import {ConfirmationService, MessageService} from 'primeng/api';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SessionManagementService} from './security/session.management.service';
import {DefaultInterceptor} from './core/http/default.http.interceptor';
import Lara from '@primeng/themes/lara';

export function app_init() {
  const sessionService = inject(SessionManagementService);  // Inject the session service
  return sessionService.init();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }),
      withEnabledBlockingInitialNavigation()),
    provideHttpClient(withInterceptors([DefaultInterceptor])),
    MessageService,
    ConfirmationService,
    importProvidersFrom(BrowserAnimationsModule),
    // provideAppInitializer(app_init),
    provideAnimationsAsync(),
    providePrimeNG({ theme: { preset: Lara, options: { darkModeSelector: '.app-dark' } } })
  ]
};
