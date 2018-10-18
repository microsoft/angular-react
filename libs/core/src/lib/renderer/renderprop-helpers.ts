// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { ComponentRef, NgZone, TemplateRef } from '@angular/core';
import * as React from 'react';
import { CHILDREN_TO_APPEND_PROP, ReactContent, ReactContentProps } from '../renderer/react-content';
import { ReactTemplate } from './react-template';

export interface RenderPropContext<TContext extends object> {
  readonly render: (context: TContext) => JSX.Element;
}

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
 * @param ngZone The NgZone - used to tracking & triggering updates to the template
 * @param additionalProps optional additional props to pass to the `ReactContent` object that will render the content.
 */
export function createTemplateRenderer<TContext extends object>(
  templateRef: TemplateRef<TContext>,
  ngZone: NgZone,
  additionalProps?: ReactContentProps
): RenderPropContext<TContext> {
  return {
    render: (context: TContext) => {
      return React.createElement(ReactTemplate, {
        ngZone,
        templateRef,
        context,
        ...additionalProps,
      });
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
