// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { registerElement } from '@angular-react/core';
import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Text } from '@fluentui/react/lib/Text';
import { FabTextComponent } from './text.component';

const components = [FabTextComponent];

@NgModule({
  imports: [CommonModule],
  declarations: components,
  exports: components,
  schemas: [NO_ERRORS_SCHEMA],
})
export class FabTextModule {
  constructor() {
    // Add any React elements to the registry (used by the renderer).
    registerElement('Text', () => Text);
  }
}
