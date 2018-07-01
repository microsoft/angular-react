import { registerElement } from '@angular-react/core';
import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { FabDefaultButtonComponent } from './default-button.component';

const components = [
  FabDefaultButtonComponent,
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
