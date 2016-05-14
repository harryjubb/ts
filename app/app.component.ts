import { Component } from '@angular/core';

import { DeviceTypeDetectService } from './services/device-type-detection.service';

import { TSTextShotComponent } from './textshot/textshot.component';

@Component({
  selector: 'ts-app',
  templateUrl: 'app/app.template.html',
  directives: [
    TSTextShotComponent
  ],
  providers: [
    DeviceTypeDetectService
  ]
})
export class TSAppComponent {

  isMobile: boolean = false;

  constructor (
    private _device: DeviceTypeDetectService
  ) {
    this.isMobile = _device.device.is_mobile;
  }

}
