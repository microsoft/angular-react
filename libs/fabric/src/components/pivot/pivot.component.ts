import { InputRendererOptions, JsxRenderFunc, ReactWrapperComponent, passProp } from '@angular-react/core';
import { ChangeDetectionStrategy, Component, ContentChildren, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ChangeDetectorRef } from '@angular/core';
import { IPivotItemProps, IPivotProps, Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import * as React from 'react';

@Component({
  selector: 'fab-pivot-item',
  exportAs: 'fabPivotItem',
  template: `
    <PivotItem
      #reactNode
      [componentRef]="componentRef"
      [headerText]="headerText"
      [headerButtonProps]="headerButtonProps"
      [itemKey]="itemKey"
      [ariaLabel]="ariaLabel"
      [itemCount]="itemCount"
      [itemIcon]="itemIcon"
      [keytipProps]="keytipProps"
      [RenderItemLink]="renderItemLink && onRenderItemLink">
      <ReactContent><ng-content></ng-content></ReactContent>
    </PivotItem>
  `,
  styles: ['react-renderer'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'fab-pivot-item' }
})
export class FabPivotItemComponent extends ReactWrapperComponent<IPivotItemProps> implements OnInit {
  @ViewChild('reactNode') protected reactNodeRef: ElementRef;

  @passProp()
  @Input() componentRef?: IPivotItemProps['componentRef'];

  @passProp()
  @Input() headerText?: IPivotItemProps['headerText'];

  @passProp()
  @Input() headerButtonProps?: IPivotItemProps['headerButtonProps'];

  @passProp()
  @Input() itemKey?: IPivotItemProps['itemKey'];

  @passProp()
  @Input() ariaLabel?: IPivotItemProps['ariaLabel'];

  @passProp()
  @Input() itemCount?: IPivotItemProps['itemCount'];

  @passProp()
  @Input() itemIcon?: IPivotItemProps['itemIcon'];

  @passProp()
  @Input() keytipProps?: IPivotItemProps['keytipProps'];

  @passProp()
  @Input() renderItemLink?: InputRendererOptions<IPivotItemProps>;

  onRenderItemLink: (props?: IPivotItemProps, defaultRender?: JsxRenderFunc<IPivotItemProps>) => JSX.Element;

  constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef) {
    super(elementRef, changeDetectorRef, true);
  }

  ngOnInit() {
    this.onRenderItemLink = this.createRenderPropHandler(this.renderItemLink);
  }
}

@Component({
  selector: 'fab-pivot',
  exportAs: 'fabPivot',
  template: `
    <Disguise
      #reactNode
      [disguiseRootAs]="PivotType"
      [disguiseChildrenAs]="PivotItemType"
      [ngChildComponents]="pivotItems?.toArray()"

      [componentRef]="componentRef"
      [styles]="styles"
      [theme]="theme"
      [className]="className"
      [initialSelectedIndex]="initialSelectedIndex"
      [initialSelectedKey]="initialSelectedKey"
      [selectedKey]="selectedKey"
      [linkSize]="linkSize"
      [linkFormat]="linkFormat"
      [headersOnly]="headersOnly"
      [getTabId]="getTabId"
      [LinkClick]="onLinkClickHandler">
      <ReactContent>
        <ng-content select="fab-pivot-item"></ng-content>
      </ReactContent>
    </Disguise>
  `,
  styles: ['react-renderer'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'fab-pivot' }
})
export class FabPivotComponent extends ReactWrapperComponent<IPivotProps> {

  readonly PivotType = Pivot;
  readonly PivotItemType = PivotItem;

  @ViewChild('reactNode') protected reactNodeRef: ElementRef;

  @ContentChildren(FabPivotItemComponent) pivotItems: QueryList<FabPivotItemComponent>;

  @Input() componentRef?: IPivotProps['componentRef'];
  @Input() styles?: IPivotProps['styles'];
  @Input() theme?: IPivotProps['theme'];
  @Input() className?: IPivotProps['className'];
  @Input() initialSelectedIndex?: IPivotProps['initialSelectedIndex'];
  @Input() initialSelectedKey?: IPivotProps['initialSelectedKey'];
  @Input() selectedKey?: IPivotProps['selectedKey'];
  @Input() linkSize?: IPivotProps['linkSize'];
  @Input() linkFormat?: IPivotProps['linkFormat'];
  @Input() headersOnly?: IPivotProps['headersOnly'];
  @Input() getTabId?: IPivotProps['getTabId'];

  @Output() readonly onLinkClick = new EventEmitter<{ item?: PivotItem, ev?: MouseEvent }>();

  constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef) {
    super(elementRef, changeDetectorRef, true);

    this.onLinkClickHandler = this.onLinkClickHandler.bind(this);
  }

  onLinkClickHandler(item?: PivotItem, ev?: React.MouseEvent<HTMLElement>) {
    this.onLinkClick.emit({
      ev: ev && ev.nativeEvent,
      item: item,
    });
  }
}
