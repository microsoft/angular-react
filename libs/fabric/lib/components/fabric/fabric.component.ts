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
import { IFabricProps } from '@fluentui/react/lib/Fabric';
import { Styled } from '@angular-react/fabric/lib/utils';
import { AngularReact } from '@angular-react/core';

@AngularReact()
@Styled('FabFabricComponent')
@Component({
  selector: 'fab-fabric',
  exportAs: 'fabFabric',
  template: `
    <Fabric #reactNode [componentRef]="componentRef" [theme]="theme">
      <ReactContent><ng-content></ng-content></ReactContent>
    </Fabric>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabFabricComponent extends ReactWrapperComponent<IFabricProps> {
  @ViewChild('reactNode', { static: true }) protected reactNodeRef: ElementRef;

  @Input() componentRef?: IFabricProps['componentRef'];
  @Input() theme?: IFabricProps['theme'];

  constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, renderer: Renderer2) {
    super(elementRef, changeDetectorRef, renderer);
  }
}
