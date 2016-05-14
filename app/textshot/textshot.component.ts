import { Component, OnInit } from '@angular/core';
import { Control } from '@angular/common';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'ts-textshot',
  templateUrl: 'app/textshot/textshot.template.html'
})
export class TSTextShotComponent implements OnInit {

  textShotInputControl = new Control();
  textShotText: string = "";
  textShotIsGenerated: boolean = false;
  textShotPNGUrl: string = "";
  previewText: string = "PREVIEW";

  constructor () {

  }

  ngOnInit () {

    // TEXTSHOT IMAGE GENERATION WITH DEBOUNCE
    this.textShotInputControl.valueChanges
                        .debounceTime(1000)
                        .distinctUntilChanged()
                        .subscribe(text => {
                          this.textShotIsGenerated = false;
                          this.textShotText = text;
                          this.generateTextShotImage();
                        });

  }

  generateTextShotImage () {

    console.log('Changed to ' + this.textShotText);

    this.previewText = "GENERATING IMAGE...";

    var base = this;

    // GENERATE IMAGE
    html2canvas(document.getElementById('textshot-div'), {
        onrendered: function(canvas) {
            // CANVAS IS THE FINAL RENDERED <CANVAS> ELEMENT
            base.textShotIsGenerated = true;
            base.previewText= "TEXTSHOT GENERATED!";
            base.textShotPNGUrl = canvas.toDataURL(); // PNG BY DEFAULT

            // console.log(pngUrl);
            // document.body.appendChild(canvas);
        }
    });

  }

}
