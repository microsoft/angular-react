import { registerElement } from '@angular-react/core';
import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';

import { FabCommandBarComponent } from './command-bar.component';
import { CommandBarItemDirective } from './directives/command-bar-item.directive';
import { CommandBarItemsDirective } from './directives/command-bar-items.directive';
import { CommandBarFarItemsDirective } from './directives/command-bar-far-items.directive';
import { CommandBarOverflowItemsDirective } from './directives/command-bar-overflow-items.directive';

const components = [
  FabCommandBarComponent,
  CommandBarItemsDirective,
  CommandBarFarItemsDirective,
  CommandBarOverflowItemsDirective,
  CommandBarItemDirective,
];

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
