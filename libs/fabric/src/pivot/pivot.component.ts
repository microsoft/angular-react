import { InputRendererOptions, JsxRenderFunc, ReactWrapperComponent } from '@angular-react/core';
import { ChangeDetectionStrategy, Component, ContentChildren, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChild } from '@angular/core';
import { IPivotItemProps, IPivotProps, Pivot, PivotItem } from 'office-ui-fabric-react/lib/components/Pivot';
import * as React from 'react';

@Component({
  selector: 'fab-pivot-item',
  exportAs: 'fabPivotItem',
  template: `
    <PivotItem
      #reactNode
      [ref]="setReactRef"
      [headerText]="headerText">
      <ReactContent><ng-content></ng-content></ReactContent>
    </PivotItem>
  `,
  styles: ['react-renderer'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'fab-pivot-item' }
})
export class FabPivotItemComponent extends ReactWrapperComponent<IPivotItemProps> implements OnInit {
  @ViewChild('reactNode') reactNodeRef: ElementRef;

  @Input() headerText?: IPivotItemProps['headerText'];
  @Input() headerButtonProps?: IPivotItemProps['headerButtonProps'];
  @Input() itemKey?: IPivotItemProps['itemKey'];
  @Input() ariaLabel?: IPivotItemProps['ariaLabel'];
  @Input() itemCount?: IPivotItemProps['itemCount'];
  @Input() itemIcon?: IPivotItemProps['itemIcon'];
  @Input() keytipProps?: IPivotItemProps['keytipProps'];

  @Input() renderItemLink?: InputRendererOptions<IPivotItemProps>;

  onRenderItemLink: (props?: IPivotItemProps, defaultRender?: JsxRenderFunc<IPivotItemProps>) => JSX.Element;

  @Output() readonly __internal__onReactRefSet = new EventEmitter<PivotItem>();

  constructor(elementRef: ElementRef) {
    super(elementRef);

    this.setReactRef = this.setReactRef.bind(this);
  }

  ngOnInit() {
    this.onRenderItemLink = this.createRenderPropHandler(this.renderItemLink);
  }

  setReactRef(ref: PivotItem) {
    this.__internal__onReactRefSet.emit(ref);
  }
}

@Component({
  selector: 'fab-pivot',
  exportAs: 'fabPivot',
  template: `
    <Disguise
      #reactNode
      [parentAs]="PivotType"
      [childrenAs]="PivotItemType"
      [parentProps]="parentProps"
      [angularChildren]="pivotItems?.toArray()">
      <ReactContent>
        <ng-content></ng-content>
      </ReactContent>
    </Disguise>
  `,
  styles: ['react-renderer'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'fab-pivot' }
})
export class FabPivotComponent extends ReactWrapperComponent<IPivotProps> /* implements OnDestroy */ {

  readonly PivotType = Pivot;
  readonly PivotItemType = PivotItem;
  readonly parentProps = {
    onLinkClick: (item, ev) => this.onLinkClickHandler(item, ev),
  }

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

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

  onLinkClickHandler(item?: PivotItem, ev?: React.MouseEvent<HTMLElement>) {
    this.onLinkClick.emit({
      ev: ev && ev.nativeEvent,
      item: item,
    });
  }

}
