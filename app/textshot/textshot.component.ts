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

  testText: string = "Original test text";

  constructor () {

  }

  ngOnInit () {

    // TEXTSHOT IMAGE GENERATION DEBOUNCE
    this.textShotInputControl.valueChanges
                        .debounceTime(1000)
                        .distinctUntilChanged()
                        .subscribe(text => { console.log('Changed to ' + text) ; this.testText = text; });

  }

}
