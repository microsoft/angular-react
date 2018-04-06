import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { ReactComponentClass, getComponentClass } from "./registry";
import { AngularReactRendererFactory } from "./renderer";
import { Renderer2 } from '@angular/core';


const DEBUG = true;

export function isVirtualNode(node: any): node is VirtualNode {
  return (<VirtualNode>node).rootRenderer !== undefined;
}

export class VirtualNode {
  // Access to these properties are restriced through setters and functions
  // so that the dirty "render pending" state of this object can be properly
  // tracked and all nodes with "render pending" can be flushed at the end
  // of render operation.
  private props = {};
  private type: ReactComponentClass | string;
  private comment: string;
  private text: string;
  private renderDomCallbackStack: Array<(el?: HTMLElement) => any> = [];

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
  set parent(parent: HTMLElement) {
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

  constructor(public rootRenderer: AngularReactRendererFactory) {}

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

  addRenderDomCallback(callback: (el?: HTMLElement) => any): VirtualNode {
    this.renderDomCallbackStack.push(callback);
    return this;
  }

  renderDom(parentElement?: HTMLElement) {
    if (DEBUG) { console.error('VirtualNode > renderDom > parent:', parentElement ? parentElement.toString() : 'undefined'); }

    // The DOM element can only be rendered once.  There is no requirement to support re-rendering
    // as subsquent updates to a rendered DOM element will be directly against the element (the
    // virtual node is only used until the DOM element is rendered).  Once the element is rendered,
    // it is just returned.
    if (this.renderedDomElement) {
      return this.renderedDomElement;
    }

    // Render this element.
    this.renderDomCallbackStack.map(cb => {
      if (!this.renderedDomElement) {
        // The first callback should return the rendered dom element.  We need not assign the
        // response of any of the other callbacks.
        return this.renderedDomElement = cb(this.renderedDomElement);
      }

      return cb(this.renderedDomElement);
    });

    // Add this rendered element to a parent if one is provided.
    if (parentElement) {
      if (DEBUG) { console.error('VirtualNode > renderDom > appending parent:', parentElement.toString(), 'child:', this.renderedDomElement.toString()); }
      parentElement.appendChild(this.renderedDomElement);
    }

    // Recursively render all children.
    this.children.map(child => child.renderDom(this.renderedDomElement));

    // Flush the callbacks to free up the memory used to hold the closure of the callback.
    this.renderDomCallbackStack = [];

    return this.renderedDomElement;
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
    return '[' + (this.type === undefined ? (this.text && this.text.trim()) || (this.comment && this.comment.trim()) : typeof this.type === 'string' ? this.type : this.type.constructor.name) + ' VirtualNode]';
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
