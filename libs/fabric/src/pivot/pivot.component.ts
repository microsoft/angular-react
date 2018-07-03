import { InputRendererOptions, JsxRenderFunc, ReactWrapperComponent } from '@angular-react/core';
import { ChangeDetectionStrategy, Component, ContentChildren, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, QueryList, ViewChild } from '@angular/core';
import { IPivot, IPivotItemProps, IPivotProps, PivotBase, PivotItem } from 'office-ui-fabric-react/lib/components/Pivot';
import * as React from 'react';
import { Subscription } from 'rxjs/Subscription';

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
    <Pivot
      [componentRef]="setReactRef"
      #reactNode>
    </Pivot>
  `,
  styles: [
    'react-renderer',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'fab-pivot' }
})
export class FabPivotComponent extends ReactWrapperComponent<IPivotProps> implements OnDestroy {

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

  @Output() readonly onLinkClick = new EventEmitter<{ item?: FabPivotItemComponent, ev?: MouseEvent }>();

  private readonly _angularReactMap = new Map<PivotItem, FabPivotItemComponent>();
  private readonly _subscriptions: Subscription[] = [];
  _ref: IPivot & PivotBase;

  constructor(elementRef: ElementRef) {
    super(elementRef);

    this.onLinkClickHandler = this.onLinkClickHandler.bind(this);

    this.setReactRef = this.setReactRef.bind(this);
  }

  ngOnDestroy() {
    this._subscriptions.forEach(subscription => subscription.unsubscribe())
  }

  onLinkClickHandler(item?: PivotItem, ev?: React.MouseEvent<HTMLElement>) {
    this.onLinkClick.emit({
      ev: ev && ev.nativeEvent,
      item: item && this._angularReactMap.get(item),
    });
  }

  setReactRef(ref: IPivot & PivotBase) {
    this._ref = ref;

    ref.setState({
      links: this.pivotItems.map((item, index) => ({ ...item, key: index })),
    })
    console.log('ref set!')
    // this._syncTabs();
  }

  private initChildren() {
    // FIXME: get notified on new tabs added/removed
    this.pivotItems.changes.subscribe(
      changes => {
        debugger;
      }
    );


    this.pivotItems.forEach(angularItem => {
      this._subscriptions.push(
        angularItem.__internal__onReactRefSet.subscribe((reactItem: PivotItem) => {
          this._angularReactMap.set(reactItem, angularItem);
        })
      );
    });

    this._syncTabs();
  }

  private _syncTabs() {
    debugger;
    Array.from(this._angularReactMap.keys())
      .forEach(reactItem => {
        debugger;
        (this._ref as any).props.children.push(reactItem);
      });
  }
}
