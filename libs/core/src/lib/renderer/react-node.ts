// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { StringMap } from '../declarations/string-map';
import removeUndefinedProperties from '../utils/object/remove-undefined-properties';
import { CHILDREN_TO_APPEND_PROP } from './react-content';
import { getComponentClass } from './registry';

const DEBUG = false;

export function isReactNode(node: any): node is ReactNode {
  return (<ReactNode>node).setRenderPendingCallback !== undefined;
}

export class ReactNode {
  // Access to these properties are restricted through setters and functions
  // so that the dirty "render pending" state of this object can be properly
  // tracked and all nodes with "render pending" can be flushed at the end
  // of render operation.
  private _props = {};
  private _comment: string;
  private _text: string;
  private _typeIsReactElementClass: boolean | undefined;
  private _children: Array<ReactNode> = [];
  private _typeName: string;
  private _childrenToAppend: Array<HTMLElement> = [];
  private _renderedDomElement: HTMLElement;
  private _parent: HTMLElement | ReactNode;
  private _isNotRenderable: boolean;
  private _isDestroyPending: boolean = false;
  private _isRenderPending = true;

  get domElement() {
    return this._renderedDomElement;
  }

  set parent(parent: HTMLElement | ReactNode) {
    this._parent = parent;
    this.setRenderPending();
  }

  get parent(): HTMLElement | ReactNode {
    return this._parent;
  }

  get shouldRender() {
    return !this._isNotRenderable;
  }

  get destroyPending() {
    return this._isDestroyPending;
  }

  constructor(private type?: React.ReactType) {
    this.setRenderPending();
    this._tryResolveTypeIsReactElementClass();
  }

  setRenderPendingCallback = () => null;

  /**
   * Track all pending render operations internally and set flag on
   * renderer factory so that a flush operation can be scheduled for
   * the "end" of render.
   */
  setRenderPending() {
    this.setRenderPendingCallback();
    this._isRenderPending = true;
  }

  destroyNode() {
    this.setRenderPending();
    this._isDestroyPending = true;
  }

  setAttribute(name: string, value: any) {
    this.setAttributes({ [name]: value });
  }

  setAttributes(attributes: StringMap) {
    this.setProperties(attributes);
  }

  setProperty(name: string, value: any) {
    this.setProperties({ [name]: value });
  }

  setProperties(properties: StringMap) {
    this.setRenderPending();
    Object.assign(this._props, removeUndefinedProperties(properties));
  }

  removeProperty(name: string, childName?: string) {
    this.setRenderPending();
    if (childName) {
      return delete this._props[name][childName];
    }

    return delete this._props[name];
  }

  addChild(node: ReactNode) {
    this.setRenderPending();
    this._children.push(node);
  }

  removeChild(node: ReactNode) {
    this.setRenderPending();
    this._children = this._children.filter(child => child !== node);
  }

  asComment(value: string) {
    this.setRenderPending();
    this.type = undefined;
    this._comment = value;
    return this;
  }

  asText(value: string) {
    this.setRenderPending();
    this.type = undefined;
    this._text = value;

    // Skip appending and rendering of empty text nodes. This may cause a bug
    // if a single space is desired...
    if (!value || !value.trim()) {
      this._isNotRenderable = true;
    }

    return this;
  }

  render(): ReactNode {
    // Only complete render operations for ReactNodes that are parented by HTMLElements.
    // Those that are parented by other ReactNodes will be rendered recursively by their
    // parent.
    if (!isReactNode(this._parent)) {
      if (this._isDestroyPending && this._parent) {
        if (DEBUG) {
          console.log('ReactNode > render > destroy > node:', this.toString(), 'parent:', this.parent);
        }
        ReactDOM.unmountComponentAtNode(this._parent);
        return this;
      }

      if (this._isRenderPending) {
        if (DEBUG) {
          console.log('ReactNode > render > node:', this.toString(), 'parent:', this.parent);
        }
        // It is expected that the element will be recreated and re-rendered with each attribute change.
        // See: https://reactjs.org/docs/rendering-elements.html
        ReactDOM.render(this._renderRecursive() as React.ReactElement<{}>, this._parent);
        this._isRenderPending = false;
      }
    }

    return this;
  }

  // This is called by Angular core when projected content is being added.
  appendChild(projectedContent: HTMLElement) {
    if (DEBUG) {
      console.error(
        'ReactNode > appendChild > node:',
        this.toString(),
        'projectedContent:',
        projectedContent.toString().trim()
      );
    }
    this._childrenToAppend.push(projectedContent);
  }

  toString(): string {
    if (this._typeName) {
      return `[${this._typeName} ReactNode]`;
    }

    if (this._text) {
      return '[text ReactNode]';
    }

    if (this._comment) {
      return '[comment ReactNode]';
    }

    return '[undefined ReactNode]';
  }

  private _renderRecursive(key?: string): React.ReactElement<{}> | string {
    const children = this._children
      ? this._children.map((child, index) => child._renderRecursive(index.toString()))
      : [];

    if (this._text) {
      return this._text;
    }

    this._props[CHILDREN_TO_APPEND_PROP] = this._childrenToAppend;

    if (key) {
      this._props['key'] = key;
    }

    const clearedProps = this._transformProps(removeUndefinedProperties(this._props));

    if (DEBUG) {
      console.warn(
        'ReactNode > renderRecursive > type:',
        this.toString(),
        'props:',
        this._props,
        'children:',
        children
      );
    }
    return React.createElement(this.type, clearedProps, children.length > 0 ? children : undefined);
  }

  private _transformProps<TProps extends object>(props: TProps) {
    return Object.entries(props).reduce((acc, [key, value]) => {
      const [newKey, newValue] = typeof key !== 'string' ? [key, value] : this._transformProp(key, value);
      return Object.assign(acc, { [newKey]: newValue });
    }, {});
  }

  private _transformProp<TValue = any>(name: string, value: TValue): [string, TValue] {
    // prop name is camelCased already
    const firstLetter = name[0];
    if (firstLetter === firstLetter.toLowerCase()) {
      return [name, value];
    }

    // prop name is PascalCased & is a function - assuming render prop or callback prop that has return value
    // NOTE: Angular doesn't allow passing @Inputs that are prefixed with "on". This is useful for render props and properties representing the "on" state (for example, Toggle).
    // As a convention, any @Input that starts with a capital letter is prefixed with "on" when passed as a prop to the underlying React component.
    return [`on${name}`, value];
  }

  private _tryResolveTypeIsReactElementClass() {
    if (this._typeIsReactElementClass === undefined) {
      // Comments and text have no type.
      if (!this.type) {
        return;
      }

      // Store the name of the type for the toString message (debugging).
      this._typeName = this.type as string;

      // Attempt to resolve the type as a React Element class name/type.
      if (typeof this.type === 'string') {
        this.type = getComponentClass(this.type);
      }

      // If type is still a string, then no React Element matches this string.
      this._typeIsReactElementClass = typeof this.type !== 'string';

      if (DEBUG) {
        console.log('ReactNode > tryResolveTypeIsReactElementClass > type:', this._typeName);
      }
    }
  }
}
