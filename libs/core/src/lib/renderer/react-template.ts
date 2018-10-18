// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { EmbeddedViewRef, NgZone, TemplateRef } from '@angular/core';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Subscription } from 'rxjs';

const DEBUG = false;

/**
 * @internal
 */
export interface ReactTemplateProps<TContext extends object | void> {
  /**
   * Experimental rendering mode.
   * Uses a similar approach to `router-outlet`, where the child elements are added to the parent, instead of this node, and this is hidden.
   * @default false
   */
  legacyRenderMode?: boolean;

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
export class ReactTemplate<TContext extends object | void> extends React.Component<ReactTemplateProps<TContext>> {
  private _embeddedViewRef: EmbeddedViewRef<TContext>;
  private _ngZoneSubscription: Subscription;

  componentDidUpdate() {
    // Context has changes, trigger change detection after pushing the new context in
    Object.assign(this._embeddedViewRef.context, this.props.context);
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

    // Detect the first cycle's changes, and then subscribe for subsequent ones
    this._embeddedViewRef.detectChanges();
    this._ngZoneSubscription = ngZone.onUnstable.subscribe(() => {
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
    return React.createElement('react-template', !this.props.legacyRenderMode && { style: { display: 'none' } });
  }
}
