import { Component, OnInit } from '@angular/core';
import { DialogType } from 'office-ui-fabric-react/lib/Dialog';

@Component({
  selector: 'app-fabric',
  templateUrl: './fabric.component.html',
  styleUrls: ['./fabric.component.scss']
})
export class FabricComponent implements OnInit {
  DialogType = DialogType;

  disabled = true;
  dialogHidden = true;
  sampleContentCounter = 0;
  secondsCounter = 0;
  sampleContent2 = '0 Seconds Passed';
  sampleContent3 = '';

  get sampleContent() {
    return `Button clicked ${this.sampleContentCounter} times.`;
  }

  constructor() {
    const i = setInterval(() => {
      this.secondsCounter += 1;
      this.sampleContent2 = `${this.secondsCounter} Seconds Passed`
    }, 1000);

    setTimeout(() => {
      clearInterval(i);
    }, 12000);
  }

  ngOnInit() { }

  toggle() {
    this.disabled = !this.disabled;
  }

  toggleDialog() {
    this.dialogHidden = !this.dialogHidden;
    this.sampleContent3 = '';
  }

  click() {
    this.sampleContentCounter += 1;
  }

  clickSave() {
    this.sampleContent3 = 'Saved...';
  }

}
