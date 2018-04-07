import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Renderer2 } from '@angular/core';

import { ReactComponentClass, getComponentClass } from "./registry";
import { AngularReactRendererFactory } from "./renderer";


const DEBUG = true;

export function isReactNode(node: any): node is ReactNode {
  return (<ReactNode>node).setRenderPendingCallback !== undefined;
}

export class ReactNode {
  // Access to these properties are restriced through setters and functions
  // so that the dirty "render pending" state of this object can be properly
  // tracked and all nodes with "render pending" can be flushed at the end
  // of render operation.
  private props = {};
  private comment: string;
  private text: string;
  private typeIsReactElementClass;
  private children = [];
  private typeName: string;

  private renderedDomElement: HTMLElement;
  get domElement() {
    return this.renderedDomElement;
  }

  private _parent: any;
  set parent(parent: HTMLElement | ReactNode) {
    this._parent = parent;
    this.setRenderPending();
  }

  private isNotRenderable: boolean;
  get shouldRender() {
    return !this.isNotRenderable;
  }

  private isRenderPending = true;
  public setRenderPendingCallback = () => null;
  // Track all pending render operations internally and set flag on
  // renderer factory so that a flush operation can be scheduled for
  // the "end" of render.
  public setRenderPending() {
    this.setRenderPendingCallback();
    this.isRenderPending = true;
  }

  private tryResolveTypeIsReactElementClass() {
    if (this.typeIsReactElementClass === undefined) {
      // Comments and text have no type.
      if (!this.type) {
        return;
      }

      // Store the name of the type for the toString message (debugging).
      this.typeName = this.type as string;

      // Attempt to resolve the type as a React Element class name/type.
      if (typeof this.type === 'string') {
        this.type = getComponentClass(this.type);
      }

      // If type is still a string, then no React Element matches this string.
      this.typeIsReactElementClass = typeof this.type !== 'string';

      if (DEBUG) { console.error('ReactNode > tryResolveTypeIsReactElementClass > type:', this.typeName); }
    }
  }

  setAttribute(name: string, value: any) {
    this.setProperty(name, value);
  }

  setProperty(name: string, value: any) {
    this.setRenderPending();
    this.props[name] = value;
  }

  removeProperty(name: string, childName?: string) {
    this.setRenderPending();
    if (childName) {
      return delete this.props[name][childName];
    }

    return delete this.props[name];
  }

  addChild(node: ReactNode) {
    this.setRenderPending();
    this.children.push(node);
  }

  removeChild(node: ReactNode) {
    this.setRenderPending();
    this.children = this.children.filter(child => child !== node);
  }

  constructor(
    private type?: ReactComponentClass | string
  ) {
    this.setRenderPending();
    this.tryResolveTypeIsReactElementClass();
  }

  asComment(value: string) {
    this.setRenderPending();
    this.type = undefined;
    this.comment = value;
    return this;
  }

  asText(value: string) {
    this.setRenderPending();
    this.type = undefined;
    this.text = value;

    // Skip appending and rendering of empty text nodes. This may cause a bug
    // if a single space is desired...
    if (!value || !value.trim()) {
      this.isNotRenderable = true;
    }

    return this;
  }

  render() {
    if (this.isRenderPending) {
      if (DEBUG) { console.error('ReactNode > render > node:', this.toString(), 'parent:', this.parent); }
      // It is expected that the element will be recreated and rerendered with each attribute change.
      // See: https://reactjs.org/docs/rendering-elements.html
      ReactDOM.render(this.renderRecursive(this) as any, this._parent);
      this.isRenderPending = false;
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

  toString(): string {
    if (this.typeName) {
      return `[${this.typeName} ReactNode]`;
    }

    if (this.text) {
      return '[text ReactNode]';
    }

    if (this.comment) {
      return '[comment ReactNode]';
    }

    return '[undefined ReactNode]';
  }

}
