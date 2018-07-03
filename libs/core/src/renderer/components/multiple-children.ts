import { ReactWrapperComponent } from '@angular-react/core/src/components/wrapper-component';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ReactContent } from '../react-content';

export interface DisguiseProps<TParentProps extends {}> {
  parentType: React.ReactType;
  parentProps?: TParentProps;
  parentAs?: React.ReactType;
  childrenAs?: React.ReactType;
  angularChildren: ReactWrapperComponent<any>[];
}

export class Disguise<TParentProps extends {}> extends React.PureComponent<DisguiseProps<TParentProps>> {
  render() {
    const { parentType, parentProps, parentAs, childrenAs, children, angularChildren, ...rest } = this.props;
    const Root = parentAs || React.Fragment;

    if (React.Children.count(children) === 1) {
      const [onlyChild] = React.Children.toArray(children);
      if (typeof onlyChild === 'object' && onlyChild.type === ReactContent) {

        const renderedChildren = angularChildren.map((child, index) => {
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
        })

        return React.createElement(Root, parentProps || null, renderedChildren);
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

    return React.createElement(Root, parentProps || null, renderedChildren);
  }
}
