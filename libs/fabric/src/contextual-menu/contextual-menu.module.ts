import { registerElement } from '@angular-react/core';
import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ContextualMenu } from 'office-ui-fabric-react/lib/ContextualMenu';
import { FabContextualMenuComponent } from './contextual-menu.component';

const components = [
  FabContextualMenuComponent,
];

@NgModule({
  imports: [CommonModule],
  declarations: components,
  exports: components,
  schemas: [NO_ERRORS_SCHEMA]
})
export class FabContextualMenuModule {

  constructor() {
    // Add any React elements to the registry (used by the renderer).
    registerElement('ContextualMenu', () => ContextualMenu);
  }

}
