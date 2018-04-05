// tslint:disable:no-bitwise

import {
  Injectable,
  RendererType2,
  Renderer2,
  RendererStyleFlags2
} from '@angular/core';
import { BrowserModule, EventManager } from '@angular/platform-browser';
import {
  ɵDomRendererFactory2,
  ɵDomSharedStylesHost,
  ɵNAMESPACE_URIS
} from '@angular/platform-browser';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { ReactComponentClass, getComponentClass } from './registry';
import { VirtualNode } from './virtual-node';


@Injectable()
export class AngularReactRendererFactory extends ɵDomRendererFactory2 {
  private reactRendererByCompId = new Map<string, Renderer2>();
  private defaultReactRenderer: AngularReactRenderer;

  // Collection of ReactNodes that can be evaluated and flushed at the
  // end of Render.  This is necessary as the flow of element creation
  // and update goes from "create" > "insert" > "update" property/attribute.
  // React elements cannot be "inserted" and later have their props
  // updated, so the "insert", or React.Render, can be done once the
  // element has been fully defined.
  public reactNodes: Array<VirtualNode> = [];

  private isRenderPending = true;
  // This flag can only be set to true from outside.  It can only be reset
  // to false from inside.  This value is reset on "end" when the pending
  // renders are flushed.
  public setRenderPending() {
    this.isRenderPending = true;
  }

  constructor(eventManager: EventManager, sharedStylesHost: ɵDomSharedStylesHost) {
    super(eventManager, sharedStylesHost);

    this.defaultReactRenderer = new AngularReactRenderer(eventManager, this);
  }

  createRenderer(element: any, type: RendererType2 | null): Renderer2 {
    // return super.createRenderer(element, type);

    if (!element || !type) {
      return super.createRenderer(element, type);
    }

    // Determine whether this component is a react wrapper and provide the unique renderer.
    let renderer = this.reactRendererByCompId.get(type.id);
    // Attempt to get a React Renderer for this element.
    if (!renderer) {
      // Get the DOM Renderer for this element.
      const domRenderer = super.createRenderer(element, type);

      // Get the React Renderer for this element. It will take in the DOM
      // Renderer and optionally use it when the DOM Element is not a React
      // Element and is not a child of a React Element.
      renderer = this.defaultReactRenderer.setDomRenderer(domRenderer);
      this.reactRendererByCompId.set(type.id, renderer);
    }

    return renderer;
  }

  begin() { }

  end() {
    // Flush any pending React element render updates.  This cannot be done
    // earlier (as is done for DOM elements) because React element props
    // are ReadOnly.
    if (this.isRenderPending) {
      this.reactNodes.map(node => node.renderReact());
      this.isRenderPending = false;
    }
  }
}

class AngularReactRenderer implements Renderer2 {
  data: { [key: string]: any } = Object.create(null);
  domRenderer: Renderer2;
  destroyNode: null;

  constructor(
    private eventManager: EventManager,
    private rootRenderer: AngularReactRendererFactory
  ) {}

  destroy(): void {}

  setDomRenderer(domRenderer: Renderer2): AngularReactRenderer {
    this.domRenderer = domRenderer;
    return this;
  }

  createElement(name: string, namespace?: string): VirtualNode {
    console.error('Renderer > createElement > name:', name, namespace ? 'namespace:' : '', namespace);
    return new VirtualNode(this.rootRenderer, () => this.domRenderer.createElement(name, namespace)).asElement(name);
  }

  createComment(value: string): VirtualNode {
    console.error('Renderer > createComment > value:', value);
    return new VirtualNode(this.rootRenderer, () => this.domRenderer.createComment(value)).asComment(value);
  }

  createText(value: string): VirtualNode {
    console.error('Renderer > createText > value:', value);
    return new VirtualNode(this.rootRenderer, () => this.domRenderer.createText(value)).asText(value);
  }

  appendChild(parent: HTMLElement | VirtualNode, newChild: VirtualNode): void {
    // Only append a child if there is a child.
    if (!newChild) {
      return;
    }

    // If the child is NOT being appended to an HTMLElement or VirtualNode that has been rendered as an
    // HTMLElement, then just push it to the children collection of the VirtualNode.
    if (!this.htmlElement(parent)) {
      console.warn('Renderer > appendChild > asReact > parentNode:', parent.toString(), 'newChild:', newChild.toString());
      (parent as VirtualNode).children.push(newChild);
      return;
    }

    // If the child IS being appended to an HTMLElement and it is a ReactElement, then set the parent
    // of the ReactElement for insertion later when it is fully defined and rendered.
    if (newChild.isReactNode) {
      console.warn('Renderer > appendChild > asReact > parentElement:', parent.toString(), 'newChild:', newChild.toString());
      newChild.parent = this.htmlElement(parent);
      return;
    }

    // If the child IS being appended to an HTMLElement, get the element as either the parent or
    // as the 'domElement' property of the parent (if the parent is a VirtualNode) and append.
    console.warn('Renderer > appendChild > asDOM > parentElement:', parent.toString(), 'newChild:', newChild.toString());
    this.htmlElement(parent).appendChild(newChild.renderDom());
  }

  insertBefore(parent: any, newChild: any, refChild: any): void {
    // NEEDS WORK
    console.log('Renderer > insertBefore > parent:', parent, 'child:', newChild);

    if (parent) {
      parent.insertBefore(newChild, refChild);
    }
  }

  removeChild(parent: any, oldChild: any): void {
    // NEEDS WORK
    console.log('Renderer > removeChild > parent:', parent, 'child:', oldChild);

    if (parent) {
      parent.removeChild(oldChild);
    }
  }

