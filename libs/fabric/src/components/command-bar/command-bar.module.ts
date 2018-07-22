import { registerElement } from '@angular-react/core';
import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { FabCommandBarComponent } from './command-bar.component';

const components = [FabCommandBarComponent];

@NgModule({
  imports: [CommonModule],
  declarations: components,
  exports: components,
  schemas: [NO_ERRORS_SCHEMA],
})
export class FabCommandBarModule {
  constructor() {
    // Add any React elements to the registry (used by the renderer).
    registerElement('CommandBar', () => CommandBar);
  }
}
