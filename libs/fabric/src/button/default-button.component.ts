// tslint:disable:component-selector
// tslint:disable:no-input-rename
// tslint:disable:no-output-rename
// tslint:disable:use-host-property-decorator
// tslint:disable:no-output-on-prefix

import { InputRendererOptions, ReactWrapperComponent } from '@angular-react/core';
import { JsxRenderFunc } from '@angular-react/core/public-api';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { IContextualMenuProps } from 'office-ui-fabric-react/lib/components/ContextualMenu';

@Component({
  selector: 'fab-default-button',
  exportAs: 'fabDefaultButton',
  template: `
    <DefaultButton
      #reactNode
      [componentRef]="componentRef"
      [href]="href"
      [primary]="primary"
      [uniqueId]="uniqueId"
      [disabled]="disabled"
      [primaryDisabled]="primaryDisabled"
      [styles]="styles"
      [theme]="theme"
      [checked]="checked"
      [className]="className"
      [ariaLabel]="ariaLabel"
      [ariaDescription]="ariaDescription"
      [ariaHidden]="ariaHidden"
      [text]="text"
      [iconProps]="iconProps"
      [menuProps]="menuProps"
      [split]="split"
      [menuIconProps]="menuIconProps"
      [splitButtonAriaLabel]="splitButtonAriaLabel"
      [secondaryText]="secondaryText"
      [toggled]="toggled"
      [data]="data"
      [getClassNames]="getClassNames"
      [getSplitButtonClassNames]="getSplitButtonClassNames"
      [menuTriggerKeyCode]="menuTriggerKeyCode"
      [keytipProps]="keytipProps"
      [persistMenu]="persistMenu"
      [RenderIcon]="renderIcon && onRenderIcon"
      [RenderText]="renderText && onRenderText"
      [RenderDescription]="renderDescription && onRenderDescription"
      [RenderAriaDescription]="renderAriaDescription && onRenderAriaDescription"
      [RenderChildren]="renderChildren && onRenderChildren"
      [RenderMenuIcon]="renderMenuIcon && onRenderMenuIcon"
      [RenderMenu]="renderMenu && onRenderMenu"
      [MenuClick]="onMenuClickHandler"
      (onAfterMenuDismiss)="onAfterMenuDismiss.emit($event)"
>
      <!-- (onClick)="onClick.emit($event)"> -->
      <ReactContent><ng-content></ng-content></ReactContent>
    </DefaultButton>
  `,
  styles: [
    'react-renderer',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'fab-default-button' }
})
export class FabDefaultButtonComponent extends ReactWrapperComponent<IButtonProps> implements OnInit {

  @ViewChild('reactNode') reactNodeRef: ElementRef;

  @Input() componentRef?: IButtonProps['componentRef'];
  @Input() href?: IButtonProps['href'];
  @Input() primary?: IButtonProps['primary'];
  @Input() uniqueId?: IButtonProps['uniqueId'];
  @Input() disabled?: IButtonProps['disabled'];
  @Input() primaryDisabled?: IButtonProps['primaryDisabled'];
  @Input() styles?: IButtonProps['styles'];
  @Input() theme?: IButtonProps['theme'];
  @Input() checked?: IButtonProps['checked'];
  @Input() className?: IButtonProps['className'];
  @Input() ariaLabel?: IButtonProps['ariaLabel'];
  @Input() ariaDescription?: IButtonProps['ariaDescription'];
  @Input() ariaHidden?: IButtonProps['ariaHidden'];
  @Input() text?: IButtonProps['text'];
  @Input() iconProps?: IButtonProps['iconProps'];
  @Input() menuProps?: IButtonProps['menuProps'];
  @Input() split?: IButtonProps['split'];
  @Input() menuIconProps?: IButtonProps['menuIconProps'];
  @Input() splitButtonAriaLabel?: IButtonProps['splitButtonAriaLabel'];
  @Input() secondaryText?: IButtonProps['secondaryText'];
  @Input() toggled?: IButtonProps['toggled'];
  @Input() data?: IButtonProps['data'];
  @Input() getClassNames?: IButtonProps['getClassNames'];
  @Input() getSplitButtonClassNames?: IButtonProps['getSplitButtonClassNames'];
  @Input() menuTriggerKeyCode?: IButtonProps['menuTriggerKeyCode'];
  @Input() keytipProps?: IButtonProps['keytipProps'];
  @Input() persistMenu?: IButtonProps['persistMenu'];

  @Input() renderIcon?: InputRendererOptions<IButtonProps>;
  @Input() renderText?: InputRendererOptions<IButtonProps>;
  @Input() renderDescription?: InputRendererOptions<IButtonProps>;
  @Input() renderAriaDescription?: InputRendererOptions<IButtonProps>;
  @Input() renderChildren?: InputRendererOptions<IButtonProps>;
  @Input() renderMenuIcon?: InputRendererOptions<IButtonProps>;
  @Input() renderMenu?: InputRendererOptions<IContextualMenuProps>;

  @Output() readonly onMenuClick = new EventEmitter<{ ev?: MouseEvent | KeyboardEvent, button?: IButtonProps }>();
  @Output() readonly onAfterMenuDismiss = new EventEmitter<void>();

  onRenderIcon: (props?: IButtonProps, defaultRender?: JsxRenderFunc<IButtonProps>) => JSX.Element;
  onRenderText: (props?: IButtonProps, defaultRender?: JsxRenderFunc<IButtonProps>) => JSX.Element;
  onRenderDescription: (props?: IButtonProps, defaultRender?: JsxRenderFunc<IButtonProps>) => JSX.Element;
  onRenderAriaDescription: (props?: IButtonProps, defaultRender?: JsxRenderFunc<IButtonProps>) => JSX.Element;
  onRenderChildren: (props?: IButtonProps, defaultRender?: JsxRenderFunc<IButtonProps>) => JSX.Element;
  onRenderMenuIcon: (props?: IButtonProps, defaultRender?: JsxRenderFunc<IButtonProps>) => JSX.Element;
  onRenderMenu: (props?: IContextualMenuProps, defaultRender?: JsxRenderFunc<IContextualMenuProps>) => JSX.Element;

  // FIXME: Add native props (`extends React.AllHTMLAttributes<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement | BaseButton | Button>`)

  constructor(elementRef: ElementRef) {
    super(elementRef);

    this.onMenuClickHandler = this.onMenuClickHandler.bind(this);
  }

  ngOnInit() {
    this.onRenderIcon = this.createRenderPropHandler(this.renderIcon);
    this.onRenderText = this.createRenderPropHandler(this.renderText);
    this.onRenderDescription = this.createRenderPropHandler(this.renderDescription);
    this.onRenderAriaDescription = this.createRenderPropHandler(this.renderAriaDescription);
    this.onRenderChildren = this.createRenderPropHandler(this.renderChildren);
    this.onRenderMenuIcon = this.createRenderPropHandler(this.renderMenuIcon);
    this.onRenderMenu = this.createRenderPropHandler(this.renderMenu);
  }

  onMenuClickHandler(ev?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>, button?: IButtonProps) {
    this.onMenuClick.emit({
      ev: ev.nativeEvent,
      button,
    })
  }

  // @Output() onClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

}
