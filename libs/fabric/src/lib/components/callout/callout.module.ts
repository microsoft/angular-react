// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { registerElement } from '@angular-react/core';
import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Callout } from 'office-ui-fabric-react';
import { FabCalloutComponent } from './callout.component';

const components = [FabCalloutComponent];

@NgModule({
  imports: [CommonModule],
  declarations: components,
  exports: components,
  schemas: [NO_ERRORS_SCHEMA],
})
export class FabCalloutModule {
  constructor() {
    // Add any React elements to the registry (used by the renderer).
    registerElement('Callout', () => Callout);
  }
}
