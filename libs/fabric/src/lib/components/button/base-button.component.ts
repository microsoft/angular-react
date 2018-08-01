import { InputRendererOptions, JsxRenderFunc, ReactWrapperComponent } from '@angular-react/core';
import { ChangeDetectorRef, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IButtonProps } from 'office-ui-fabric-react/lib/Button';

export abstract class FabBaseButtonComponent extends ReactWrapperComponent<IButtonProps> implements OnInit {
  @Input()
  componentRef?: IButtonProps['componentRef'];
  @Input()
  href?: IButtonProps['href'];
  @Input()
  primary?: IButtonProps['primary'];
  @Input()
  uniqueId?: IButtonProps['uniqueId'];
  @Input()
  disabled?: IButtonProps['disabled'];
  @Input()
  primaryDisabled?: IButtonProps['primaryDisabled'];
  @Input()
  styles?: IButtonProps['styles'];
  @Input()
  theme?: IButtonProps['theme'];
  @Input()
  checked?: IButtonProps['checked'];
  @Input()
  className?: IButtonProps['className'];
  @Input()
  ariaLabel?: IButtonProps['ariaLabel'];
  @Input()
  ariaDescription?: IButtonProps['ariaDescription'];
  @Input()
  ariaHidden?: IButtonProps['ariaHidden'];
  @Input()
  text?: IButtonProps['text'];
  @Input()
  iconProps?: IButtonProps['iconProps'];
  @Input()
  menuProps?: IButtonProps['menuProps'];
  @Input()
  split?: IButtonProps['split'];
  @Input()
  menuIconProps?: IButtonProps['menuIconProps'];
  @Input()
  splitButtonAriaLabel?: IButtonProps['splitButtonAriaLabel'];
  @Input()
  menuAs?: IButtonProps['menuAs'];
  @Input()
  secondaryText?: IButtonProps['secondaryText'];
  @Input()
  toggled?: IButtonProps['toggled'];
  @Input()
  data?: IButtonProps['data'];
  @Input()
  getClassNames?: IButtonProps['getClassNames'];
  @Input()
  getSplitButtonClassNames?: IButtonProps['getSplitButtonClassNames'];
  @Input()
  menuTriggerKeyCode?: IButtonProps['menuTriggerKeyCode'];
  @Input()
  keytipProps?: IButtonProps['keytipProps'];
  @Input()
  persistMenu?: IButtonProps['persistMenu'];

  @Input()
  renderIcon?: InputRendererOptions<IButtonProps>;
  @Input()
  renderText?: InputRendererOptions<IButtonProps>;
  @Input()
  renderDescription?: InputRendererOptions<IButtonProps>;
  @Input()
  renderAriaDescription?: InputRendererOptions<IButtonProps>;
  @Input()
  renderChildren?: InputRendererOptions<IButtonProps>;
  @Input()
  renderMenuIcon?: InputRendererOptions<IButtonProps>;

  @Output()
  readonly onClick = new EventEmitter<MouseEvent>();
  @Output()
  readonly onMenuClick = new EventEmitter<{ ev?: MouseEvent | KeyboardEvent; button?: IButtonProps }>();
  @Output()
  readonly onAfterMenuDismiss = new EventEmitter<void>();

  onRenderIcon: (props?: IButtonProps, defaultRender?: JsxRenderFunc<IButtonProps>) => JSX.Element;
  onRenderText: (props?: IButtonProps, defaultRender?: JsxRenderFunc<IButtonProps>) => JSX.Element;
  onRenderDescription: (props?: IButtonProps, defaultRender?: JsxRenderFunc<IButtonProps>) => JSX.Element;
  onRenderAriaDescription: (props?: IButtonProps, defaultRender?: JsxRenderFunc<IButtonProps>) => JSX.Element;
  onRenderChildren: (props?: IButtonProps, defaultRender?: JsxRenderFunc<IButtonProps>) => JSX.Element;
  onRenderMenuIcon: (props?: IButtonProps, defaultRender?: JsxRenderFunc<IButtonProps>) => JSX.Element;

  constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef) {
    super(elementRef, changeDetectorRef, true);

    // coming from React context - we need to bind to this so we can access the Angular Component properties
    this.onMenuClickHandler = this.onMenuClickHandler.bind(this);
  }

  ngOnInit() {
    this.onRenderIcon = this.createRenderPropHandler(this.renderIcon);
    this.onRenderText = this.createRenderPropHandler(this.renderText);
    this.onRenderDescription = this.createRenderPropHandler(this.renderDescription);
    this.onRenderAriaDescription = this.createRenderPropHandler(this.renderAriaDescription);
    this.onRenderChildren = this.createRenderPropHandler(this.renderChildren);
    this.onRenderMenuIcon = this.createRenderPropHandler(this.renderMenuIcon);
  }

  onMenuClickHandler(ev?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>, button?: IButtonProps) {
    this.onMenuClick.emit({
      ev: ev && ev.nativeEvent,
      button,
    });
  }

  onClickHandler(ev?: React.MouseEvent) {
    this.onClick.emit(ev.nativeEvent);
  }
}
