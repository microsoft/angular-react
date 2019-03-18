// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as dom from '../utils/dom/dom-utils';

const DEBUG = false;
export const CHILDREN_TO_APPEND_PROP = 'children-to-append';

/**
 * Props that can be passed to `ReactContent` from users.
 */
export interface ReactContentProps {
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
 * Creates a new `ReactContent` element.
 * @param children The children to append to the `ReactContent` element.
 * @param additionalProps _Optional_. @see `ReactContentProps`.
 */
export function createReactContentElement(children: ReadonlyArray<HTMLElement>, additionalProps?: ReactContentProps) {
  return React.createElement(ReactContent, {
    ...additionalProps,
    [CHILDREN_TO_APPEND_PROP]: children,
  });
}

/**
 * @internal
 */
interface InternalReactContentProps extends ReactContentProps {
  readonly [CHILDREN_TO_APPEND_PROP]: ReadonlyArray<HTMLElement>;
}

/**
 * Render any `HTMLElement`s as a child of React components.
 * Supports two rendering modes:
 *  1. `legacy` - append `<react-content>` as the root, and nest the `children-to-append` underneath it.
 *  2. `new` (**default**) - append the `children-to-append` to the parent of this component, and hide the `<react-content>` element.
 *     (similar to how `router-outlet` behaves in Angular).
 */
export class ReactContent extends React.PureComponent<InternalReactContentProps> {
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
      this.props[CHILDREN_TO_APPEND_PROP].filter(child => !dom.isNodeInDOM(child)).forEach(child =>
        hostElement.appendChild(child)
      );
    }
  }

  render() {
    // TODO: See if we can just render React.Fragment and the children within it, having no extra DOM nodes.
    return React.createElement('react-content', !this.props.legacyRenderMode && { style: { display: 'none' } });
  }
}
