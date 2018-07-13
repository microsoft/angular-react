import { ReactWrapperComponent, InputRendererOptions } from '@angular-react/core';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild, ChangeDetectorRef, SimpleChanges, OnChanges } from '@angular/core';
import { ICommandBarItemProps, ICommandBarProps } from 'office-ui-fabric-react/lib/CommandBar';
import { IContextualMenuItemProps } from 'office-ui-fabric-react/lib/ContextualMenu';
import omit from "../../utils/omit";

@Component({
  selector: 'fab-command-bar',
  exportAs: 'fabCommandBar',
  template: `
    <CommandBar
      #reactNode
      [componentRef]="componentRef"
      [items]="transformedItems_"
      [farItems]="transformedFarItems_"
      [overflowItems]="transformedOverflowItems_"
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabCommandBarComponent extends ReactWrapperComponent<ICommandBarProps> implements OnChanges {

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

  @Input() items: ReadonlyArray<ICommandBarItemOptions>;
  @Input() farItems: ReadonlyArray<ICommandBarItemOptions>;
  @Input() overflowItems: ReadonlyArray<ICommandBarItemOptions>;

  @Output() readonly onDataReduced = new EventEmitter<{ movedItem: ICommandBarItemProps }>();
  @Output() readonly onDataGrown = new EventEmitter<{ movedItem: ICommandBarItemProps }>();

  /** @internal */
  transformedItems_: ReadonlyArray<ICommandBarItemProps>;
  /** @internal */
  transformedFarItems_: ReadonlyArray<ICommandBarItemProps>;
  /** @internal */
  transformedOverflowItems_: ReadonlyArray<ICommandBarItemProps>;

  constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef) {
    super(elementRef, changeDetectorRef, true);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['items'] && changes['items'].previousValue !== changes['items'].currentValue && changes['items'].currentValue) this._createTransformedItems(changes['items'].currentValue);
    if (changes['farItems'] && changes['farItems'].previousValue !== changes['farItems'].currentValue && changes['farItems'].currentValue) this._createTransformedFarItems(changes['farItems'].currentValue);
    if (changes['overflowItems'] && changes['overflowItems'].previousValue !== changes['overflowItems'].currentValue && changes['overflowItems'].currentValue) this._createTransformedOverflowItems(changes['overflowItems'].currentValue);

    super.ngOnChanges(changes);
  }

  private _createTransformedItems(newItems: ReadonlyArray<ICommandBarItemOptions>) {
    this.transformedItems_ = newItems.map(item => this._transformCommandBarItemOptionsToProps(item));
  }

  private _createTransformedFarItems(newItems: ReadonlyArray<ICommandBarItemOptions>) {
    this.transformedFarItems_ = newItems.map(item => this._transformCommandBarItemOptionsToProps(item));
  }

  private _createTransformedOverflowItems(newItems: ReadonlyArray<ICommandBarItemOptions>) {
    this.transformedOverflowItems_ = newItems.map(item => this._transformCommandBarItemOptionsToProps(item));
  }

  private _transformCommandBarItemOptionsToProps(itemOptions: ICommandBarItemOptions): ICommandBarItemProps {
    const sharedProperties = omit(itemOptions, 'renderIcon', 'render');

    const iconRenderer = this.createInputJsxRenderer(itemOptions.renderIcon);
    const renderer = this.createInputJsxRenderer(itemOptions.render);

    return Object.assign(
      {},
      sharedProperties,
      iconRenderer && { onRenderIcon: (props) => iconRenderer({ contextualMenuItemProps: props }) } as Pick<ICommandBarItemProps, 'onRenderIcon'>,
      renderer && { onRender: (item, dismissMenu) => renderer({ item, dismissMenu }) } as Pick<ICommandBarItemProps, 'onRender'>,
    ) as ICommandBarItemProps;
  }
}

export interface ICommandBarItemOptions<TData = any> extends Pick<ICommandBarItemProps, 'iconOnly' | 'buttonStyles' | 'cacheKey' | 'renderedInOverflow' | 'componentRef' | 'key' | 'text' | 'secondaryText' | 'iconProps' | 'submenuIconProps' | 'disabled' | 'primaryDisabled' | 'shortCut' | 'canCheck' | 'checked' | 'split' | 'data' | 'onClick' | 'href' | 'target' | 'rel' | 'subMenuProps' | 'getItemClassNames' | 'getSplitButtonVerticalDividerClassNames' | 'sectionProps' | 'className' | 'style' | 'ariaLabel' | 'title' | 'onMouseDown' | 'role' | 'customOnRenderListLength' | 'keytipProps' | 'inactive'> {
  readonly [propertyName: string]: any;
  readonly renderIcon?: InputRendererOptions<{ contextualMenuItemProps: IContextualMenuItemProps }>;
  readonly render?: InputRendererOptions<{ item: any, dismissMenu: (ev?: any, dismissAll?: boolean) => void }>;
  readonly data?: TData;
}
