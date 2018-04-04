import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { ReactComponentClass, getComponentClass } from "./registry";
import { AngularReactRendererFactory } from "./renderer";


export class ReactNode {
  private props = {};
  private children = [];

  private _parent: any;
  set parent(parent: {}) {
    this.setNeedsRendering();
    this._parent = parent;
  }

  private _needsRendering = true;
  private setNeedsRendering() {
    this.rootRenderer.setNeedsRendering();
    this._needsRendering = true;
  }

  constructor(
    private type: ReactComponentClass | string,
    private rootRenderer: AngularReactRendererFactory
  ) {
    if (typeof type === 'string') {
      this.type = getComponentClass(type);
    }
  }

  setProperty(name: string, value: any) {
    console.log('ReactNode > setProperty: ', name, value);
    this.setNeedsRendering();
    this.props[name] = value;
  }

  render() {
    if (this._needsRendering) {
      console.log('hi: ', this);
      console.log('ReactNode > render props: ', this.props);

      // It is expected that the element will be recreated and rerendered with each attribute change.
      // See: https://reactjs.org/docs/rendering-elements.html
      const x = this.renderRecursive(this);
      console.log('hello: ', x);
      ReactDOM.render(x as any, this._parent);
      this._needsRendering = false;
    }
  }

  private renderRecursive(node: ReactNode): React.ReactElement<{}> {
    // const children = node.children ? node.children.map(child => this.renderRecursive(child)) : [];
    let children = [];
    if (node.children) {
      children = node.children.map(
        child =>
          typeof child === 'string' ? child : this.renderRecursive(child)
      );
    }

    return React.createElement(node.type, node.props, children);
  }

  // appendChild(a, b, c, d) {
  //   console.log('HERE: ', a, b, c, d);
  // }
}
