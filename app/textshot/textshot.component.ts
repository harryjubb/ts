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
  textShotText: string = "";
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

                          if (text !== "") {
                            this.textShotText = text;
                            this.generateTextShotImage();
                          } else {
                            this.textShotText = "";
                          }

                        });

  }

  textShotTextAreaWasChanged () {

    this.textShotIsGenerated = false;
    this.previewText = "PREVIEW";

  }

  generateTextShotImage () {

    console.log('Changed to ' + this.textShotText);

    this.previewText = "GENERATING IMAGE...";

    var base = this;

    // GENERATE IMAGE
    html2canvas(document.getElementById('textshot-div'), {
        onrendered: function(canvas) {
            // CANVAS IS THE FINAL RENDERED <CANVAS> ELEMENT
            base.previewText= "TEXTSHOT GENERATED!";
            base.textShotPNGUrl = canvas.toDataURL(); // PNG BY DEFAULT
            base.textShotPNGOctetUrl = base.textShotPNGUrl.replace(/^data:image\/[^;]/, 'data:application/octet-stream');

            // MAKE DOWNLOAD BLOB
            // CURRENTLY DOESN'T WORK
            // SEE http://stackoverflow.com/questions/10473932/browser-html-force-download-of-image-from-src-dataimage-jpegbase64

            // var imageData = atob(base.textShotPNGUrl.split(',')[1]);
            // // Use typed arrays to convert the binary data to a Blob
            // var arrayBuffer = new ArrayBuffer(imageData.length);
            // var view = new Uint8Array(arrayBuffer);
            // for (var i=0; i<imageData.length; i++) {
            //     view[i] = imageData.charCodeAt(i) & 0xff;
            // }
            //
            // var blob: Blob;
            //
            // try {
            //     // This is the recommended method:
            //     blob = new Blob([arrayBuffer], {type: 'application/octet-stream'});
            // } catch (e) {
            //     // The BlobBuilder API has been deprecated in favour of Blob, but older
            //     // browsers don't know about the Blob constructor
            //     // IE10 also supports BlobBuilder, but since the `Blob` constructor
            //     //  also works, there's no need to add `MSBlobBuilder`.
            //     var bb = new (window.WebKitBlobBuilder || window.MozBlobBuilder);
            //     bb.append(arrayBuffer);
            //     blob = bb.getBlob('application/octet-stream'); // <-- Here's the Blob
            // }
            //
            // // Use the URL object to create a temporary URL
            // var blobUrl = (window.webkitURL || window.URL).createObjectURL(blob);
            // console.log(blobUrl);
            // base.textShotPNGBlobUrl = blobUrl;

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
