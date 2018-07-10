import { ReactiveReactWrapperComponent, InputRendererOptions, isReactNode } from '@angular-react/core';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ICommandBarItemProps, ICommandBarProps } from 'office-ui-fabric-react/lib/CommandBar';
import { IContextualMenuItemProps } from 'office-ui-fabric-react/lib/ContextualMenu';
import omit from "../../utils/omit";
import { IObservableArray, extendObservable, observable, isObservable, computed, autorun } from 'mobx';

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
  _items: any;

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
  /*   @Input() set items(value: IObservableArray<ICommandBarItemOptions>) {
      this._items = value;

      if (value) {
        extendObservable(this, {
          get transformedItems() { return this._items.map(item => this._transformCommandBarItemOptionsToProps(item)); },
        }, {
          transformedItems: computed
        });
      }
    }

    get items(): IObservableArray<ICommandBarItemOptions> {
      return this._items;
    } */

  @Input() farItems: IObservableArray<ICommandBarItemOptions>;

  @Output() readonly onDataReduced = new EventEmitter<{ movedItem: ICommandBarItemProps }>();
  @Output() readonly onDataGrown = new EventEmitter<{ movedItem: ICommandBarItemProps }>();

  @computed({ keepAlive: true, requiresReaction: false}) get transformedItems(): ICommandBarItemProps[] {
    if (!this.items) return [];

    return this.items.map(item => this._transformCommandBarItemOptionsToProps(item));
  }

  @computed get transformedFarItems(): ICommandBarItemProps[] {
    if (!this.farItems) return undefined;
    return this.farItems.map(this._transformCommandBarItemOptionsToProps);
  }

  @computed get transformedOverflowItems(): ICommandBarItemProps[] {
    if (!this.overflowItems) return undefined;
    return this.overflowItems.map(this._transformCommandBarItemOptionsToProps);
  }

  constructor(elementRef: ElementRef) {
    super(elementRef);

    this._transformCommandBarItemOptionsToProps = this._transformCommandBarItemOptionsToProps.bind(this);
  }

  private _transformCommandBarItemOptionsToProps(itemOptions: ICommandBarItemOptions): ICommandBarItemProps {
    // this.observe(itemOptions);

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
