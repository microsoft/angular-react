import { AfterViewInit, ComponentFactoryResolver, ComponentRef, ElementRef, Injector, TemplateRef, Type, ChangeDetectorRef, OnChanges, SimpleChanges, HostBinding, Input } from "@angular/core";
import { isReactNode } from "../renderer/react-node";
import { renderComponent, renderFunc, renderTemplate } from "../renderer/renderprop-helpers";
import { unreachable } from "../utils/types/unreachable";
import toStyle from 'css-to-style';

type PropMapper = (value: any) => [string, any];

type AttributeNameAlternative = [string, string | undefined];

const forbiddenAttributesAsProps: ReadonlyArray<AttributeNameAlternative> = [
  ['key', null],
  ['class', 'rClass'],
  ['style', 'rStyle'],
];

const ignoredAttributeMatchers = [
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

  @Input() set rClass(value: string) {
    if (isReactNode(this.reactNodeRef.nativeElement)) {
      this.reactNodeRef.nativeElement.setProperty('className', value);
      this.changeDetectorRef.detectChanges();
    }
  }

  @Input() set rStyle(value: string) {
    if (isReactNode(this.reactNodeRef.nativeElement)) {
      this.reactNodeRef.nativeElement.setProperty('style', toStyle(value));
      this.changeDetectorRef.detectChanges();
    }
  }

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

    if (!this.reactNodeRef || !isReactNode(this.reactNodeRef.nativeElement)) {
      throw new Error('reactNodeRef must hold a reference to a ReactNode');
    }

    // Ensure there are no blacklisted props. Suggest alternative as error if there is any
    hostAttributes.forEach(attr => {
        const altAttrMapping = forbiddenAttributesAsProps.find(([originalAttrName, altAttrName]) => originalAttrName === attr.name);
        if (altAttrMapping) {
          throw new Error(`[${(this.elementRef.nativeElement as HTMLElement).tagName.toLowerCase()}] React wrapper components cannot have the '${attr.name}' attribute set. Use the following alternative: ${altAttrMapping && altAttrMapping[1] || ''}`);
        }
    });

    const whitelistedHostAttributes = hostAttributes.filter(attr => !this._isIgnoredAttribute(attr));
    const props = whitelistedHostAttributes.reduce((acc, attr) => ({
      ...acc,
      [attr.name]: attr.value,
    }), {});

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
}
