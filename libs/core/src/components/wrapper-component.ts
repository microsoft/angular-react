import { AfterViewInit, ComponentFactoryResolver, ComponentRef, ElementRef, Injector, TemplateRef, Type, ChangeDetectorRef, OnChanges, SimpleChanges, HostBinding } from "@angular/core";
import { isReactNode } from "../renderer/react-node";
import { renderComponent, renderFunc, renderTemplate } from "../renderer/renderprop-helpers";
import { unreachable } from "../utils/types/unreachable";
import toStyle from 'css-to-style';

type PropMapper = (value: any) => [string, any];

const blacklistedAttributesAsProps = [
  'key'
];

const knownPropMapping: StringMap<PropMapper> = {
  'class': (value: string): [string, string] => ['className', value],
  'for': (value: string): [string, string] => ['htmlFor', value],
  'style': (value: string): [string, CSSStyleDeclaration] => ['style', toStyle(value)],
};

const blacklistedAttributeMatchers = [
  /^_?ng-?.*/
];

export interface RenderComponentOptions<TContext extends object> {
  readonly componentType: Type<TContext>;
  readonly factoryResolver: ComponentFactoryResolver;
  readonly injector: Injector;
}

export type InputRendererOptions<TContext extends object> =
  TemplateRef<TContext>
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

  protected abstract reactNodeRef: ElementRef;

  /**
   * Creates an instance of ReactWrapperComponent.
   * @param elementRef The host element.
   * @param setHostDisplay Whether the host's `display` should be set to the root child node's `display`. defaults to `false`
   */
  constructor(public readonly elementRef: ElementRef, private readonly changeDetectorRef: ChangeDetectorRef, private readonly setHostDisplay: boolean = false) { }

  ngAfterViewInit() {
    this._passAttributesAsProps();

    if (this.setHostDisplay) {
      this._setHostDisplay();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this._passAttributesAsProps();
  }

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
  protected createInputJsxRenderer<TContext extends object>(input: InputRendererOptions<TContext>): JsxRenderFunc<TContext> | undefined {
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

    if (typeof input === "object") {
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
  protected createRenderPropHandler<TProps extends object>(renderInputValue: InputRendererOptions<TProps>, jsxRenderer?: JsxRenderFunc<TProps>): (props?: TProps, defaultRender?: JsxRenderFunc<TProps>) => JSX.Element | null {
    const renderer = jsxRenderer || this.createInputJsxRenderer(renderInputValue);

    return (props?: TProps, defaultRender?: JsxRenderFunc<TProps>) => {
      if (!renderInputValue) {
        return typeof defaultRender === 'function' ? defaultRender(props) : null;
      }

      return renderer(props);
    };
  }

  private _passAttributesAsProps() {
    const hostAttributes = Array.from(
      (this.elementRef.nativeElement as HTMLElement).attributes
    );

    const whitelistedHostAttributes = hostAttributes.filter(attr => !this._isBlacklistedAttribute(attr));
    if (!whitelistedHostAttributes || whitelistedHostAttributes.length === 0) {
      return;
    }

    if (!this.reactNodeRef || !isReactNode(this.reactNodeRef.nativeElement)) {
      throw new Error('reactNodeRef must hold a reference to a ReactNode');
    }

    const props = whitelistedHostAttributes.reduce((acc, attr) => {
      const [transformedKey, transformedValue] = this._transformAttributeToProp(attr.name, attr.value);
      return {
        ...acc,
        [transformedKey]: transformedValue,
      };
    }, {});

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

  private _isBlacklistedAttribute(attr: Attr) {
    if (blacklistedAttributesAsProps.includes(attr.name)) {
      return true;
    }

    return blacklistedAttributeMatchers.some(regExp => regExp.test(attr.name));
  }

  private _transformAttributeToProp(propName: string, propValue: any): [string, any] {
    if (propName in knownPropMapping) {
      return knownPropMapping[propName](propValue);
    }

    return [propName, propValue];
  }
}
