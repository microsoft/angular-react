import { ReactWrapperComponent } from '../../components/wrapper-component';
import { passPropsSymbol, getPassProps, PassProp } from '../../renderer/pass-prop-decorator';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ReactContent } from '../react-content';
import removeUndefinedProperties from '../../utils/object/remove-undefined-properties';

export interface DisguiseProps {
  /**
   * The type to render the root component as.
   * @default React.Fragment
   */
  as?: React.ReactType;

  /**
   * The type to render the child components as.
   * @default the Children's own type.
   */
  childrenAs?: React.ReactType;

  /**
   * The Angular child components to render.
   */
  ngChildComponents: ReactWrapperComponent<any>[];
}

/**
 * A React component that can render a component and its children as other component types.
 */
export class Disguise extends React.PureComponent<DisguiseProps> {
  render() {
    const { as, childrenAs, children, ngChildComponents, ...rest } = this.props;
    const Root = as || React.Fragment;

    const renderedChildren = this._isReactContentOnlyChild()
      ? this._renderReactContentChildren()
      : this._renderChildrenNaive();

    return React.createElement(Root, rest || null, renderedChildren);
  }

  private _isReactContentOnlyChild(): boolean {
    const { children } = this.props;

    if (React.Children.count(children) === 1) {
      const [onlyChild] = React.Children.toArray(children);
      if (typeof onlyChild === 'object' && onlyChild.type === ReactContent) {
        return true;
      }
    }

    return false;
  }

  private _renderReactContentChildren() {
    const { ngChildComponents, childrenAs } = this.props;

    const renderedChildren = ngChildComponents.map((child, index) => {
      const propsToPass = removeUndefinedProperties(
        getPassProps(child).reduce((acc, passProp) => Object.assign(acc, { [passProp.targetKey]: child[passProp.sourceKey] }), {})
      );

      return React.createElement(childrenAs, {
        ...propsToPass,
        key: index,
        ref: childReactElement => {
          // ref callback is called with null when the component unmounts from the DOM, we don't need to handle it.
          if (!childReactElement) {
            return;
          }

          ReactDOM.findDOMNode(childReactElement).appendChild(child.elementRef.nativeElement)
        }
      });
    });

    return renderedChildren;
  }

  private _renderChildrenNaive() {
    const { children, childrenAs } = this.props;

    const renderedChildren = React.Children.map(children, child => {
      if (!childrenAs || typeof child !== 'object') {
        return child;
      }

      const ChildRoot = child.type || childrenAs;
      return React.createElement(
        ChildRoot, { ...child.props, key: child.key }, child);
    });

    return renderedChildren;
  }
}
