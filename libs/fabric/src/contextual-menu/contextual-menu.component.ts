// tslint:disable:component-selector
// tslint:disable:no-input-rename
// tslint:disable:no-output-rename
// tslint:disable:use-host-property-decorator
// tslint:disable:no-output-on-prefix

import { InputRendererOptions, JsxRenderFunc, ReactWrapperComponent } from '@angular-react/core';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IContextualMenuItem, IContextualMenuProps } from 'office-ui-fabric-react/lib/components/ContextualMenu';

@Component({
  selector: 'fab-contextual-menu',
  exportAs: 'fabContextualMenu',
  template: `
    <ContextualMenu
      #reactNode
      [responsiveMode]="responsiveMode"
      [componentRef]="componentRef"
      [target]="target"
      [directionalHint]="directionalHint"
      [directionalHintForRTL]="directionalHintForRTL"
      [gapSpace]="gapSpace"
      [beakWidth]="beakWidth"
      [useTargetWidth]="useTargetWidth"
      [useTargetAsMinWidth]="useTargetAsMinWidth"
      [bounds]="bounds"
      [isBeakVisible]="isBeakVisible"
      [coverTarget]="coverTarget"
      [items]="items"
      [labelElementId]="labelElementId"
      [shouldFocusOnMount]="shouldFocusOnMount"
      [shouldFocusOnContainer]="shouldFocusOnContainer"
      [className]="className"
      [isSubMenu]="isSubMenu"
      [id]="id"
      [ariaLabel]="ariaLabel"
      [doNotLayer]="doNotLayer"
      [directionalHintFixed]="directionalHintFixed"
      [calloutProps]="calloutProps"
      [title]="title"
      [styles]="styles"
      [theme]="theme"
      [subMenuHoverDelay]="subMenuHoverDelay"
      [focusZoneProps]="focusZoneProps"
      [hidden]="hidden"
      [getMenuClassNames]="getMenuClassNames"
      [ItemClick]="onItemClickHandler"
      [Dismiss]="onDismissHandler"
      [MenuOpened]="onMenuOpenedHandler"
      [MenuDismissed]="onMenuDismissedHandler"
      [contextualMenuItemAs]="contextualMenuItemAs"
      [RenderSubMenu]="renderSubMenu && onRenderSubMenu">
    </ContextualMenu>
  `,
  styles: [
    'react-renderer',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'fab-contextual-menu' }
})
export class FabContextualMenuComponent extends ReactWrapperComponent<IContextualMenuProps> implements OnInit {
  @ViewChild('reactNode') protected reactNodeRef

  @Input() responsiveMode?: IContextualMenuProps['responsiveMode'];
  @Input() componentRef?: IContextualMenuProps['componentRef'];
  @Input() target?: IContextualMenuProps['target'];
  @Input() directionalHint?: IContextualMenuProps['directionalHint'];
  @Input() directionalHintForRTL?: IContextualMenuProps['directionalHintForRTL'];
  @Input() gapSpace?: IContextualMenuProps['gapSpace'];
  @Input() beakWidth?: IContextualMenuProps['beakWidth'];
  @Input() useTargetWidth?: IContextualMenuProps['useTargetWidth'];
  @Input() useTargetAsMinWidth?: IContextualMenuProps['useTargetAsMinWidth'];
  @Input() bounds?: IContextualMenuProps['bounds'];
  @Input() isBeakVisible?: IContextualMenuProps['isBeakVisible'];
  @Input() coverTarget?: IContextualMenuProps['coverTarget'];
  @Input() items: IContextualMenuProps['items'];
  @Input() labelElementId?: IContextualMenuProps['labelElementId'];
  @Input() shouldFocusOnMount?: IContextualMenuProps['shouldFocusOnMount'];
  @Input() shouldFocusOnContainer?: IContextualMenuProps['shouldFocusOnContainer'];
  @Input() className?: IContextualMenuProps['className'];
  @Input() isSubMenu?: IContextualMenuProps['isSubMenu'];
  @Input() id?: IContextualMenuProps['id'];
  @Input() ariaLabel?: IContextualMenuProps['ariaLabel'];
  @Input() doNotLayer?: IContextualMenuProps['doNotLayer'];
  @Input() directionalHintFixed?: IContextualMenuProps['directionalHintFixed'];
  @Input() calloutProps?: IContextualMenuProps['calloutProps'];
  @Input() title?: IContextualMenuProps['title'];
  @Input() styles?: IContextualMenuProps['styles'];
  @Input() theme?: IContextualMenuProps['theme'];
  @Input() subMenuHoverDelay?: IContextualMenuProps['subMenuHoverDelay'];
  @Input() focusZoneProps?: IContextualMenuProps['focusZoneProps'];
  @Input() hidden?: IContextualMenuProps['hidden'];
  @Input() getMenuClassNames?: IContextualMenuProps['getMenuClassNames'];
  @Input() itemClick?: (ev?: MouseEvent | KeyboardEvent, item?: IContextualMenuItem) => boolean | void;
  @Input() contextualMenuItemAs?: IContextualMenuProps['contextualMenuItemAs'];

  @Input() renderSubMenu?: InputRendererOptions<IContextualMenuProps>;

  @Output() readonly onDismiss = new EventEmitter<{ ev?: any, dismissAll?: boolean }>();
  @Output() readonly onMenuOpened = new EventEmitter<{ contextualMenu?: IContextualMenuProps }>();
  @Output() readonly onMenuDismissed = new EventEmitter<{ contextualMenu?: IContextualMenuProps }>();

  // Non Fabric-React props, added for API convenience
  @Output() readonly onItemClick = new EventEmitter<{ ev?: MouseEvent | KeyboardEvent, item?: IContextualMenuItem }>();

  onRenderSubMenu: (props?: IContextualMenuProps, defaultRender?: JsxRenderFunc<IContextualMenuProps>) => JSX.Element;;

  constructor(elementRef: ElementRef) {
    super(elementRef);

    // coming from React context - we need to bind to this so we can access the Angular Component properties
    this.onItemClickHandler = this.onItemClickHandler.bind(this);
    this.onDismissHandler = this.onDismissHandler.bind(this);
    this.onMenuOpenedHandler = this.onMenuOpenedHandler.bind(this);
    this.onMenuDismissedHandler = this.onMenuDismissedHandler.bind(this);
  }

  ngOnInit() {
    this.onRenderSubMenu = this.createRenderPropHandler(this.renderSubMenu);
  }

  onItemClickHandler(ev?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>, item?: IContextualMenuItem): boolean | void {
    // Emit as Output
    this.onItemClick.emit({
      ev: ev && ev.nativeEvent,
      item,
    });

    // Call itemClick input in case it returns a boolean, and pass it back to native React component
    if (this.itemClick && typeof this.itemClick === 'function') {
      return this.itemClick(ev && ev.nativeEvent, item);
    }
  }

  onDismissHandler(ev?: any, dismissAll?: boolean) {
    this.onDismiss.emit({
      ev,
      dismissAll,
    });
  }

  onMenuOpenedHandler(contextualMenu?: IContextualMenuProps) {
    this.onMenuOpened.emit({
      contextualMenu,
    });
  }

  onMenuDismissedHandler(contextualMenu?: IContextualMenuProps) {
    this.onMenuDismissed.emit({
      contextualMenu,
    });
  }
}
