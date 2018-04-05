import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { ReactComponentClass, getComponentClass } from "./registry";
import { AngularReactRendererFactory } from "./renderer";
import { Renderer2 } from '@angular/core';

export class VirtualNode {
  // Access to these properties are restriced through setters and functions
  // so that the dirty "render pending" state of this object can be properly
  // tracked and all nodes with "render pending" can be flushed at the end
  // of render operation.
  private props = {};
  private type: ReactComponentClass | string;
  private comment: string;
  private text: string;

  private renderedDomElement: HTMLElement;
  get domElement() {
    return this.renderedDomElement;
  }

  private typeIsReactElementClass;
  get isReactNode() {
    this.tryResolveTypeIsReactElementClass();

    return this.typeIsReactElementClass;
  }

  private _parent: any;
  set parent(parent: {}) {
    this.setRenderPending();
    this._parent = parent;

    // Make sure we have resolved whether this is a React Element.
    this.tryResolveTypeIsReactElementClass();
  }

  children = [];

  private isRenderPending = true;
  // Track all pending render operations internally and set flag on
  // renderer factory so that a flush operation can be scheduled for
  // the "end" of render.
  private setRenderPending() {
    this.rootRenderer.setRenderPending();
    this.isRenderPending = true;
  }

  private tryResolveTypeIsReactElementClass() {
    if (this.typeIsReactElementClass === undefined) {
      // Comments and text have no type.
      if (!this.type) {
        return;
      }

      // Attempt to resolve the type as a React Element class name/type.
      if (typeof this.type === 'string') {
        this.type = getComponentClass(this.type);
      }

      // If type is still a string, then no React Element matches this string.
      this.typeIsReactElementClass = typeof this.type !== 'string';
    }
  }

  setProperty(name: string, value: any) {
    this.setRenderPending();
    this.props[name] = value;
  }

  removeProperty(name: string) {
    this.setRenderPending();
    delete this.props[name]
  }

  constructor(
    public rootRenderer: AngularReactRendererFactory,
    protected createCallback: () => any
  ) {}

  asElement(type: ReactComponentClass | string) {
    this.type = type;
    return this;
  }

  asComment(value: string) {
    this.comment = value;
    return this;
  }

  asText(value: string) {
    this.text = value;
    return this;
  }

  renderDom() {
    // No need to recursively render children.  The created element will be saved as and referenced
    // later when children are added (directly to the rendered HTMLElement).
    return this.renderedDomElement = this.createCallback();
  }

  renderReact() {
    if (this.isRenderPending) {
      // It is expected that the element will be recreated and rerendered with each attribute change.
      // See: https://reactjs.org/docs/rendering-elements.html
      ReactDOM.render(this.renderRecursive(this) as any, this._parent);
      this.isRenderPending = false;
    }
  }

  toString(): string {
    return '[' + (this.type === undefined ? 'undefined' : typeof this.type === 'string' ? this.type : this.type.constructor.name) + ' VirtualNode]';
  }

  private renderRecursive(node: VirtualNode): React.ReactElement<{}> {
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

}
