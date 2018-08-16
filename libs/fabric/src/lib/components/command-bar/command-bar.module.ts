// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { registerElement } from '@angular-react/core';
import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { FabContextualMenuModule } from '../contextual-menu/contextual-menu.module';
import { FabCommandBarComponent } from './command-bar.component';
import {
  CommandBarItemDirective,
  CommandBarItemRenderDirective,
  CommandBarItemRenderIconDirective,
} from './directives/command-bar-item.directives';
import {
  CommandBarFarItemsDirective,
  CommandBarItemsDirective,
  CommandBarOverflowItemsDirective,
} from './directives/command-bar-items.directives';

const components = [
  FabCommandBarComponent,
  CommandBarItemsDirective,
  CommandBarFarItemsDirective,
  CommandBarOverflowItemsDirective,
  CommandBarItemDirective,
  CommandBarItemRenderDirective,
  CommandBarItemRenderIconDirective,
];

@NgModule({
  imports: [CommonModule, FabContextualMenuModule],
  declarations: components,
  exports: [...components, FabContextualMenuModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class FabCommandBarModule {
  constructor() {
    // Add any React elements to the registry (used by the renderer).
    registerElement('CommandBar', () => CommandBar);
  }
}
