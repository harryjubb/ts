// Import dependencies

// import 'zone.js';
// import 'reflect-metadata';
// import 'es6-shim';

// Add all operators to Observables
import 'rxjs/Rx';

import { bootstrap }    from '@angular/platform-browser-dynamic';
import { TSAppComponent } from './app.component';

import { ColorPickerService } from './color-picker/color-picker.service';

bootstrap(TSAppComponent, [ColorPickerService]);
