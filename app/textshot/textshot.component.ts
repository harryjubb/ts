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
      'font-family': 'Helvetica',
      'font-size': '24pt',
      'color': 'black',
      'background-color': '#eee',
      'background-image': 'none',
      'font-weight': 'normal',
      'font-style': 'normal',
      'text-decoration': 'none',
      'text-align': 'left'
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

  regenerateTextShotImage () {

    this.textShotIsGenerated = false;
    var base = this;

    // MANUAL DEBOUNCE DELAY
    // A BIT HACKY(!)
    window.setTimeout(function () {
      base.generateTextShotImage();
    }, 100);

  }

  generateTextShotImage () {

    this.textShotIsGenerated = false;
    this.previewText = "GENERATING IMAGE...";

    console.log('Text is now "' + this.textShot.text + '"');
    console.log('Style is now ' + JSON.stringify(this.textShot.styles));

    // JUST IN CASE
    // CATCH ANY CASE WHERE THERE'S NO TEXT
    if (this.textShot.text.trim() === '') {
      console.log('Empty text');
      return;
    }

    var base = this;

    // GENERATE IMAGE
    html2canvas(document.getElementById('textshot-div'), {})
                .then( function (canvas) {

                  console.log(canvas);

                  // CANVAS IS THE FINAL RENDERED <CANVAS> ELEMENT
                  base.previewText= "TEXTSHOT GENERATED!";
                  base.textShotPNGUrl = canvas.toDataURL(); // PNG BY DEFAULT
                  base.textShotPNGOctetUrl = base.textShotPNGUrl.replace(/^data:image\/[^;]/, 'data:application/octet-stream');

                  // console.log('Got canvas');
                  base.textShotIsGenerated = true;

                  // RE-RUN IF IMAGE GENERATION FAILED DUE TO RACE CONDITION
                  if (base.textShotPNGUrl === 'data:,') {
                    base.regenerateTextShotImage();
                  }

                });

  }

  downloadTextShotImage () {
    console.log('Downloading...');
    var url = this.textShotPNGUrl.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
    // var url = this.textShotPNGUrl;
    window.open(url);
  }

  // 'font-family': 'Helvetica',
  // 'font-size': '24pt',
  // 'color': 'black',
  // 'background-color': '#eee',
  // 'background-image': 'none',
  // 'font-weight': 'normal',
  // 'font-style': 'normal',
  // 'text-decoration': 'none'
  // 'text-align': 'left'

  toggleBold () {
    this.textShot.styles['font-weight'] = this.textShot.styles['font-weight'] === 'normal' ? 'bold' : 'normal';
  }

  toggleItalic () {
    this.textShot.styles['font-style'] = this.textShot.styles['font-style'] === 'normal' ? 'italic' : 'normal';
  }

  toggleUnderline () {
    this.textShot.styles['text-decoration'] = this.textShot.styles['text-decoration'] === 'none' ? 'underline' : 'none';
  }

  setTextAlignment (alignment: string) {
    this.textShot.styles['text-align'] = alignment;
  }

}
