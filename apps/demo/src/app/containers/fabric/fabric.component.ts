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

  get sampleContent() {
    return `Button clicked ${this.sampleContentCounter} times.`;
  }

  constructor() { }

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
