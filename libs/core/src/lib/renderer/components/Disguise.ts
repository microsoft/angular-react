// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ReactWrapperComponent } from '../../components/wrapper-component';
import { getPassProps } from '../../renderer/pass-prop-decorator';
import removeUndefinedProperties from '../../utils/object/remove-undefined-properties';
import { ReactContent } from '../react-content';
import { ReactElement } from 'react';

/**
 * Props for `Disguise` component.
 */
export interface DisguiseProps {
  /**
   * The type to render the root component as.
   * @default React.Fragment
   */
  disguiseRootAs?: React.ReactType;

  /**
   * The type to render the child components as.
   * @default the Children's own type.
   */
  disguiseChildrenAs?: React.ReactType;

  /**
   * The Angular child components to render.
   */
  ngChildComponents?: ReactWrapperComponent<any>[];
}

/**
 * A React component that can render a component and its children as other component types.
 */
export class Disguise extends React.PureComponent<DisguiseProps> {
  render() {
    const { disguiseRootAs, disguiseChildrenAs, children, ngChildComponents, ...rest } = this.props;
    const Root = disguiseRootAs || React.Fragment;

    const renderedChildren = ngChildComponents
      ? this._isReactContentOnlyChild()
        ? this._renderReactContentChildren()
        : this._renderChildrenNaive()
      : children;

    return React.createElement(Root, rest || null, renderedChildren);
  }

  private _isReactContentOnlyChild(): boolean {
    const { children } = this.props;

    if (React.Children.count(children) === 1) {
      const [onlyChild] = React.Children.toArray(children);
      if (typeof onlyChild === 'object' && (<ReactElement<any>>onlyChild).type === ReactContent) {
        return true;
      }
    }

    return false;
  }

  private _renderReactContentChildren() {
    const { ngChildComponents, disguiseChildrenAs } = this.props;

    const renderedChildren = ngChildComponents.map((child, index) => {
      const propsToPass = removeUndefinedProperties(
        getPassProps(child).reduce(
          (acc, passProp) => Object.assign(acc, { [passProp.targetKey]: child[passProp.sourceKey] }),
          {}
        )
      );

      return React.createElement(disguiseChildrenAs, {
        ...propsToPass,
        key: index,
        ref: childReactElement => {
          // ref callback is called with null when the component unmounts from the DOM, we don't need to handle it.
          if (!childReactElement) {
            return;
          }

          ReactDOM.findDOMNode(childReactElement).appendChild(child.elementRef.nativeElement);
        },
      });
    });

    return renderedChildren;
  }

  private _renderChildrenNaive() {
    const { children, disguiseChildrenAs } = this.props;

    const renderedChildren = React.Children.map(children, child => {
      if (!disguiseChildrenAs || typeof child !== 'object') {
        return child;
      }

      const ChildRoot = (<ReactElement<any>>child).type || disguiseChildrenAs;
      return React.createElement(
        ChildRoot,
        { ...(<ReactElement<any>>child).props, key: (<ReactElement<any>>child).key },
        child
      );
    });

    return renderedChildren;
  }
}
