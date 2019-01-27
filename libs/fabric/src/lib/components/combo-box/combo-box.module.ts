// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { registerElement } from '@angular-react/core';
import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComboBox, VirtualizedComboBox } from 'office-ui-fabric-react';
import { FabComboBoxComponent } from './combo-box.component';
import { FabVirtualizedComboBoxComponent } from './virtualized-combo-box.component';

const components = [FabComboBoxComponent, FabVirtualizedComboBoxComponent];

@NgModule({
  imports: [CommonModule],
  declarations: components,
  exports: components,
  schemas: [NO_ERRORS_SCHEMA],
})
export class FabComboBoxModule {
  constructor() {
    // Add any React elements to the registry (used by the renderer).
    registerElement('ComboBox', () => ComboBox);
    registerElement('VirtualizedComboBox', () => VirtualizedComboBox);
  }
}
