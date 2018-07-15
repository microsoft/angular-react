import {
  AfterViewInit,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  Injector,
  TemplateRef,
  Type,
  ChangeDetectorRef,
  OnChanges,
  SimpleChanges,
  HostBinding,
  Input,
} from '@angular/core';
import toStyle from 'css-to-style';

import { isReactNode } from '../renderer/react-node';
import { renderComponent, renderFunc, renderTemplate } from '../renderer/renderprop-helpers';
import { unreachable } from '../utils/types/unreachable';

type AttributeNameAlternative = [string, string | undefined];

const forbiddenAttributesAsProps: ReadonlyArray<AttributeNameAlternative> = [
  ['key', null],
  ['class', 'rClass'],
  ['style', 'rStyle'],
];

// Forbidden attributes are still ignored, since they may be set from the wrapper components themselves (forbidden is only applied for users of the wrapper components)
const ignoredAttributeMatchers = [/^_?ng-?.*/, /^style$/, /^class$/];

const ngClassRegExp = /^ng-/;

export interface RenderComponentOptions<TContext extends object> {
  readonly componentType: Type<TContext>;
  readonly factoryResolver: ComponentFactoryResolver;
  readonly injector: Injector;
}

export type InputRendererOptions<TContext extends object> =
  | TemplateRef<TContext>
  | ((context: TContext) => HTMLElement)
  | ComponentRef<TContext>
  | RenderComponentOptions<TContext>;

export type JsxRenderFunc<TContext> = (context: TContext) => JSX.Element;

/**
 * Base class for Angular @Components wrapping React Components.
 * Simplifies some of the handling around passing down props and setting CSS on the host component.
 */
// NOTE: TProps is not used at the moment, but a preparation for a potential future change.
export abstract class ReactWrapperComponent<TProps extends {}> implements AfterViewInit, OnChanges {
  private _rClass: string;
  private _rStyle: string;

  protected abstract reactNodeRef: ElementRef;

  /**
   * Alternative to `class` using the same syntax.
   *
   * @description Since this is a wrapper component, sticking to the virtual DOM concept, this should have any styling of its own.
   * Any value passes to `rClass` will be passed to the root component's class.
   */
  @Input()
  set rClass(value: string) {
    this._rClass = value;
    if (isReactNode(this.reactNodeRef.nativeElement)) {
      this.reactNodeRef.nativeElement.setProperty('className', value);
      this.changeDetectorRef.detectChanges();
    }
  }

  get rClass(): string {
    return this._rClass;
  }

  /**
   * Alternative to `style` using the same syntax.
   *
   * @description Since this is a wrapper component, sticking to the virtual DOM concept, this should have any styling of its own.
   * Any value passes to `rStyle` will be passed to the root component's style.
   */
  @Input()
  set rStyle(value: string) {
    this._rStyle = value;
    if (isReactNode(this.reactNodeRef.nativeElement)) {
      this.reactNodeRef.nativeElement.setProperty('style', toStyle(value));
      this.changeDetectorRef.detectChanges();
    }
  }

  get rStyle(): string {
    return this._rStyle;
  }

  /**
   * Creates an instance of ReactWrapperComponent.
   * @param elementRef The host element.
   * @param setHostDisplay Whether the host's `display` should be set to the root child node's `display`. defaults to `false`
   */
  constructor(
    public readonly elementRef: ElementRef,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly setHostDisplay: boolean = false
  ) {}

