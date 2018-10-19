// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { ComponentRef, EmbeddedViewRef, TemplateRef } from '@angular/core';
import { createReactContentElement, ReactContentProps } from '../renderer/react-content';

export interface RenderPropContext<TContext extends object> {
  readonly render: (context: TContext) => JSX.Element;
}

function renderReactContent(rootNodes: HTMLElement[], additionalProps?: ReactContentProps): JSX.Element {
  return createReactContentElement(rootNodes, additionalProps);
}

/**
 * Wrap a `TemplateRef` with a `JSX.Element`.
 *
 * @param templateRef The template to wrap
 * @param additionalProps optional additional props to pass to the `ReactContent` object that will render the content.
 */
export function createTemplateRenderer<TContext extends object>(
  templateRef: TemplateRef<TContext>,
  additionalProps?: ReactContentProps
): RenderPropContext<TContext> {
  let viewRef: EmbeddedViewRef<TContext> | null = null;
  let renderedJsx: JSX.Element | null = null;

  return {
    render: (context: TContext) => {
      if (!viewRef) {
        viewRef = templateRef.createEmbeddedView(context);
        renderedJsx = renderReactContent(viewRef.rootNodes, additionalProps);
      } else {
        // Mutate the template's context
        Object.assign(viewRef.context, context);
      }
      viewRef.detectChanges();

      return renderedJsx;
    },
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
