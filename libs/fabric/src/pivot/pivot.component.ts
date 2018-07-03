import { InputRendererOptions, JsxRenderFunc, ReactWrapperComponent } from '@angular-react/core';
import { ChangeDetectionStrategy, Component, ComponentRef, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IPivotItemProps, IPivotProps, PivotItem } from 'office-ui-fabric-react/lib/components/Pivot';

@Component({
  selector: 'fab-pivot',
  exportAs: 'fabPivot',
  template: `
    <Pivot
      #reactNode
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
      <ReactContent><ng-content></ng-content></ReactContent>
    </Pivot>
  `,
  styles: [
    'react-renderer',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'fab-pivot' }
})
export class FabPivotComponent extends ReactWrapperComponent<IPivotProps>  {
  @ViewChild('reactNode') protected reactNodeRef: ElementRef;

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

  @Output() readonly onLinkClick = new EventEmitter<{ item?: ComponentRef<FabPivotItemComponent>, ev?: MouseEvent }>();

  constructor(elementRef: ElementRef) {
    super(elementRef);

    this.onLinkClickHandler = this.onLinkClickHandler.bind(this);
  }

  onLinkClickHandler(item?: PivotItem, ev?: React.MouseEvent<HTMLElement>) {
    this.onLinkClick.emit({
      ev: ev && ev.nativeEvent,
      // FIXME: Add item
    });
  }
}

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

  @Input() componentRef?: IPivotItemProps['componentRef'];
  @Input() headerText?: IPivotItemProps['headerText'];
  @Input() headerButtonProps?: IPivotItemProps['headerButtonProps'];
  @Input() itemKey?: IPivotItemProps['itemKey'];
  @Input() ariaLabel?: IPivotItemProps['ariaLabel'];
  @Input() itemCount?: IPivotItemProps['itemCount'];
  @Input() itemIcon?: IPivotItemProps['itemIcon'];
  @Input() keytipProps?: IPivotItemProps['keytipProps'];

  @Input() renderItemLink?: InputRendererOptions<IPivotItemProps>;

  onRenderItemLink: (props?: IPivotItemProps, defaultRender?: JsxRenderFunc<IPivotItemProps>) => JSX.Element;

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

  ngOnInit() {
    this.onRenderItemLink = this.createRenderPropHandler(this.renderItemLink);
  }
}
