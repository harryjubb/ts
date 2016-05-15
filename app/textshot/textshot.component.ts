import { Component, OnInit } from '@angular/core';
import { Control } from '@angular/common';

import { Observable } from 'rxjs/Observable';

import { ColorPickerDirective } from '../color-picker/color-picker.directive';

import { DeviceTypeDetectService } from '../services/device-type-detection.service';

declare var tinycolor: any;

@Component({
  selector: 'ts-textshot',
  templateUrl: 'app/textshot/textshot.template.html',
  directives: [
    ColorPickerDirective
  ]
})
export class TSTextShotComponent implements OnInit {

  textShotInputControl = new Control();
  // textShotBgImageUrlInputControl = new Control();
  textShot: Object = {
    'text': '',
    'styles': {
      'font-family': 'Merriweather',
      'font-size': '24pt',
      'color': '#000',
      'background-color': 'none', // '#fff',
      'background-image': 'none',
      'font-weight': 'normal',
      'font-style': 'normal',
      'text-decoration': 'none',
      'text-align': 'left'
    },
    'backgroundColorStyles': {
      'background-color': '#fff', // '#fff',
    }
    'backgroundImageStyles': {
      'background-color': 'rgba(255, 255, 255, 0)', // ENSURE TRANSPARENT COLOR BG FOR IMAGE
      'background-image': 'none',
      'background-size': 'cover',
      'opacity': '1'
    }
  };
  fontFamilies: Array<string> = [
    'Merriweather',
    'Arial',
    'Helvetica',
    'Times New Roman',
    'Roboto',
    'Open Sans',
    'Oswald',
    'Raleway',
    'Indie Flower',
    'Bitter',
    'Dosis',
    'Poiret One',
    'Libre Baskerville',
    'Pacifico',
    'Oxygen',
    'Cabin'
  ];
  fontSizes: Array<string> = [
    '10pt',
    '11pt',
    '12pt',
    // '13pt',
    '14pt',
    // '15pt',
    '16pt',
    // '17pt',
    '18pt',
    // '19pt',
    '20pt',
    // '21pt',
    '22pt',
    // '23pt',
    '24pt',
    // '25pt',
    '26pt',
    // '27pt',
    '28pt',
    // '29pt',
    '30pt'
  ];
  textShotIsGenerated: boolean = false;
  textShotPNGUrl: string = "";
  textShotPNGOctetUrl: string = "";
  textShotPNGBlobUrl: string = "";
  // textShotSource = null;
  // textShotURL = null;

  previewText: string = "LIVE PREVIEW";

  onMobile: boolean = false;

  settingsShown: boolean = false;

  timeoutID = null;

  tinyColor = tinycolor;

  showImageUploadDisclaimer: boolean = false;
  bgImageDataURL: string = undefined;

  // _validImageURL = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/i;
  // imageURLIsValid: boolean = false;

  constructor (
    private _device: DeviceTypeDetectService
  ) {

    this.onMobile = this._device.device.is_mobile;

    // var base = this;

    // HANDLE WINDOW RESIZE
    // window.onresize = () => {
    //   if (this.timeoutID) window.clearTimeout(this.timeoutID);
    //   this.timeoutID = window.setTimeout(() => {
    //     base.regenerateTextShotImage();
    //   }, 100);
    // };

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

    // this.textShotBgImageUrlInputControl.valueChanges
    //                                    .debounceTime(1000)
    //                                    .subscribe(text => {
    //                                      console.log('changed');
    //
    //
    //
    //                                      // CHECK FOR VALID REGEX
    //                                      if (this._validImageURL.test(text)) {
    //                                        console.log('valid');
    //                                        this.textShot.styles['background-image'] = 'url("' + text + '")';
    //
    //                                      } else {
    //                                        console.log('invalid')
    //                                      }
    //
    //                                    });

  }

  textShotTextAreaWasChanged () {

    this.textShotIsGenerated = false;
    this.previewText = "LIVE PREVIEW";

  }

  regenerateTextShotImage () {

    this.textShotIsGenerated = false;
    var base = this;

    // MANUAL DEBOUNCE DELAY
    // A BIT HACKY(!)
    if (this.timeoutID) window.clearTimeout(this.timeoutID);
    this.timeoutID = window.setTimeout(() => {
      base.generateTextShotImage();
    }, 250);

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
    html2canvas(document.getElementById('textshot-div'), {
                  useCORS: true
                })
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

  handleImageUpload (event) {
    console.log('image changed')

    var file = event.target.files[0];
    var reader = new FileReader();

    var base = this;

    reader.addEventListener("load", function () {
      base.bgImageDataURL = reader.result;
      // console.log(base.bgImageDataURL);
      base.textShot.backgroundImageStyles['background-image'] = 'url("' + base.bgImageDataURL + '")';
      base.regenerateTextShotImage();
    }, false);

    if (file) {
      console.log('found file');
      console.log(file);
      reader.readAsDataURL(file);
    }

  }

  handleClearImage () {

    if (this.textShot.backgroundImageStyles['background-image'] !== 'none') {
      this.textShot.backgroundImageStyles['background-image'] = 'none';
      this.regenerateTextShotImage();
    }

  }

}
