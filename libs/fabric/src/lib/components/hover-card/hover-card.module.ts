// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { registerElement } from '@angular-react/core';
import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import * as HoverCardCss from 'office-ui-fabric-react/lib-amd/components/HoverCard/HoverCardPage.global.scss';
import { ExpandingCard, HoverCard } from 'office-ui-fabric-react/lib/HoverCard';
import { noop } from '../../utils/noop';
import { FabHoverCardComponent } from './hover-card.component';

// Dummy action to force HoverCardCss to load and not be tree-shaken away.
noop(HoverCardCss);

const components = [
  FabHoverCardComponent,
  // FabExpandingCardComponent,
];

@NgModule({
  imports: [CommonModule],
  declarations: components,
  exports: components,
  schemas: [NO_ERRORS_SCHEMA],
})
export class FabHoverCardModule {
  constructor() {
    // Add any React elements to the registry (used by the renderer).
    registerElement('HoverCard', () => HoverCard);
    registerElement('ExpandingCard', () => ExpandingCard);
  }
}
