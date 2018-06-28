import * as React from 'react';
import * as ReactDOM from 'react-dom';
import removeUndefinedProperties from '../utils/object/remove-undefined-properties';
import { CHILDREN_TO_APPEND_PROP } from './react-content';
import { getComponentClass, ReactComponentClass } from "./registry";

const DEBUG = false;

export function isReactNode(node: any): node is ReactNode {
  return (<ReactNode>node).setRenderPendingCallback !== undefined;
}

export class ReactNode {
  // Access to these properties are restricted through setters and functions
  // so that the dirty "render pending" state of this object can be properly
  // tracked and all nodes with "render pending" can be flushed at the end
  // of render operation.
  private props = {};
  private comment: string;
  private text: string;
  private typeIsReactElementClass;
  private children: Array<ReactNode> = [];
  private typeName: string;
  private childrenToAppend: Array<HTMLElement> = [];

  private renderedDomElement: HTMLElement;
  get domElement() {
    return this.renderedDomElement;
  }

  private _parent: HTMLElement | ReactNode;
  set parent(parent: HTMLElement | ReactNode) {
    this._parent = parent;
    this.setRenderPending();
  }

  private isNotRenderable: boolean;
  get shouldRender() {
    return !this.isNotRenderable;
  }

  private isDestroyPending = false;
  get destroyPending() {
    return this.isDestroyPending;
  }

  private isRenderPending = true;
  setRenderPendingCallback = () => null;
  // Track all pending render operations internally and set flag on
  // renderer factory so that a flush operation can be scheduled for
  // the "end" of render.
  setRenderPending() {
    this.setRenderPendingCallback();
    this.isRenderPending = true;
  }

  destroyNode() {
    this.setRenderPending();
    this.isDestroyPending = true;
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

      if (DEBUG) { console.log('ReactNode > tryResolveTypeIsReactElementClass > type:', this.typeName); }
    }
  }

  setAttribute(name: string, value: any) {
    this.setAttributes({
      [name]: value
    });
  }

  setAttributes(attributes: StringMap) {
    this.setProperties(attributes);
  }

  setProperty(name: string, value: any) {
    this.setProperties({
      [name]: value
    });
  }

  setProperties(properties: StringMap) {
    this.setRenderPending();
    Object.assign(this.props, properties);
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

  constructor(private type?: ReactComponentClass | string) {
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

  render(): ReactNode {
    // Only complete render operations for ReactNodes that are parented by HTMLElements.
    // Those that are parented by other ReactNodes will be rendered recursively by their
    // parent.
    if (!isReactNode(this._parent)) {
      if (this.isDestroyPending && this._parent) {
        if (DEBUG) { console.log('ReactNode > render > destroy > node:', this.toString(), 'parent:', this.parent); }
        ReactDOM.unmountComponentAtNode(this._parent);
        return this;
      }

      if (this.isRenderPending) {
        if (DEBUG) { console.log('ReactNode > render > node:', this.toString(), 'parent:', this.parent); }
        // It is expected that the element will be recreated and re-rendered with each attribute change.
        // See: https://reactjs.org/docs/rendering-elements.html
        ReactDOM.render(this.renderRecursive() as any, this._parent);
        this.isRenderPending = false;
      }
    }

    return this;
  }

  private renderRecursive(): React.ReactElement<{}> | string {
    const children =
      this.children
        ? this.children.map(child => child.renderRecursive())
        : [];

    if (this.text) {
      return this.text;
    }

    this.props[CHILDREN_TO_APPEND_PROP] = this.childrenToAppend;

    const clearedProps = removeUndefinedProperties(this.props);

    if (DEBUG) { console.warn('ReactNode > renderRecursive > type:', this.toString(), 'props:', this.props, 'children:', children); }
    return React.createElement(this.type, clearedProps, children.length > 0 ? children : undefined);
  }

  // This is called by Angular core when projected content is being added.
  appendChild(projectedContent: HTMLElement) {
    if (DEBUG) { console.error('ReactNode > appendChild > node:', this.toString(), 'projectedContent:', projectedContent.toString().trim()); }
    this.childrenToAppend.push(projectedContent);
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
