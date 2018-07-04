import { ReactWrapperComponent } from '@angular-react/core/src/components/wrapper-component';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ReactContent } from '../react-content';

export interface DisguiseProps {
  as?: React.ReactType;
  childrenAs?: React.ReactType;
  ngChildComponents: ReactWrapperComponent<any>[];
}

export class Disguise extends React.PureComponent<DisguiseProps> {
  render() {
    const { as, childrenAs, children, ngChildComponents, ...rest } = this.props;
    const Root = as || React.Fragment;

    if (React.Children.count(children) === 1) {
      const [onlyChild] = React.Children.toArray(children);
      if (typeof onlyChild === 'object' && onlyChild.type === ReactContent) {

        const renderedChildren = ngChildComponents.map((child, index) => {
          return React.createElement(childrenAs, {
            ...child,
            key: index,
            ref: childReactElement => {
              // ref callback is called with null when the component unmounts from the DOM, we don't need to handle it.
              if (!childReactElement) {
                return;
              }

              const childDomElement = ReactDOM.findDOMNode(childReactElement);
              childDomElement.appendChild(child.elementRef.nativeElement)
            }
          })
        });

        return React.createElement(Root, rest || null, renderedChildren);
      }
    }

    const renderedChildren = React.Children.map(children, child => {
      if (!childrenAs || typeof child !== 'object') {
        return child;
      }

      const ChildRoot = child.type || childrenAs;
      return React.createElement(
        ChildRoot, { ...child.props, key: child.key }, child);
    });

    return React.createElement(Root, rest || null, renderedChildren);
  }
}
