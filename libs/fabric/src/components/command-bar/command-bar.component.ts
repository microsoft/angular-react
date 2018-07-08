import { ReactWrapperComponent, InputRendererOptions } from '@angular-react/core';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ICommandBarItemProps, ICommandBarProps } from 'office-ui-fabric-react/lib/components/CommandBar';
import { IContextualMenuItemProps } from 'office-ui-fabric-react/lib/components/ContextualMenu';
import omit from "../../utils/omit";

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
export class FabCommandBarComponent extends ReactWrapperComponent<ICommandBarProps> {

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

  @Input() set items(value: ICommandBarItemOptions[]) {
    this._items = value;

    if (value) this.transformedItems = value.map(this._transformCommandBarItemOptionsToProps);
  }

  get items(): ICommandBarItemOptions[] {
    return this._items;
  }

  @Input() set farItems(value: ICommandBarItemOptions[]) {
    this._farItems = value;

    if (value) this.transformedFarItems = value.map(this._transformCommandBarItemOptionsToProps);
  }

  get farItems(): ICommandBarItemOptions[] {
    return this._farItems;
  }

  @Output() readonly onDataReduced = new EventEmitter<{ movedItem: ICommandBarItemProps }>();
  @Output() readonly onDataGrown = new EventEmitter<{ movedItem: ICommandBarItemProps }>();

  transformedItems: ICommandBarItemProps[];
  transformedFarItems: ICommandBarItemProps[];
  transformedOverflowItems: ICommandBarItemProps[];

  private _items: ICommandBarItemOptions[];
  private _farItems: ICommandBarItemOptions[];
  private _overflowItems: ICommandBarItemOptions[];

  constructor(elementRef: ElementRef, private readonly changeDete\ctor: ChangeDetectorRef) {
    super(elementRef);

    this._transformCommandBarItemOptionsToProps = this._transformCommandBarItemOptionsToProps.bind(this);
  }

  detectChanges() {
    // Since React only re-renders when props or state are changed, we need to manually change the props (reference).
    if (this.items) this.items = [...this.items];
    if (this.farItems) this.farItems = [...this.farItems];
    if (this.overflowItems) this.overflowItems = [...this.overflowItems];

    this.changeDetector.detectChanges();
  }

  private _transformCommandBarItemOptionsToProps(itemOptions: ICommandBarItemOptions): ICommandBarItemProps {
    const sharedProperties = omit(itemOptions, 'renderIcon', 'render');

    const iconRenderer = this.createInputJsxRenderer(itemOptions.renderIcon);
    const renderer = this.createInputJsxRenderer(itemOptions.render);

    return Object.assign(
      {},
      sharedProperties,
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
