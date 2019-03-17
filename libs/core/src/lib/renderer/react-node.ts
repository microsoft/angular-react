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

/**
 * Logical representation of everything needed to render a React element in the
 * DOM, with the needed methods to do so.
 */
export class ReactNode {
  // Access to these properties are restricted through setters and functions
  // so that the dirty "render pending" state of this object can be properly
  // tracked and all nodes with "render pending" can be flushed at the end
  // of a render operation.
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

  constructor(private type?: React.ReactType | string) {
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

  /**
   * Marks the node to be removed from the DOM in the next render cycle.
   */
  destroyNode() {
    this.setRenderPending();
    this._isDestroyPending = true;
  }

  /**
   * Sets an attribute on the node.
   * @note the value can only be a `string`. See `setProperty` for other use-cases.
   * @see `Renderer2#setAttribute`.
   *
   * @param name The attribute name.
   * @param value The new value.
   */
  setAttribute(name: string, value: string) {
    this.setAttributes({ [name]: value });
  }

  /**
   * Set attributes on this node.
   * Note that values can only be of type `string`. See `setProperties` for other use-cases.
   * @see `Renderer2#setAttribute`.
   *
   * @param attributes the attributes to set.
   */
  setAttributes(attributes: StringMap<string>) {
    this.setProperties(attributes);
  }

  /**
   * Sets a prop in the underlying React element.
   * @see `Renderer2#setProperty`.
   *
   * @param name The property name.
   * @param value The new value.
   */
  setProperty(name: string, value: any) {
    this.setProperties({ [name]: value });
  }

  /**
   * Like `setProperty` but for multiple props at once.
   *
   * @param properties An object with the props.
   */
  setProperties(properties: StringMap) {
    this.setRenderPending();
    Object.assign(this._props, removeUndefinedProperties(properties));
  }

  /**
   * Remove a prop or an attribute from the underlying React element.
   * @see `Renderer2#removeAttribute`.
   *
   * @param name The property name.
   * @param childName _Optional_ A property of `name` to remove instead.
   * @returns the deleted property
   */
  removeProperty(name: string, childName?: string) {
    this.setRenderPending();
    if (childName) {
      return delete this._props[name][childName];
    }

    return delete this._props[name];
  }

  /**
   * Add a direct child of this node.
   * @see `Renderer2#addChild`.
   *
   * @param node The node to add.
   */
  addChild(node: ReactNode) {
    this.setRenderPending();
    this._children.push(node);
  }

  /**
   * Remove a direct child of this node.
   * @see `Renderer2#removeChild`.
   *
   * @param node The node to remove.
   */
  removeChild(node: ReactNode) {
    this.setRenderPending();
    this._children = this._children.filter(child => child !== node);
  }

  /**
   * Cast the node to a comment node.
   * @see `Renderer2#createComment`.
   *
   * @param value the text in the comment to render.
   * @returns itself.
   */
  asComment(value: string) {
    this.setRenderPending();
    this.type = undefined;
    this._comment = value;
    return this;
  }

  /**
   * Cast the node to a text node.
   * @see `Renderer2#createText`.
   *
   * @param value the text to render.
   * @returns itself.
   */
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

  /**
   * Render the node to the DOM, or unmount it, as necessary.
   *
   * @returns itself.
   */
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

  /**
   * Appends a child.
   *
   * @see `Renderer2#appendChild`.
   * @note This is called by Angular core when projected content is being added.
   *
   * @param projectedContent the content to project.
   */
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

  /**
   * @note for easier debugging.
   */
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

    // Just having some props on a React element can cause it to
    // behave undesirably, and since the templates are hard-coded to pass
    // all Inputs all the time, they pass `undefined` values too.
    // This ensures these are removed.
    // Additionally, there are some things that Angular templating forbids,
    // and stops at-compile time (with errors), such as `Input`s being prefixed with `on`.
    // Since React does not have the notion of `Output`s as Angular (they are just props of type function, essentially callbacks).
    // To work around this, we, by convention, prefix any PascalCased prop with `on` here, after the template has already been compiled.
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
      // Since Angular templates are just strings, we can't include types in them.
      // Therefore, we use the component registry to resolve the type of a component from a string.
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
