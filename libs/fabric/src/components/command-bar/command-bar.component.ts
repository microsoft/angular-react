import { ReactiveReactWrapperComponent, InputRendererOptions, isReactNode } from '@angular-react/core';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ICommandBarItemProps, ICommandBarProps } from 'office-ui-fabric-react/lib/CommandBar';
import { IContextualMenuItemProps } from 'office-ui-fabric-react/lib/ContextualMenu';
import omit from "../../utils/omit";
import { IObservableArray, extendObservable, observable, isObservable } from 'mobx';
// import { IObservableValue } from 'mobx/lib/types/observablevalue';

@Component({
  selector: 'fab-command-bar',
  exportAs: 'fabCommandBar',
  template: `
    <CommandBar
      #reactNode
      [componentRef]="componentRef"
      [items]="transformedItems"
      [farItems]="transformedFarItems"
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
  styles: ['react-renderer'],
  host: { 'class': 'fab-command-bar' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabCommandBarComponent extends ReactiveReactWrapperComponent<ICommandBarProps> {

  @ViewChild('reactNode') protected reactNodeRef: ElementRef;

  @Input() componentRef?: ICommandBarProps['componentRef'];
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

  @Input() set overflowItems(value: ICommandBarItemOptions[]) {
    this._overflowItems = value;

    if (value) this.transformedOverflowItems = value.map(this._transformCommandBarItemOptionsToProps);
  }

  get overflowItems(): ICommandBarItemOptions[] {
    return this._overflowItems;
  }

  @Input() set items(value: IObservableArray<ICommandBarItemOptions>) {
    this._items = value;

    if (value) this.transformedItems = observable(value.map(this._transformCommandBarItemOptionsToProps));
  }

  get items(): IObservableArray<ICommandBarItemOptions> {
    return this._items;
  }

  @Input() set farItems(value: IObservableArray<ICommandBarItemOptions>) {
    this._farItems = value;

    if (value) this.transformedFarItems = value.map(this._transformCommandBarItemOptionsToProps);
  }

  get farItems(): IObservableArray<ICommandBarItemOptions> {
    return this._farItems;
  }

  @Output() readonly onDataReduced = new EventEmitter<{ movedItem: ICommandBarItemProps }>();
  @Output() readonly onDataGrown = new EventEmitter<{ movedItem: ICommandBarItemProps }>();

  transformedItems: IObservableArray<ICommandBarItemProps>;
  transformedFarItems: ICommandBarItemProps[];
  transformedOverflowItems: ICommandBarItemProps[];

  private _items: IObservableArray<ICommandBarItemOptions>;
  private _farItems: IObservableArray<ICommandBarItemOptions>;
  private _overflowItems: ICommandBarItemOptions[];

  constructor(elementRef: ElementRef) {
    super(elementRef);

    this._transformCommandBarItemOptionsToProps = this._transformCommandBarItemOptionsToProps.bind(this);
  }

  detectChanges() {
    if (isReactNode(this.reactNodeRef.nativeElement)) {
      this.reactNodeRef.nativeElement.setRenderPending();
    }
  }

  private _transformCommandBarItemOptionsToProps(itemOptions: ICommandBarItemOptions): ICommandBarItemProps {
    this.observe(itemOptions);

    const iconRenderer = this.createInputJsxRenderer(itemOptions.renderIcon);
    const renderer = this.createInputJsxRenderer(itemOptions.render);

    return extendObservable(
      itemOptions,
      Object.assign({},
        iconRenderer && { onRenderIcon: (props) => iconRenderer(props) } as Pick<ICommandBarItemProps, 'onRenderIcon'>,
        renderer && { onRender: (item, dismissMenu) => renderer({ item, dismissMenu }) } as Pick<ICommandBarItemProps, 'onRender'>
      )
    );
  }
}

export interface ICommandBarItemOptions extends Pick<ICommandBarItemProps, 'iconOnly' | 'buttonStyles' | 'cacheKey' | 'renderedInOverflow' | 'componentRef' | 'key' | 'text' | 'secondaryText' | 'iconProps' | 'submenuIconProps' | 'disabled' | 'primaryDisabled' | 'shortCut' | 'canCheck' | 'checked' | 'split' | 'data' | 'onClick' | 'href' | 'target' | 'rel' | 'subMenuProps' | 'getItemClassNames' | 'getSplitButtonVerticalDividerClassNames' | 'sectionProps' | 'className' | 'style' | 'ariaLabel' | 'title' | 'onMouseDown' | 'role' | 'customOnRenderListLength' | 'keytipProps' | 'inactive'> {
  [propertyName: string]: any;
  renderIcon?: InputRendererOptions<IContextualMenuItemProps>;
  render?: InputRendererOptions<{ item: any, dismissMenu: (ev?: any, dismissAll?: boolean) => void }>;
}
