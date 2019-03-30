// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { ComponentRef, NgZone, TemplateRef } from '@angular/core';
import { createReactContentElement, ReactContentProps } from '../renderer/react-content';
import { createReactTemplateElement } from './react-template';

export interface RenderPropContext<TContext extends object> {
  readonly render: (context: TContext) => JSX.Element;
}

export function isRenderPropContext<TContext extends object>(x: unknown): x is RenderPropContext<TContext> {
  if (typeof x !== 'object') {
    return false;
  }

  const maybeRenderPropContext = x as RenderPropContext<TContext>;
  return maybeRenderPropContext.render && typeof maybeRenderPropContext.render === 'function';
}

function renderReactContent(rootNodes: HTMLElement[], additionalProps?: ReactContentProps): JSX.Element {
  return createReactContentElement(rootNodes, additionalProps);
}

/**
 * Wrap a `TemplateRef` with a `JSX.Element`.
 *
 * @param templateRef The template to wrap
 * @param ngZone A zone used for tracking & triggering updates to the template
 * @param additionalProps optional additional props to pass to the `ReactContent` object that will render the content.
 */
export function createTemplateRenderer<TContext extends object>(
  templateRef: TemplateRef<TContext>,
  ngZone: NgZone,
  additionalProps?: ReactContentProps
): RenderPropContext<TContext> {
  return {
    render: (context: TContext) => createReactTemplateElement(templateRef, context, ngZone, additionalProps),
  };
}

/**
 * Wrap a function resolving to an `HTMLElement` with a `JSX.Element`.
 *
 * @param htmlRenderFunc The function to wrap
 * @param additionalProps optional additional props to pass to the `ReactContent` object that will render the content.
 */
export function createHtmlRenderer<TContext extends object>(
  htmlRenderFunc: (context: TContext) => HTMLElement,
  additionalProps?: ReactContentProps
): RenderPropContext<TContext> {
  return {
    render: context => {
      const rootHtmlElement = htmlRenderFunc(context);
      return renderReactContent([rootHtmlElement], additionalProps);
    },
  };
}

/**
 * Wrap a `ComponentRef` with a `JSX.Element`.
 *
 * @param htmlRenderFunc The component reference to wrap
 * @param additionalProps optional additional props to pass to the `ReactContent` object that will render the content.
 */
export function createComponentRenderer<TContext extends object>(
  componentRef: ComponentRef<TContext>,
  additionalProps?: ReactContentProps
): RenderPropContext<TContext> {
  let renderedJsx: JSX.Element | null = null;

  return {
    render: context => {
      if (!renderedJsx) {
        renderedJsx = renderReactContent([componentRef.location.nativeElement], additionalProps);
      }

      Object.assign(componentRef.instance, context);
      componentRef.changeDetectorRef.detectChanges();

      return renderedJsx;
    },
  };
}
