// import { Angulartics2GoogleAnalytics } from 'angulartics2/src/providers/angulartics2-google-analytics';
// import { Angulartics2 } from 'angulartics2/src/core/angulartics2';
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
    // Angulartics2GoogleAnalytics,
    DeviceTypeDetectService
  ]
})
export class TSAppComponent {

  isMobile: boolean = false;

  constructor (
    // angulartics2: Angulartics2,
    // angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics,
    private _device: DeviceTypeDetectService
  ) {
    this.isMobile = _device.device.is_mobile;
  }

}
