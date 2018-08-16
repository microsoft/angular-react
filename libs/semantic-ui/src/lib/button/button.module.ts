// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { registerElement } from '@angular-react/core';
import { Button } from 'semantic-ui-react';

import { SemButtonComponent } from './button.component';

const components = [SemButtonComponent];

@NgModule({
  imports: [CommonModule],
  declarations: components,
  exports: components,
  schemas: [NO_ERRORS_SCHEMA],
})
export class SemButtonModule {
  constructor() {
    // Add any React elements to the registry (used by the renderer).
    registerElement('Button', () => Button);
  }
}

export { SemButtonComponent };
