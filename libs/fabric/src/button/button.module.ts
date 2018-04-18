import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { registerElement } from '@angular-react/core';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

import { FabButtonComponent } from './button.component';


const components = [
  FabButtonComponent,
];

@NgModule({
  imports: [CommonModule],
  declarations: components,
  exports: components,
  schemas: [NO_ERRORS_SCHEMA]
})
export class FabButtonModule {

  constructor() {
    // Add any React elements to the registry (used by the renderer).
    registerElement('DefaultButton', () => DefaultButton);
  }

}
