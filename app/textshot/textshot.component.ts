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

  constructor () {

  }

  ngOnInit () {

    // TEXTSHOT DEBOUNCE
    // this.result = this.textShotInputControl.valueChanges
    //                     .debounceTime(400)
    //                     .distinctUntilChanged()
    //                     .switchMap(text => null);

  }

}
