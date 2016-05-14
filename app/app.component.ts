import { Component } from '@angular/core';

import { TSTextShotComponent } from './textshot/textshot.component';

@Component({
  selector: 'ts-app',
  templateUrl: 'app/app.template.html',
  directives: [
    TSTextShotComponent
  ]
})
export class TSAppComponent { }
