// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { registerElement } from '@angular-react/core';
import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Dialog, DialogContent, DialogFooter } from '@fluentui/react/lib/Dialog';
import { FabDialogComponent, FabDialogContentComponent, FabDialogFooterComponent } from './dialog.component';

const components = [FabDialogComponent, FabDialogContentComponent, FabDialogFooterComponent];

@NgModule({
  imports: [CommonModule],
  declarations: components,
  exports: components,
  schemas: [NO_ERRORS_SCHEMA],
})
export class FabDialogModule {
  constructor() {
    // Add any React elements to the registry (used by the renderer).
    registerElement('Dialog', () => Dialog);
    registerElement('DialogContent', () => DialogContent);
    registerElement('DialogFooter', () => DialogFooter);
  }
}