import { Component, OnInit } from '@angular/core';
import { Control } from '@angular/common';

import { Observable } from 'rxjs/Observable';

import { DeviceTypeDetectService } from '../services/device-type-detection.service';

@Component({
  selector: 'ts-textshot',
  templateUrl: 'app/textshot/textshot.template.html'
})
export class TSTextShotComponent implements OnInit {

  textShotInputControl = new Control();
  textShot: Object = {
    'text': '',
    'styles': {
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
    private _device: DeviceTypeDetectService
  ) {
    this.onMobile = this._device.device.is_mobile;
  }

  ngOnInit () {

    // TEXTSHOT IMAGE GENERATION WITH DEBOUNCE
    this.textShotInputControl.valueChanges
                        .debounceTime(1000)
                        // .distinctUntilChanged()
                        .subscribe(text => {

                          this.textShotIsGenerated = false;

                          if (text.trim() !== "") {
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

    this.textShotIsGenerated = false;
    this.previewText = "GENERATING IMAGE...";

    console.log('Text is now "' + this.textShot.text + '"');
    console.log('Style is now ' + JSON.stringify(this.textShot.styles));

    // JUST IN CASE
    // CATCH ANY CASE WHERE THERE'S NO TEXT
    if (this.textShot.text.trim() === '') {
      return;
    }

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
