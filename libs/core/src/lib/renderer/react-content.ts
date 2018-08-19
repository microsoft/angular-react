// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Omit } from '../declarations/omit';

const DEBUG = false;
export const CHILDREN_TO_APPEND_PROP = 'children-to-append';

/**
 * Props that can be passed to `ReactContent` from users.
 */
export type ReactContentProps = Omit<AllReactContentProps, typeof CHILDREN_TO_APPEND_PROP>;

/**
 * @internal
 */
export interface AllReactContentProps {
  readonly [CHILDREN_TO_APPEND_PROP]: HTMLElement[];

  /**
   * Experimental rendering mode.
   * Uses a similar approach to `router-outlet`, where the child elements are added to the parent, instead of this node, and this is hidden.
   * @default false
   */
  legacyRenderMode?: boolean;
}

/**
 * Render any `HTMLElement`s (including Angular components) as a child of React components.
 * Supports two rendering modes:
 *  1. `legacy` - append `<react-content>` as the root, and nest the `children-to-append` underneath it.
 *  2. `new` (**default**) - append the `children-to-append` to the parent of this component, and hide the `<react-content>` element.
 *     (similar to how `router-outlet` behaves in Angular).
 */
export class ReactContent extends React.PureComponent<AllReactContentProps> {
  componentDidMount() {
    const element = ReactDOM.findDOMNode(this);
    if (this.props[CHILDREN_TO_APPEND_PROP]) {
      if (DEBUG) {
        console.warn(
          'ReactContent Component > componentDidMount > childrenToAppend:',
          this.props[CHILDREN_TO_APPEND_PROP]
        );
      }

      const hostElement = this.props.legacyRenderMode ? element : element.parentElement;

      // Only add children not already in the DOM
      this.props[CHILDREN_TO_APPEND_PROP].filter(child => !child.isConnected).forEach(child =>
        hostElement.appendChild(child)
      );
    }
  }

  render() {
    return React.createElement('react-content', !this.props.legacyRenderMode && { style: { display: 'none' } });
  }
}
