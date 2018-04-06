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
import { VirtualNode, isVirtualNode } from './virtual-node';


@Injectable()
export class AngularReactRendererFactory extends ɵDomRendererFactory2 {
  private rendererMap = new Map<string, VirtualRenderer>();

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
  }

  createRenderer(element: any, type: RendererType2 | null): Renderer2 {
    // Determine whether a renderer has already been mapped for this element.
    let renderer = type && type.id && this.rendererMap.get(type.id);
    if (!renderer) {
      // Get the DOM Renderer for this element.
      const domRenderer = super.createRenderer(element, type);

      // Create the HybridRenderer for this element. The HybridRenderer acts as a switch operator
      // and creates each element via callback when the element is inserted.  This delay in create allows
      // determination of whether the element is a child of only DOM elements or a child of a React Element
      // and allows for the appropriate renderer (DOM or React) to be used.
      renderer = new VirtualRenderer(domRenderer, this);

      // Store the mapped renderer for reuse.
      if (type && type.id) {
        this.rendererMap.set(type.id, renderer);
      }
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

class VirtualRenderer implements Renderer2 {
  data: { [key: string]: any } = Object.create(null);
  destroyNode: null;

  constructor(
    private domRenderer: Renderer2,
    private rootRenderer: AngularReactRendererFactory,
  ) {}

  destroy(): void {}

  createElement(name: string, namespace?: string): VirtualNode {
    console.error('Renderer > createElement > name:', name, namespace ? 'namespace:' : '', namespace);
    return new VirtualNode(this.rootRenderer)
      .asElement(name)
      .addRenderDomCallback(() => this.domRenderer.createElement(name, namespace));
  }

  createComment(value: string): VirtualNode {
    console.error('Renderer > createComment > value:', value);
    return new VirtualNode(this.rootRenderer)
      .asComment(value)
      .addRenderDomCallback(() => this.domRenderer.createComment(value));
  }

  createText(value: string): VirtualNode {
    console.error('Renderer > createText > value:', value);
    return new VirtualNode(this.rootRenderer)
      .asText(value)
      .addRenderDomCallback(() => this.domRenderer.createText(value));
  }

  appendChild(parent: HTMLElement | VirtualNode, newChild: VirtualNode): void {
    // Only append a child if there is a child.
    if (!newChild) {
      return;
    }

    // If the child is being appended to an HTMLElement or VirtualNode that has been
    // rendered as an HTMLElement...
    if ((!isVirtualNode(parent)  || !!parent.domElement)) {
      // If the child is not a ReactNode, then use the DOMRenderer.
      if (!newChild.isReactNode) {
        console.warn('Renderer > appendChild > asDOM > parentElement:', parent.toString(), 'newChild:', newChild.toString());
        return this.domRenderer.appendChild((parent as VirtualNode).domElement || parent, newChild.renderDom());
      }

      // If the child is a ReactNode, then set the parent property of the virtual element to
      // be referenced later when rendering the React element.
      console.warn('Renderer > appendChild > asReact > parentElement:', parent.toString(), 'newChild:', newChild.toString());
      newChild.parent = (parent as VirtualNode).domElement || parent as HTMLElement;
      return;
    }

    // If the child is NOT being appended to an HTMLElement or VirtualNode that has been
    // rendered as an HTMLElement, then update the newChild.
    console.warn('Renderer > appendChild > asVirtual > parentNode:', parent.toString(), 'newChild:', newChild.toString());
    (parent as VirtualNode).children.push(newChild);
  }

  insertBefore(parent: any, newChild: VirtualNode, refChild: any): void {
    console.log('Renderer > insertBefore > parent:', parent.toString(), 'child:', newChild.toString(), 'refChild:', refChild.toString());

    if (parent) {
      ((parent as VirtualNode).domElement || parent as HTMLElement)
        .insertBefore(newChild.renderDom(), refChild);
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

  parentNode(node: HTMLElement | VirtualNode): any {
    console.log('Renderer > parentNode > node:', node.toString());
    return ((node as VirtualNode).domElement || node as HTMLElement).parentNode;
  }

  nextSibling(node: any): any {
    console.log('Renderer > nextSibling > node:', node.toString());
    return ((node as VirtualNode).domElement || node as HTMLElement).nextSibling;
  }

  setAttribute(node: VirtualNode, name: string, value: string, namespace?: string ): void {
    console.log('Renderer > setAttribute > element:', node.toString(), 'name:', name, 'value:', value, namespace ? 'namespace:' : '', namespace);

    if (node.domElement) {
      this.domRenderer.setAttribute(node.domElement, name, value, namespace);
      return;
    }

    if (node && node.setProperty) node.setProperty(name, value);
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

    if (!isVirtualNode(target) || target.domElement) {
      return this.domRenderer.listen((target as VirtualNode).domElement || target, event, callback);
    }

    target.setProperty(event, callback);

    // NEEDS WORK: Implement prevent default callback behavior.
    // return <() => void>this.eventManager.addEventListener(
    //            target, event, decoratePreventDefault(callback)) as() => void;


    // tslint:disable-next-line:no-unused-expression
    return () => null;
  }

}
