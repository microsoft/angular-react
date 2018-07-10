import { ReactWrapperComponent, InputRendererOptions } from '@angular-react/core';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild, ChangeDetectorRef, KeyValueDiffers, KeyValueDiffer, IterableDiffer, IterableDiffers, OnChanges, DoCheck, OnInit, SimpleChanges } from '@angular/core';
import { ICommandBarItemProps, ICommandBarProps } from 'office-ui-fabric-react/lib/CommandBar';
import { IContextualMenuItemProps } from 'office-ui-fabric-react/lib/ContextualMenu';
import omit from "../../utils/omit";
import { ArrayItemsDifferFactory, ArrayItemsDiffer } from '../../utils/array-items-differ';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'fab-command-bar' }
})
export class FabCommandBarComponent extends ReactWrapperComponent<ICommandBarProps> implements OnInit, OnChanges, DoCheck {

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

  @Input() overflowItems: ICommandBarItemOptions[];
  @Input() items: ICommandBarItemOptions[];
  @Input() farItems: ICommandBarItemOptions[];

  @Output() readonly onDataReduced = new EventEmitter<{ movedItem: ICommandBarItemProps }>();
  @Output() readonly onDataGrown = new EventEmitter<{ movedItem: ICommandBarItemProps }>();

  transformedItems: ICommandBarItemProps[];
  transformedFarItems: ICommandBarItemProps[];
  transformedOverflowItems: ICommandBarItemProps[];

  private readonly _differFactory: ArrayItemsDifferFactory;
  private readonly _differs = new Map<string, ArrayItemsDiffer<ICommandBarItemProps>>();

  constructor(
    elementRef: ElementRef,
    changeDetectorRef: ChangeDetectorRef,
    iterableDiffers: IterableDiffers,
    kvDiffers: KeyValueDiffers
  ) {
    super(elementRef, changeDetectorRef, true);

    this._differFactory = new ArrayItemsDifferFactory(iterableDiffers, kvDiffers);
  }

  ngOnInit() {
    if (this.items) this._createDiffer('items', () => this._createTransformedItems());
    if (this.farItems) this._createDiffer('farItems', () => this._createTransformedFarItems());
    if (this.overflowItems) this._createDiffer('overflowItems', () => this._createTransformedOverflowItems());
  }

  ngDoCheck() {
    this._differs.forEach((differ, key) => differ.detectChanges(this[key]));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['items']) this._createDiffer('items', () => this._createTransformedItems());
    if (changes['farItems']) this._createDiffer('farItems', () => this._createTransformedFarItems());
    if (changes['overflowItems']) this._createDiffer('overflowItems', () => this._createTransformedOverflowItems());
  }

  private _createDiffer(key: 'items' | 'farItems' | 'overflowItems', recreateItems: () => void) {
    this._differs.set(
      key,
      this._differFactory.createDiffer(
        this[key],
        () => {
          recreateItems();
          this.detectChanges();
        },
        () => this.detectChanges(),
      )
    );
  }

  private _createTransformedItems() {
    if (this.items) this.transformedItems = this.items.map(item => this._transformCommandBarItemOptionsToProps(item));
  }

  private _createTransformedFarItems() {
    if (this.farItems) this.transformedFarItems = this.farItems.map(item => this._transformCommandBarItemOptionsToProps(item));
  }

  private _createTransformedOverflowItems() {
    if (this.overflowItems) this.transformedOverflowItems = this.overflowItems.map(item => this._transformCommandBarItemOptionsToProps(item));
  }

  private _transformCommandBarItemOptionsToProps(itemOptions: ICommandBarItemOptions): ICommandBarItemProps {
    const sharedProperties = omit(itemOptions, 'renderIcon', 'render');

    const iconRenderer = this.createInputJsxRenderer(itemOptions.renderIcon);
    const renderer = this.createInputJsxRenderer(itemOptions.render);

    return Object.assign(
      itemOptions,
      iconRenderer && { onRenderIcon: (props) => iconRenderer(props) } as Pick<ICommandBarItemProps, 'onRenderIcon'>,
      renderer && { onRender: (item, dismissMenu) => renderer({ item, dismissMenu }) } as Pick<ICommandBarItemProps, 'onRender'>,
    ) as ICommandBarItemProps;
  }
}

export interface ICommandBarItemOptions extends Pick<ICommandBarItemProps, 'iconOnly' | 'buttonStyles' | 'cacheKey' | 'renderedInOverflow' | 'componentRef' | 'key' | 'text' | 'secondaryText' | 'iconProps' | 'submenuIconProps' | 'disabled' | 'primaryDisabled' | 'shortCut' | 'canCheck' | 'checked' | 'split' | 'data' | 'onClick' | 'href' | 'target' | 'rel' | 'subMenuProps' | 'getItemClassNames' | 'getSplitButtonVerticalDividerClassNames' | 'sectionProps' | 'className' | 'style' | 'ariaLabel' | 'title' | 'onMouseDown' | 'role' | 'customOnRenderListLength' | 'keytipProps' | 'inactive'> {
  [propertyName: string]: any;
  renderIcon?: InputRendererOptions<IContextualMenuItemProps>;
  render?: InputRendererOptions<{ item: any, dismissMenu: (ev?: any, dismissAll?: boolean) => void }>;
}
