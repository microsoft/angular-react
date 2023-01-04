// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  NgZone,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ReactWrapperComponent } from '@angular-react/core';
import { IMarqueeSelectionProps } from '@fluentui/react/lib/MarqueeSelection';
import { Styled } from '@angular-react/fabric/lib/utils';
import { AngularReact } from '@angular-react/core';

@AngularReact()
@Styled('FabMarqueeSelectionComponent')
@Component({
  selector: 'fab-marquee-selection',
  exportAs: 'fabMarqueeSelection',
  template: `
    <MarqueeSelection
      #reactNode
      [selection]="selection"
      [className]="className"
      [componentRef]="componentRef"
      [isDraggingConstrainedToRoot]="isDraggingConstrainedToRoot"
      [isEnabled]="isEnabled"
      [rootProps]="rootProps"
      [styles]="styles"
      [theme]="theme"
      [ShouldStartSelection]="onShouldStartSelection"
    >
      <ReactContent><ng-content></ng-content></ReactContent>
    </MarqueeSelection>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabMarqueeSelectionComponent extends ReactWrapperComponent<IMarqueeSelectionProps> {
  @ViewChild('reactNode', { static: true }) protected reactNodeRef: ElementRef;

  @Input() componentRef?: IMarqueeSelectionProps['componentRef'];
  @Input() selection: IMarqueeSelectionProps['selection'];
  @Input() rootProps?: IMarqueeSelectionProps['rootProps'];
  @Input() onShouldStartSelection?: (ev: MouseEvent) => boolean;
  @Input() isEnabled?: IMarqueeSelectionProps['isEnabled'];
  @Input() isDraggingConstrainedToRoot?: IMarqueeSelectionProps['isDraggingConstrainedToRoot'];
  @Input() className?: IMarqueeSelectionProps['className'];
  @Input() theme?: IMarqueeSelectionProps['theme'];
  @Input() styles?: IMarqueeSelectionProps['styles'];

  constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, renderer: Renderer2, ngZone: NgZone) {
    super(elementRef, changeDetectorRef, renderer, { ngZone, setHostDisplay: true });
  }
}