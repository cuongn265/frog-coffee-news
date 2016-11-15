import './polyfills.ts';
import * as jQuery from 'jquery';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/';

if (environment.production) {
  enableProdMode();
}

jQuery(() => platformBrowserDynamic().bootstrapModule(AppModule));
