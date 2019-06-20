// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { ReactWrapperComponent } from '@angular-react/core';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { IVerticalDividerProps } from 'office-ui-fabric-react/lib/Divider';

@Component({
  selector: 'fab-vertical-divider',
  exportAs: 'fabVerticalDivider',
  template: `
    <VerticalDivider #reactNode [getClassNames]="getClassNames"> </VerticalDivider>
  `,
  styles: ['react-renderer'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabDividerComponent extends ReactWrapperComponent<IVerticalDividerProps> {
  @ViewChild('reactNode', { static: true }) protected reactNodeRef: ElementRef;

  @Input() getClassNames?: IVerticalDividerProps['getClassNames'];

  constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, renderer: Renderer2) {
    super(elementRef, changeDetectorRef, renderer);
  }
}
