// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { registerElement } from '@angular-react/core';
import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import * as PanelCss from 'office-ui-fabric-react/lib-amd/components/Panel/Panel.scss';
import { Panel } from 'office-ui-fabric-react/lib/Panel';
import { noop } from '../../utils/noop';
import { FabPanelComponent } from './panel.component';

// Dummy action to force PanelCss to load and not be tree-shaken away.
noop(PanelCss);

const components = [FabPanelComponent];

@NgModule({
  imports: [CommonModule],
  declarations: components,
  exports: components,
  schemas: [NO_ERRORS_SCHEMA],
})
export class FabPanelModule {
  constructor() {
    // Add any React elements to the registry (used by the renderer).
    registerElement('Panel', () => Panel);
  }
}
