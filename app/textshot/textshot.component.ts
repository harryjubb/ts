import { Component, OnInit } from '@angular/core';
import { Control } from '@angular/common';

import { Observable } from 'rxjs/Observable';

import { DeviceTypeDetectService } from '../services/device-type-detection.service';
// import { TwitterService } from '../services/twitter.service';

@Component({
  selector: 'ts-textshot',
  templateUrl: 'app/textshot/textshot.template.html'
})
export class TSTextShotComponent implements OnInit {

  textShotInputControl = new Control();
  textShot: Object = {
    'text': '',
    'style': {
      'background-color': '#DE84C9'
    }
  };
  textShotIsGenerated: boolean = false;
  textShotPNGUrl: string = "";
  textShotPNGOctetUrl: string = "";
  textShotPNGBlobUrl: string = "";
  previewText: string = "PREVIEW";

  onMobile: boolean = false;

  constructor (
    private _device: DeviceTypeDetectService //,
    // private _twitter: TwitterService
  ) {
    this.onMobile = this._device.device.is_mobile;

    // var _token = this._twitter.requestToken()
    //                           .subscribe(token => console.log(token));
    //
    // console.log(_token);

  }

  ngOnInit () {

    // TEXTSHOT IMAGE GENERATION WITH DEBOUNCE
    this.textShotInputControl.valueChanges
                        .debounceTime(1000)
                        // .distinctUntilChanged()
                        .subscribe(text => {

                          this.textShotIsGenerated = false;

                          if (text !== "") {
                            this.textShot.text = text;
                            this.generateTextShotImage();
                          } else {
                            this.textShot.text = "";
                          }

                        });

  }

  textShotTextAreaWasChanged () {

    this.textShotIsGenerated = false;
    this.previewText = "PREVIEW";

  }

  generateTextShotImage () {

    console.log('Changed to ' + this.textShot.text);

    this.previewText = "GENERATING IMAGE...";

    var base = this;

    // GENERATE IMAGE
    html2canvas(document.getElementById('textshot-div'), {
        onrendered: function(canvas) {

            // CANVAS IS THE FINAL RENDERED <CANVAS> ELEMENT
            base.previewText= "TEXTSHOT GENERATED!";
            base.textShotPNGUrl = canvas.toDataURL(); // PNG BY DEFAULT
            base.textShotPNGOctetUrl = base.textShotPNGUrl.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
            base.textShotIsGenerated = true;

        }
    });

  }

  downloadTextShotImage () {
    console.log('Downloading...');
    var url = this.textShotPNGUrl.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
    // var url = this.textShotPNGUrl;
    window.open(url);
  }

}
