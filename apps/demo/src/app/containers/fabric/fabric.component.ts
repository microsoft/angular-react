import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fabric',
  templateUrl: './fabric.component.html',
  styleUrls: ['./fabric.component.scss']
})
export class FabricComponent implements OnInit {

  disabled = true;
  dialogHidden = true;
  sampleContentCounter = 0;
  secondsCounter = 0;
  sampleContent2 = '0 Seconds Passed';

  get sampleContent() {
    return `Button clicked ${this.sampleContentCounter} times.`;
  }

  constructor() {
    // setInterval(() => {
    //   this.secondsCounter += 1;
    //   this.sampleContent2 = `${this.secondsCounter} Seconds Passed`
    // }, 1000);
  }

  ngOnInit() { }

  toggle() {
    this.disabled = !this.disabled;
  }

  toggleDialog() {
    this.dialogHidden = !this.dialogHidden;
  }

  click() {
    this.sampleContentCounter += 1;
  }

}
