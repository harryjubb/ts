// Import dependencies

// import 'zone.js';
// import 'reflect-metadata';
// import 'es6-shim';

// Add all operators to Observables
import 'rxjs/Rx';

import { bootstrap }    from '@angular/platform-browser-dynamic';

// import { ROUTER_PROVIDERS } from '@angular/router';
// import { Angulartics2 } from 'angulartics2/src/core/angulartics2';

import { TSAppComponent } from './app.component';

import { ColorPickerService } from './color-picker/color-picker.service';

bootstrap(TSAppComponent, [
  // ROUTER_PROVIDERS,
  // Angulartics2,
  ColorPickerService
]);
