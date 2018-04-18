import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { registerElement } from '@angular-react/core';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { Dialog, DialogFooter } from 'office-ui-fabric-react/lib/components/Dialog';

import { FabDialogComponent, FabDialogFooterComponent } from './dialog.component';

const components = [
  FabDialogComponent,
  FabDialogFooterComponent,
];

@NgModule({
  imports: [CommonModule],
  declarations: components,
  exports: components,
  schemas: [NO_ERRORS_SCHEMA]
})
export class FabDialogModule {

  constructor() {
    // Add any React elements to the registry (used by the renderer).
    registerElement('Dialog', () => Dialog);
    registerElement('DialogFooter', () => DialogFooter);
  }

}
