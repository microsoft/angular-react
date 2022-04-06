// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { registerElement } from '@angular-react/core';
import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import '@fluentui/react/lib/components/pickers/BasePicker.styles';
import { BasePicker } from '@fluentui/react/lib/Pickers';

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
