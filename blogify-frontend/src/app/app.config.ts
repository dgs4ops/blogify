import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withInMemoryScrolling,
  withPreloading,
} from '@angular/router';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideFuse } from '@fuse/fuse.provider';
import { ArticleApiClientService, AuthorApiClientService, blogifyApiInterceptor } from './services';
import { MarkdownModule } from 'ngx-markdown';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from './environments/environment';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { BlogifyApiInterceptor } from './services/api.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([blogifyApiInterceptor])),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BlogifyApiInterceptor,
    },
    AuthorApiClientService,
    ArticleApiClientService,
    importProvidersFrom(
      MarkdownModule.forRoot(),
      provideFirebaseApp(() => initializeApp(environment.firebase)),
      provideAuth(() => getAuth()),
    ),
    provideAnimationsAsync(),
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
    ),
    provideFuse({
      fuse: {
        layout: 'classy',
        scheme: 'light',
        screens: {
          sm: '600px',
          md: '960px',
          lg: '1280px',
          xl: '1440px',
        },
        theme: 'theme-default',
        themes: [
          {
            id: 'theme-default',
            name: 'Default',
          },
          {
            id: 'theme-brand',
            name: 'Brand',
          },
          {
            id: 'theme-teal',
            name: 'Teal',
          },
          {
            id: 'theme-rose',
            name: 'Rose',
          },
          {
            id: 'theme-purple',
            name: 'Purple',
          },
          {
            id: 'theme-amber',
            name: 'Amber',
          },
        ],
      },
    })
  ],
};
