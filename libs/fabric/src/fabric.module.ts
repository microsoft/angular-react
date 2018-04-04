import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FabricButtonComponent,
  FabricDialogComponent,
  FabricDialogFooterComponent,
} from './components';
import { registerElement } from '@angular-react/core';

import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Dialog } from 'office-ui-fabric-react/lib/Dialog';
import { DialogFooter } from 'office-ui-fabric-react/lib/components/Dialog';


const components = [
  FabricButtonComponent,
  FabricDialogComponent,
  FabricDialogFooterComponent,
];

@NgModule({
  imports: [CommonModule],
  declarations: components,
  exports: components,
  schemas: [NO_ERRORS_SCHEMA]
})
export class AngularReactFabricModule {

  constructor() {
    // Add any React elements to the registry (used by the renderer).
    registerElement('DefaultButton', () => DefaultButton);
    registerElement('Dialog', () => Dialog);
    registerElement('DialogFooter', () => DialogFooter);
  }

}
