// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { ComponentRef, TemplateRef } from '@angular/core';
import * as React from 'react';
import { CHILDREN_TO_APPEND_PROP, ReactContent, ReactContentProps } from '../renderer/react-content';

function renderReactContent(rootNodes: HTMLElement[], additionalProps?: ReactContentProps): JSX.Element {
  return React.createElement(ReactContent, {
    ...additionalProps,
    [CHILDREN_TO_APPEND_PROP]: rootNodes,
  });
}

/**
 * Wrap a `TemplateRef` with a `JSX.Element`.
 *
 * @param templateRef The template to wrap
 * @param context The context to pass to the template
 * @param additionalProps optional additional props to pass to the `ReactContent` object that will render the content.
 */
export function renderTemplate<TContext extends object>(
  templateRef: TemplateRef<TContext>,
  context?: TContext,
  additionalProps?: ReactContentProps
): JSX.Element {
  const viewRef = templateRef.createEmbeddedView(context);
  viewRef.detectChanges();

  return renderReactContent(viewRef.rootNodes, additionalProps);
}

/**
 * Wrap a function resolving to an `HTMLElement` with a `JSX.Element`.
 *
 * @param htmlRenderFunc The function to wrap
 * @param context The context to pass to the function
 * @param additionalProps optional additional props to pass to the `ReactContent` object that will render the content.
 */
export function renderFunc<TContext extends object>(
  htmlRenderFunc: (context: TContext) => HTMLElement,
  context?: TContext,
  additionalProps?: ReactContentProps
): JSX.Element {
  const rootHtmlElement = htmlRenderFunc(context);

  return renderReactContent([rootHtmlElement], additionalProps);
}

/**
 * Wrap a `ComponentRef` with a `JSX.Element`.
 *
 * @param htmlRenderFunc The component reference to wrap
 * @param context The context to pass to the component as `@Input`
 * @param additionalProps optional additional props to pass to the `ReactContent` object that will render the content.
 */
export function renderComponent<TContext extends object>(
  componentRef: ComponentRef<TContext>,
  context?: TContext,
  additionalProps?: ReactContentProps
): JSX.Element {
  Object.assign(componentRef.instance, context);
  componentRef.changeDetectorRef.detectChanges();

  return renderReactContent([componentRef.location.nativeElement], additionalProps);
}
