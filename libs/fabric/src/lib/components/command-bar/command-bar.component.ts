import { InputRendererOptions, ReactWrapperComponent } from '@angular-react/core';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
  ContentChild,
  AfterContentInit,
  OnDestroy,
  QueryList,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ICommandBarItemProps, ICommandBarProps } from 'office-ui-fabric-react/lib/CommandBar';
import { IContextualMenuItemProps } from 'office-ui-fabric-react/lib/ContextualMenu';
import { Omit } from '../../declarations/omit';
import omit from '../../utils/omit';
import { TypedChanges, OnChanges } from '../../types/angular/typed-changes';
import {
  CommandBarItemsDirective,
  CommandBarFarItemsDirective,
  CommandBarOverflowItemsDirective,
  CommandBarItemsDirectiveBase,
} from './directives/command-bar-items.directives';
import { CommandBarItemChangedPayload, CommandBarItemDirective } from './directives/command-bar-item.directives';
import { ItemChanges, mergeItemChanges } from '../core/declarative/item-changed';

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
export class FabCommandBarComponent extends ReactWrapperComponent<ICommandBarProps>
  implements OnChanges<FabCommandBarComponent>, AfterContentInit, OnDestroy {
  @ContentChild(CommandBarItemsDirective) readonly itemsDirective: CommandBarItemsDirective;
  @ContentChild(CommandBarFarItemsDirective) readonly farItemsDirective: CommandBarFarItemsDirective;
  @ContentChild(CommandBarOverflowItemsDirective) readonly overflowItemsDirective: CommandBarOverflowItemsDirective;

  @ViewChild('reactNode') protected reactNodeRef: ElementRef;

  @Input()
  componentRef?: ICommandBarProps['componentRef'];
  @Input()
  overflowButtonProps?: ICommandBarProps['overflowButtonProps'];
  @Input()
  overflowButtonAs?: ICommandBarProps['overflowButtonAs'];
  @Input()
  buttonAs?: ICommandBarProps['buttonAs'];
  @Input()
  shiftOnReduce?: ICommandBarProps['shiftOnReduce'];
  @Input()
  className?: ICommandBarProps['className'];
  @Input()
  ariaLabel?: ICommandBarProps['ariaLabel'];
  @Input()
  styles?: ICommandBarProps['styles'];
  @Input()
  theme?: ICommandBarProps['theme'];
  @Input()
  onReduceData?: ICommandBarProps['onReduceData'];
  @Input()
  onGrowData?: ICommandBarProps['onGrowData'];

  @Input()
  items: ReadonlyArray<ICommandBarItemOptions>;
  @Input()
  farItems: ReadonlyArray<ICommandBarItemOptions>;
  @Input()
  overflowItems: ReadonlyArray<ICommandBarItemOptions>;

  @Output()
  readonly onDataReduced = new EventEmitter<{ movedItem: ICommandBarItemProps }>();
  @Output()
  readonly onDataGrown = new EventEmitter<{ movedItem: ICommandBarItemProps }>();

  /** @internal */
  transformedItems_: ReadonlyArray<ICommandBarItemProps>;
  /** @internal */
  transformedFarItems_: ReadonlyArray<ICommandBarItemProps>;
  /** @internal */
  transformedOverflowItems_: ReadonlyArray<ICommandBarItemProps>;

  private readonly _subscriptions: Subscription[] = [];

  constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef) {
    super(elementRef, changeDetectorRef, true);
  }

  ngOnChanges(changes: TypedChanges<this>) {
    if (
      changes['items'] &&
      changes['items'].previousValue !== changes['items'].currentValue &&
      changes['items'].currentValue
    )
      this._createTransformedItems(changes['items'].currentValue);
    if (
      changes['farItems'] &&
      changes['farItems'].previousValue !== changes['farItems'].currentValue &&
      changes['farItems'].currentValue
    )
      this._createTransformedFarItems(changes['farItems'].currentValue);
    if (
      changes['overflowItems'] &&
      changes['overflowItems'].previousValue !== changes['overflowItems'].currentValue &&
      changes['overflowItems'].currentValue
    )
      this._createTransformedOverflowItems(changes['overflowItems'].currentValue);

    super.ngOnChanges(changes);
  }

  ngAfterContentInit() {
    if (this.itemsDirective) this._initDirective(this.itemsDirective, 'items');
    if (this.farItemsDirective) this._initDirective(this.farItemsDirective, 'farItems');
    if (this.overflowItemsDirective) this._initDirective(this.overflowItemsDirective, 'overflowItems');
  }

  ngOnDestroy() {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private _initDirective<TCommandBarItemsDirective extends CommandBarItemsDirectiveBase>(
    directive: TCommandBarItemsDirective,
    itemsPropertyKey: 'items' | 'farItems' | 'overflowItems'
  ) {
    const transformItemsFunc =
      (directive instanceof CommandBarItemsDirective && (newItems => this._createTransformedItems(newItems))) ||
      (directive instanceof CommandBarFarItemsDirective && (newItems => this._createTransformedFarItems(newItems))) ||
      (directive instanceof CommandBarOverflowItemsDirective &&
        (newItems => this._createTransformedOverflowItems(newItems)));
    null;

    if (!transformItemsFunc) {
      throw new Error('Invalid directive given');
    }

    const setItems = (
      mapper: (items: ReadonlyArray<ICommandBarItemOptions>) => ReadonlyArray<ICommandBarItemOptions>
    ) => {
      this[itemsPropertyKey] = mapper(this[itemsPropertyKey]);
      transformItemsFunc(this[itemsPropertyKey]);
    };

    // Initial items
    setItems(() => directive.items);

    // Subscribe to adding/removing items
    this._subscriptions.push(
      directive.onItemsChanged.subscribe((newItems: QueryList<CommandBarItemDirective>) => {
        setItems(() => newItems.map<ICommandBarItemOptions>(directive => directive));
      })
    );

    // Subscribe for existing items changes
    this._subscriptions.push(
      directive.onItemChanged.subscribe(({ key, changes }: CommandBarItemChangedPayload) => {
        setItems(items => items.map(item => (item.key === key ? mergeItemChanges(item, changes) : item)));
        this.detectChanges();
      })
    );
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

    // Legacy render mode is used for the icon because otherwise the icon is to the right of the text (instead of the usual left)
    const iconRenderer = this.createInputJsxRenderer(itemOptions.renderIcon, { legacyRenderMode: true });
    const renderer = this.createInputJsxRenderer(itemOptions.render);

    return Object.assign(
      {},
      sharedProperties,
      iconRenderer &&
        ({ onRenderIcon: props => iconRenderer({ contextualMenuItemProps: props }) } as Pick<
          ICommandBarItemProps,
          'onRenderIcon'
        >),
      renderer &&
        ({ onRender: (item, dismissMenu) => renderer({ item, dismissMenu }) } as Pick<ICommandBarItemProps, 'onRender'>)
    ) as ICommandBarItemProps;
  }
}

export interface ICommandBarItemOptions<TData = any> extends Omit<ICommandBarItemProps, 'onRender' | 'onRenderIcon'> {
  readonly [propertyName: string]: any;
  readonly renderIcon?: InputRendererOptions<ICommandBarItemOptionsRenderIconContext>;
  readonly render?: InputRendererOptions<ICommandBarItemOptionsRenderContext>;
  readonly data?: TData;
}

export interface ICommandBarItemOptionsRenderContext {
  readonly item: any;
  readonly dismissMenu: (ev?: any, dismissAll?: boolean) => void;
}

export interface ICommandBarItemOptionsRenderIconContext {
  readonly contextualMenuItemProps: IContextualMenuItemProps;
}
