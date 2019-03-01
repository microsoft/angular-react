import { Component } from '@angular/core';
import { IComboBoxOption, ICalendarStrings } from 'office-ui-fabric-react';

@Component({
  selector: 'app-fabric',
  templateUrl: './fabric.component.html',
  styleUrls: ['./fabric.component.scss'],
})
export class FabricComponent {
  disabled = true;
  dialogHidden = true;
  sampleContentCounter = 0;
  secondsCounter = 0;
  sampleContent2 = '0 Seconds Passed';
  sampleContent3 = '';
  selectedComboBoxKey: string = "None";
  selectedComboBoxValue: string = "None";
  selectedDate: Date;

  comboBoxOptions: IComboBoxOption[] = [
    { key: 'A', text: 'See option A' },
    { key: 'B', text: 'See option B' },
  ];

  onSelectDate(event) {
    this.selectedDate = event.date;
  }

  comboChange(event) {
    this.selectedComboBoxKey = event.option.key;
    this.selectedComboBoxValue = event.option.text;
  }

  get sampleContent() {
    return `Button clicked ${this.sampleContentCounter} times.`;
  }

  constructor() {
    const i = setInterval(() => {
      this.secondsCounter += 1;
      this.sampleContent2 = `${this.secondsCounter} Seconds Passed`;
    }, 1000);

    setTimeout(() => {
      clearInterval(i);
    }, 12000);
  }

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
