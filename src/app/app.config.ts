import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { AlreadyPressedPipe } from './Pipes/alreadyPressed.pipe';

export const appConfig: ApplicationConfig = {
  providers: [
    AlreadyPressedPipe,
    provideRouter(routes)
  ]
};