  ngAfterViewInit() {
    this._passAttributesAsProps();

    if (this.setHostDisplay) {
      this._setHostDisplay();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this._passAttributesAsProps();

    this.detectChanges();
  }

  /**
   * Trigger change detection on the component.
   */
  protected detectChanges() {
    if (isReactNode(this.reactNodeRef.nativeElement)) {
      this.reactNodeRef.nativeElement.setRenderPending();
    }

    this.changeDetectorRef.markForCheck();
  }

  /**
   * Create an JSX renderer for an `@Input` property.
   * @param input The input property
   */
  protected createInputJsxRenderer<TContext extends object>(
    input: InputRendererOptions<TContext>
  ): JsxRenderFunc<TContext> | undefined {
    if (input === undefined) {
      return undefined;
    }

    if (input instanceof TemplateRef) {
      return (context: TContext) => renderTemplate(input, context);
    }

    if (input instanceof ComponentRef) {
      return (context: TContext) => renderComponent(input, context);
    }

    if (input instanceof Function) {
      return (context: TContext) => renderFunc(input, context);
    }

    if (typeof input === 'object') {
      const { componentType, factoryResolver, injector } = input;
      const componentFactory = factoryResolver.resolveComponentFactory(componentType);
      const componentRef = componentFactory.create(injector);

      return (context: TContext) => renderComponent(componentRef, context);
    }

    unreachable(input);
  }

  /**
   * Create an event handler for a render prop
   * @param renderInputValue the value of the render `@Input` property.
   * @param jsxRenderer an optional renderer to use.
   */
  protected createRenderPropHandler<TProps extends object>(
    renderInputValue: InputRendererOptions<TProps>,
    jsxRenderer?: JsxRenderFunc<TProps>
  ): (props?: TProps, defaultRender?: JsxRenderFunc<TProps>) => JSX.Element | null {
    const renderer = jsxRenderer || this.createInputJsxRenderer(renderInputValue);

    return (props?: TProps, defaultRender?: JsxRenderFunc<TProps>) => {
      if (!renderInputValue) {
        return typeof defaultRender === 'function' ? defaultRender(props) : null;
      }

      return renderer(props);
    };
  }

  private _passAttributesAsProps() {
    const hostAttributes = Array.from((this.elementRef.nativeElement as HTMLElement).attributes);

    if (!this.reactNodeRef || !isReactNode(this.reactNodeRef.nativeElement)) {
      throw new Error('reactNodeRef must hold a reference to a ReactNode');
    }

    // Ensure there are no blacklisted props. Suggest alternative as error if there is any
    hostAttributes.forEach(attr => {
      const [forbidden, alternativeAttrName] = this._isForbiddenAttribute(attr);
      if (forbidden) {
        throw new Error(
          `[${(this.elementRef
            .nativeElement as HTMLElement).tagName.toLowerCase()}] React wrapper components cannot have the '${
            attr.name
          }' attribute set. Use the following alternative: ${alternativeAttrName || ''}`
        );
      }
    });

    const whitelistedHostAttributes = hostAttributes.filter(attr => !this._isIgnoredAttribute(attr));
    const props = whitelistedHostAttributes.reduce(
      (acc, attr) => ({
        ...acc,
        [attr.name]: attr.value,
      }),
      {}
    );

    this.reactNodeRef.nativeElement.setProperties(props);
  }

  private _setHostDisplay() {
    const nativeElement: HTMLElement = this.elementRef.nativeElement;

    // We want to wait until child elements are rendered
    setTimeout(() => {
      if (nativeElement.firstElementChild) {
        const rootChildDisplay = getComputedStyle(nativeElement.firstElementChild).display;
        nativeElement.style.display = rootChildDisplay;
      }
    });
  }

  private _isIgnoredAttribute(attr: Attr) {
    return ignoredAttributeMatchers.some(regExp => regExp.test(attr.name));
  }

  private _isForbiddenAttribute(attr: Attr): [boolean, string | undefined] {
    const { name, value } = attr;

    if (name === 'key') return [true, undefined];
    if (name === 'class' && value.split(' ').some(className => !ngClassRegExp.test(className))) return [true, 'rClass'];
    if (name === 'style') {
      const style = toStyle(value);
      // Only allowing style if it's something that changes the display - setting anything else should be done on the child component directly (via the `styles` attribute in fabric for example)
      if (Object.entries(style).filter(([key, value]) => value && key !== 'display').length > 0) {
        return [true, 'rStyle'];
      }
    }

    return [false, undefined];
  }
}
