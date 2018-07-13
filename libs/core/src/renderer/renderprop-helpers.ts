import { ComponentRef, TemplateRef } from "@angular/core";
import * as React from 'react';

import { CHILDREN_TO_APPEND_PROP, ReactContent } from "../renderer/react-content";

function renderReactContent(rootNodes: HTMLElement[]): JSX.Element {
  return React.createElement(
    ReactContent,
    {
      [CHILDREN_TO_APPEND_PROP]: rootNodes
    } as any
  );
}

/**
 * Wrap a `TemplateRef` with a `JSX.Element`.
 *
 * @param templateRef The template to wrap
 * @param context The context to pass to the template
 */
export function renderTemplate<TContext extends object>(templateRef: TemplateRef<TContext>, context?: TContext): JSX.Element {
  const viewRef = templateRef.createEmbeddedView(context);
  viewRef.detectChanges();

  return renderReactContent(viewRef.rootNodes);
}

/**
 * Wrap a function resolving to an `HTMLElement` with a `JSX.Element`.
 *
 * @param htmlRenderFunc The function to wrap
 * @param context The context to pass to the function
 */
export function renderFunc<TContext extends object>(htmlRenderFunc: (context: TContext) => HTMLElement, context?: TContext): JSX.Element {
  const rootHtmlElement = htmlRenderFunc(context);

  return renderReactContent([rootHtmlElement]);
}

/**
 * Wrap a `ComponentRef` with a `JSX.Element`.
 *
 * @param htmlRenderFunc The component reference to wrap
 * @param context The context to pass to the component as `@Input`
 */
export function renderComponent<TContext extends object>(componentRef: ComponentRef<TContext>, context?: TContext): JSX.Element {
  Object.assign(componentRef.instance, context);
  componentRef.changeDetectorRef.detectChanges();

  return renderReactContent([componentRef.location.nativeElement]);
}
