import { registerElement } from '@angular-react/core';
import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { DatePicker } from 'office-ui-fabric-react/lib/DatePicker';
import { FabDatePickerComponent } from './date-picker.component';

const components = [
  FabDatePickerComponent,
];

@NgModule({
  imports: [CommonModule],
  declarations: components,
  exports: components,
  schemas: [NO_ERRORS_SCHEMA]
})
export class FabDatePickerModule {

  constructor() {
    // Add any React elements to the registry (used by the renderer).
    registerElement('DatePicker', () => DatePicker);
  }

}
