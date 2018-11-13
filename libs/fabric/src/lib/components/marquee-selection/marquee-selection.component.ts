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
import { IMarqueeSelectionProps } from 'office-ui-fabric-react/lib/MarqueeSelection';

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
      [ShouldStartSelection]="onShouldStartSelection">
      <ReactContent><ng-content></ng-content></ReactContent>
    </MarqueeSelection>
  `,
  styles: ['react-renderer'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabMarqueeSelectionComponent extends ReactWrapperComponent<IMarqueeSelectionProps> {
  
  @ViewChild('reactNode')
  protected reactNodeRef: ElementRef;

  // Required members
  @Input()
  selection: IMarqueeSelectionProps['selection'];

  // Optional members
  @Input()
  className?: IMarqueeSelectionProps['className'];
  @Input()
  componentRef?: IMarqueeSelectionProps['componentRef'];
  @Input()
  isDraggingConstrainedToRoot?: IMarqueeSelectionProps['isDraggingConstrainedToRoot'];
  @Input()
  isEnabled?: IMarqueeSelectionProps['isEnabled'];
  @Input()
  onShouldStartSelection?: (ev: MouseEvent) => boolean;
  @Input()
  rootProps?: IMarqueeSelectionProps['rootProps'];
  @Input()
  styles?: IMarqueeSelectionProps['styles'];
  @Input()
  theme?: IMarqueeSelectionProps['theme'];

  constructor(
    elementRef: ElementRef,
    changeDetectorRef: ChangeDetectorRef,
    renderer: Renderer2,
    ngZone: NgZone
  ) {
    super(elementRef, changeDetectorRef, renderer, { ngZone, setHostDisplay: true });
  }
}
