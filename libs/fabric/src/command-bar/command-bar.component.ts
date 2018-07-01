// tslint:disable:component-selector
// tslint:disable:no-input-rename
// tslint:disable:no-output-rename
// tslint:disable:use-host-property-decorator
// tslint:disable:no-output-on-prefix

import { ReactWrapperComponent } from '@angular-react/core';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ICommandBarItemProps, ICommandBarProps } from 'office-ui-fabric-react/lib/CommandBar';

@Component({
  selector: 'fab-command-bar',
  exportAs: 'fabCommandBar',
  template: `
    <CommandBar
      #reactNode
      [componentRef]="componentRef"
      [items]="items"
      [farItems]="farItems"
      [overflowItems]="overflowItems"
      [overflowButtonProps]="overflowButtonProps"
      [overflowButtonAs]="overflowButtonAs"
      [overflowMenuProps]="overflowMenuProps"
      [buttonAs]="buttonAs"
      [shiftOnReduce]="shiftOnReduce"
      [className]="className"
      [ariaLabel]="ariaLabel"
      [styles]="styles"
      [theme]="theme"
      [ReduceData]="onReduceData"
      [GrowData]="onGrowData"
      (onDataReduced)="onDataReduced"
      (onDataGrown)="onDataGrown">
    </CommandBar>
  `,
  styles: [
    'react-renderer',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'fab-command-bar' }
})
export class FabCommandBarComponent extends ReactWrapperComponent<ICommandBarProps> {

  @Input() componentRef?: ICommandBarProps['componentRef'];
  @Input() items: ICommandBarProps['items'];
  @Input() farItems?: ICommandBarProps['farItems'];
  @Input() overflowItems?: ICommandBarProps['overflowItems'];
  @Input() overflowButtonProps?: ICommandBarProps['overflowButtonProps'];
  @Input() overflowButtonAs?: ICommandBarProps['overflowButtonAs'];
  @Input() overflowMenuProps?: ICommandBarProps['overflowMenuProps'];
  @Input() buttonAs?: ICommandBarProps['buttonAs'];
  @Input() shiftOnReduce?: ICommandBarProps['shiftOnReduce'];
  @Input() className?: ICommandBarProps['className'];
  @Input() ariaLabel?: ICommandBarProps['ariaLabel'];
  @Input() styles?: ICommandBarProps['styles'];
  @Input() theme?: ICommandBarProps['theme'];
  @Input() onReduceData?: ICommandBarProps['onReduceData'];
  @Input() onGrowData?: ICommandBarProps['onGrowData'];

  @Output() onDataReduced = new EventEmitter<{ movedItem: ICommandBarItemProps }>();
  @Output() onDataGrown = new EventEmitter<{ movedItem: ICommandBarItemProps }>();

  @ViewChild('reactNode') protected reactNodeRef: ElementRef;

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

}
