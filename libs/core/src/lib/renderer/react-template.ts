// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { EmbeddedViewRef, NgZone, TemplateRef } from '@angular/core';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Subscription } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

const DEBUG = false;
const TEMPLATE_DETECT_CHANGES_THROTTLE_MS = 250;

/**
 * @internal
 */
export interface ReactTemplateProps {
  /**
   * Use the legacy rendering mode.
   *
   * Uses a similar approach to `router-outlet`, where the child elements are added to the parent, instead of this node, and this is hidden.
   *
   * @default false
   */
  legacyRenderMode?: boolean;
}

/**
 * Creates a new `ReactTemplate` element.
 * @param templateRef The template to render.
 * @param context The context to inject the template.
 * @param ngZone A zone used for tracking changes in the template.
 * @param additionalProps _Optional_. @see `ReactTemplateProps`.
 */
export function createReactTemplateElement<TContext extends object | void>(
  templateRef: TemplateRef<TContext>,
  context: TContext,
  ngZone: NgZone,
  additionalProps?: ReactTemplateProps
) {
  return React.createElement(ReactTemplate, { ngZone, templateRef, context, ...additionalProps });
}

/**
 * @internal
 */
interface InternalReactTemplateProps<TContext extends object | void> extends ReactTemplateProps {
  ngZone: NgZone;
  templateRef: TemplateRef<TContext>;
  context: TContext;
}

/**
 * Render an `ng-template` as a child of a React component.
 * Supports two rendering modes:
 *  1. `legacy` - append `<react-content>` as the root, and nest the `children-to-append` underneath it.
 *  2. `new` (**default**) - append the `children-to-append` to the parent of this component, and hide the `<react-content>` element.
 *     (similar to how `router-outlet` behaves in Angular).
 */
export class ReactTemplate<TContext extends object | void> extends React.Component<
  InternalReactTemplateProps<TContext>
> {
  private _embeddedViewRef: EmbeddedViewRef<TContext>;
  private _ngZoneSubscription: Subscription;

  componentDidUpdate() {
    // Context has changes, trigger change detection after pushing the new context in
    if (this.props.context != null && this._embeddedViewRef.context != null) {
      Object.assign(this._embeddedViewRef.context, this.props.context);
    }
    this._embeddedViewRef.detectChanges();
  }

  componentDidMount() {
    const { context, ngZone, templateRef } = this.props;

    this._embeddedViewRef = templateRef.createEmbeddedView(context);
    const element = ReactDOM.findDOMNode(this);
    if (DEBUG) {
      console.warn('ReactTemplate Component > componentDidMount > childrenToAppend:', {
        rootNodes: this._embeddedViewRef.rootNodes,
      });
    }

    const hostElement = this.props.legacyRenderMode ? element : element.parentElement;

    this._embeddedViewRef.rootNodes.forEach(child => hostElement.appendChild(child));

    // Detect the first cycle's changes, and then subscribe for subsequent ones.
    this._embeddedViewRef.detectChanges();

    // Throttling the detect changes to an empirically selected value so we don't overload too much work.
    // TODO: This needs some better solution to listen to changes to the binding sources of the template.
    this._ngZoneSubscription = ngZone.onStable
      .pipe(throttleTime(TEMPLATE_DETECT_CHANGES_THROTTLE_MS, undefined, { leading: true, trailing: true }))
      .subscribe(() => {
        this._embeddedViewRef.detectChanges();
      });
  }

  componentWillUnmount() {
    this._ngZoneSubscription.unsubscribe();

    if (this._embeddedViewRef) {
      this._embeddedViewRef.destroy();
    }
  }

  render() {
    // TODO: See if we can just render React.Fragment and the children within it, having no extra DOM nodes.
    return React.createElement('react-template', !this.props.legacyRenderMode && { style: { display: 'none' } });
  }
}
