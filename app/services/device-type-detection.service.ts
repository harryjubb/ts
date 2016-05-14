import {Injectable} from 'angular2/core';

// DEVICE TYPE DETECTION WITH WURFL
declare var WURFL: any;

@Injectable()
export class DeviceTypeDetectService {

  device = WURFL;

}
