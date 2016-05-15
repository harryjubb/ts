import {Injectable} from '@angular/core';

// DEVICE TYPE DETECTION WITH WURFL
declare var WURFL: any;

@Injectable()
export class DeviceTypeDetectService {

  device = WURFL;

}
