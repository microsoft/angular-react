import { ComponentFactoryResolver, Type, Injector, TemplateRef, ComponentRef, NgZone } from '@angular/core';
import {
  RenderPropContext,
  createTemplateRenderer,
  createComponentRenderer,
  createHtmlRenderer,
  isRenderPropContext,
} from '../renderer/renderprop-helpers';
import { ReactContentProps } from '../renderer/react-content';

export type JsxRenderFunc<TContext> = (context: TContext) => JSX.Element;

/**
 * Render props options for creating & rendering a component.
 */
export interface RenderComponentOptions<TContext extends object> {
  readonly componentType: Type<TContext>;
  readonly factoryResolver: ComponentFactoryResolver;
  readonly injector: Injector;
}

function isRenderComponentOptions<TContext extends object>(x: unknown): x is RenderComponentOptions<TContext> {
  if (typeof x !== 'object') {
    return false;
  }

  const maybeRenderComponentOptions = x as RenderComponentOptions<TContext>;
  return (
    maybeRenderComponentOptions.componentType != null &&
    maybeRenderComponentOptions.factoryResolver != null &&
    maybeRenderComponentOptions.injector != null
  );
}

/**
 * Allow intercepting and modifying the default props, which are then used by the default renderer.
 */
export interface RenderPropOptions<TContext extends object> {
  readonly getProps: (defaultProps?: TContext) => TContext;
}

function isRenderPropOptions<TContext extends object>(x: unknown): x is RenderPropOptions<TContext> {
  if (typeof x !== 'object') {
    return false;
  }

  const maybeRenderPropOptions = x as RenderPropOptions<TContext>;
  return maybeRenderPropOptions.getProps && typeof maybeRenderPropOptions.getProps === 'function';
}

/**
 * Various options for passing renderers as render props.
 */
export type InputRendererOptions<TContext extends object> =
  | TemplateRef<TContext>
  | ((context: TContext) => HTMLElement)
  | ComponentRef<TContext>
  | RenderComponentOptions<TContext>
  | RenderPropContext<TContext>
  | RenderPropOptions<TContext>;

export function createInputJsxRenderer<TContext extends object>(
  input: InputRendererOptions<TContext>,
  ngZone: NgZone,
  additionalProps?: ReactContentProps
): JsxRenderFunc<TContext> | undefined {
  if (input instanceof TemplateRef) {
    const templateRenderer = createTemplateRenderer(input, ngZone, additionalProps);
    return (context: TContext) => templateRenderer.render(context);
  }

  if (input instanceof ComponentRef) {
    const componentRenderer = createComponentRenderer(input, additionalProps);
    return (context: TContext) => componentRenderer.render(context);
  }

  if (input instanceof Function) {
    const htmlRenderer = createHtmlRenderer(input, additionalProps);
    return (context: TContext) => htmlRenderer.render(context);
  }

  if (isRenderComponentOptions(input)) {
    const { componentType, factoryResolver, injector } = input;
    const componentFactory = factoryResolver.resolveComponentFactory(componentType);
    const componentRef = componentFactory.create(injector);

    // Call the function again with the created ComponentRef<TContext>
    return createInputJsxRenderer(componentRef, ngZone, additionalProps);
  }
}

export function createRenderPropHandler<TProps extends object>(
  renderInputValue: InputRendererOptions<TProps>,
  ngZone: NgZone,
  options?: {
    jsxRenderer?: JsxRenderFunc<TProps>;
    additionalProps?: ReactContentProps;
  }
): (props?: TProps, defaultRender?: JsxRenderFunc<TProps>) => JSX.Element | null {
  if (isRenderPropContext(renderInputValue)) {
    return renderInputValue.render;
  }

  if (isRenderPropOptions(renderInputValue)) {
    return (props?: TProps, defaultRender?: JsxRenderFunc<TProps>) => {
      return typeof defaultRender === 'function' ? defaultRender(renderInputValue.getProps(props)) : null;
    };
  }

  const renderer =
    (options && options.jsxRenderer) ||
    createInputJsxRenderer(renderInputValue, ngZone, options && options.additionalProps);

  return (props?: TProps, defaultRender?: JsxRenderFunc<TProps>) => {
    if (!renderInputValue) {
      return typeof defaultRender === 'function' ? defaultRender(props) : null;
    }

    return renderer(props);
  };
}