  selectRootElement(selectorOrNode: string | any): any {
    // NEEDS WORK
    console.log('Renderer > selectRootElement > selectorOrNode:', selectorOrNode);

    const el: any =
      typeof selectorOrNode === 'string'
        ? document.querySelector(selectorOrNode)
        : selectorOrNode;
    if (!el) {
      throw new Error(
        `The selector "${selectorOrNode}" did not match any elements.`
      );
    }
    el.textContent = '';
    return el;
  }

  parentNode(node: any): any {
    // NEEDS WORK
    console.log('Renderer > parentNode > node:', node);

    return node.parentNode;
  }

  nextSibling(node: any): any {
    // NEEDS WORK
    console.log('Renderer > nextSibling > node:', node);

    return node.nextSibling;
  }

  setAttribute(node: VirtualNode, name: string, value: string, namespace?: string ): void {
    console.log('Renderer > setAttribute > element:', node.toString(), 'name:', name, 'value:', value, namespace ? 'namespace:' : '', namespace);

    if (node.domElement) {
      this.domRenderer.setAttribute(node.domElement, name, value, namespace);
      return;
    }

    node.setProperty(name, value);
  }

  removeAttribute(node: VirtualNode, name: string, namespace?: string): void {
    // NEEDS WORK
    console.log('Renderer > removeAttribute > element:', node.toString(), 'name:', name, namespace ? 'namespace:' : '', namespace);

    // if (namespace) {
    //   const namespaceUri = ɵNAMESPACE_URIS[namespace];
    //   if (namespaceUri) {
    //     el.removeAttributeNS(namespaceUri, name);
    //   } else {
    //     el.removeAttribute(`${namespace}:${name}`);
    //   }
    // } else {
    //   el.removeAttribute(name);
    // }
    node.removeProperty(name);
  }

  addClass(el: any, name: string): void {
    // NEEDS WORK
    console.log('Renderer > addClass > element:', el, 'name:', name);

    el.classList.add(name);
  }

  removeClass(el: any, name: string): void {
    // NEEDS WORK
    console.log('Renderer > removeClass > element:', el, 'name:', name);

    el.classList.remove(name);
  }

  setStyle(el: any, style: string, value: any, flags: RendererStyleFlags2): void {
    // NEEDS WORK
    console.log('Renderer > setStyle > element: ', el, 'style:', style, 'value:', value, 'flags:', flags);

    if (flags & RendererStyleFlags2.DashCase) {
      el.style.setProperty(
        style,
        value,
        !!(flags & RendererStyleFlags2.Important) ? 'important' : ''
      );
    } else {
      el.style[style] = value;
    }
  }

  removeStyle(el: any, style: string, flags: RendererStyleFlags2): void {
    // NEEDS WORK
    console.log( 'Renderer > removeStyle > element:', el, 'style:', style, 'flags:', flags);

    if (flags & RendererStyleFlags2.DashCase) {
      el.style.removeProperty(style);
    } else {
      // IE requires '' instead of null
      // see https://github.com/angular/angular/issues/7916
      el.style[style] = '';
    }
  }

  setProperty(node: VirtualNode, name: string, value: any): void {
    console.log('Renderer > setProperty > element:', node.toString(), 'name:', name, 'value:', value);

    if (node.domElement) {
      this.domRenderer.setProperty(node.domElement, name, value);
      return;
    }

    node.setProperty(name, value);
  }

  setValue(node: VirtualNode, value: string): void {
    console.log('Renderer > setValue > node:', node.toString(), 'value:', value);

    if (node.domElement) {
      this.domRenderer.setValue(node.domElement, value);
      return;
    }

    node.setProperty('value', value);
  }

  listen(target: 'window' | 'document' | 'body' | VirtualNode, event: string, callback: (event: any) => boolean): () => void {
    console.log('Renderer > listen > target:', target.toString(), 'event:', event);

    if (!this.isVirtualNode(target) || target.domElement) {
      return this.domRenderer.listen((target as VirtualNode).domElement || target, event, callback);
    }

    target.setProperty(event, callback);

    // NEEDS WORK: Implement prevent default callback behavior.
    // return <() => void>this.eventManager.addEventListener(
    //            target, event, decoratePreventDefault(callback)) as() => void;


    // tslint:disable-next-line:no-unused-expression
    return () => null;
  }

  private isVirtualNode(node: any): node is VirtualNode {
    return (<VirtualNode>node).rootRenderer !== undefined;
  }

  private htmlElement(node: VirtualNode | HTMLElement): HTMLElement {
    return (!this.isVirtualNode(node)  || !!node.domElement) ? ((node as VirtualNode).domElement || node as HTMLElement) : null;
  }

}

function decoratePreventDefault(eventHandler: Function): Function {
  console.log('Renderer > decoratePreventDefault > eventHandler:', eventHandler);

  return (event: any) => {
    const allowDefaultBehavior = eventHandler(event);
    if (allowDefaultBehavior === false) {
      // TODO(tbosch): move preventDefault into event plugins...
      event.preventDefault();
      event.returnValue = false;
    }
  };
}

const AT_CHARCODE = '@'.charCodeAt(0);
function checkNoSyntheticProp(name: string, nameKind: string) {
  console.log('checkNoSyntheticProp > name:', name, 'nameKind:', nameKind);

  if (name.charCodeAt(0) === AT_CHARCODE) {
    throw new Error(
      // tslint:disable-next-line:max-line-length
      `Found the synthetic ${nameKind} ${name}. Please include either "BrowserAnimationsModule" or "NoopAnimationsModule" in your application.`
    );
  }
}
