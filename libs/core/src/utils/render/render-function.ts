import { ComponentRef, TemplateRef } from "@angular/core";
import * as React from 'react';
import { CHILDREN_TO_APPEND_PROP, ReactContent } from "../../renderer/react-content";


function renderReactContent(rootNodes: HTMLElement[]): JSX.Element {
  return React.createElement(
    ReactContent,
    {
      [CHILDREN_TO_APPEND_PROP]: rootNodes
    } as any
  );
}

export function renderTemplate<TContext extends object>(templateRef: TemplateRef<TContext>, context?: TContext): JSX.Element {
  const viewRef = templateRef.createEmbeddedView(context);
  viewRef.detectChanges();

  return renderReactContent(viewRef.rootNodes);
}

export function renderFunc<TContext extends object>(htmlRenderFunc: (context: TContext) => HTMLElement, context?: TContext): JSX.Element {
  const rootHtmlElement = htmlRenderFunc(context);

  return renderReactContent([rootHtmlElement]);
}

export function renderComponent<TContext extends object>(componentRef: ComponentRef<TContext>, context?: TContext): JSX.Element {
  Object.assign(componentRef.instance, context);
  componentRef.changeDetectorRef.detectChanges();

  return renderReactContent([componentRef.location.nativeElement]);
}
