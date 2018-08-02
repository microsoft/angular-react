import { registerElement } from '@angular-react/core';
import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BasePicker } from 'office-ui-fabric-react/lib/pickers';

@NgModule({
  imports: [CommonModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class FabBasePickerModule {
  constructor() {
    // Add any React elements to the registry (used by the renderer).
    registerElement('BasePicker', () => BasePicker);
  }
}
