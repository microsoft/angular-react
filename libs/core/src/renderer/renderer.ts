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


const DEBUG = false;

@Injectable()
export class AngularReactRendererFactory extends ɵDomRendererFactory2 {
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
    // Get the DOM Renderer for this element.
    console.log('Element before:', element)
    const domRenderer = super.createRenderer(element, type);
    console.log('Element after:', element, domRenderer);

    // Create the HybridRenderer for this element. The HybridRenderer acts as a switch operator
    // and creates each element via callback when the element is inserted.  This delay in create allows
    // determination of whether the element is a child of only DOM elements or a child of a React Element
    // and allows for the appropriate renderer (DOM or React) to be used.
    return new VirtualRenderer(domRenderer, this);
    // return domRenderer;
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
    if (DEBUG) { console.error('Renderer > createElement > name:', name, namespace ? 'namespace:' : '', namespace); }
    return new VirtualNode(this.rootRenderer)
      .asElement(name)
      .addRenderDomCallback(() => this.domRenderer.createElement(name, namespace));
  }

  createComment(value: string): VirtualNode {
    if (DEBUG) { console.error('Renderer > createComment > value:', value); }
    return new VirtualNode(this.rootRenderer)
      .asComment(value)
      .addRenderDomCallback(() => this.domRenderer.createComment(value));
  }

  createText(value: string): VirtualNode {
    if (DEBUG) { console.error('Renderer > createText > value:', value); }
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
        if (DEBUG) { console.warn('Renderer > appendChild > asDOM > parentElement:', parent.toString(), 'newChild:', newChild.toString()); }
        return this.domRenderer.appendChild((parent as VirtualNode).domElement || parent, newChild.renderDom());
      }

      // If the child is a ReactNode, then set the parent property of the virtual element to
      // be referenced later when rendering the React element.
      if (DEBUG) { console.warn('Renderer > appendChild > asReact > parentElement:', parent.toString(), 'newChild:', newChild.toString()); }
      newChild.parent = (parent as VirtualNode).domElement || parent as HTMLElement;
      return;
    }

    // If the child is NOT being appended to an HTMLElement or VirtualNode that has been
    // rendered as an HTMLElement, then update the newChild.
    if (DEBUG) { console.warn('Renderer > appendChild > asVirtual > parentNode:', parent.toString(), 'newChild:', newChild.toString()); }
    (parent as VirtualNode).children.push(newChild);
  }

  insertBefore(parent: HTMLElement | VirtualNode | void, newChild: VirtualNode, refChild: any): void {
    // Only insert a child if there is a parent.
    if (!parent) {
      return;
    }

    // If the child is being appended to an HTMLElement or VirtualNode that has been
    // rendered as an HTMLElement...
    if ((!isVirtualNode(parent)  || !!parent.domElement)) {
      if (!newChild.isReactNode) {
        if (DEBUG) { console.log('Renderer > insertBefore > parent:', parent ? parent.toString() : 'undefined', 'child:', newChild.toString(), 'refChild:', refChild.toString()); }

        this.domRenderer.insertBefore((parent as VirtualNode).domElement || parent, newChild.renderDom(), refChild);
        return;
      }

      // If the child is a ReactNode, then DO SOMETHING.
      if (DEBUG) { console.warn('NOT IMPLEMENTED - Renderer > appendChild > asReact > parentElement:', parent.toString(), 'newChild:', newChild.toString()); }
    }

    // If the child is NOT being appended to an HTMLElement or VirtualNode that has been
    // rendered as an HTMLElement, then DO SOMETHING.
    if (DEBUG) { console.warn('NOT IMPLEMENTED - Renderer > appendChild > asVirtual > parentNode:', parent.toString(), 'newChild:', newChild.toString()); }
  }

  removeChild(parent: HTMLElement | VirtualNode | void, oldChild: VirtualNode): void {
    // NEEDS WORK.
    if (DEBUG) { console.log('Renderer > removeChild > parent:', parent ? parent.toString() : 'undefined', 'child:', oldChild.toString()); }

    if (parent) {
      (parent as any).removeChild(oldChild.domElement);
    }




    // if (parent) {
    //   // Use DOM Renderer to update rendered element and return (the virtual node is
    //   //  not used once the DOM element is rendered).
    //   if ((!isVirtualNode(oldChild) || !!oldChild.domElement)) {
    //     this.domRenderer.removeChild(parent, (oldChild as VirtualNode).domElement || oldChild);
    //     return;
    //   }

    //   // Update the virtual node.
    //   // TODO: Should we do something here for the React rendering scenario?

    //   // Provide a callback for deferred DOM rendering.
    //   oldChild.addRenderDomCallback((el) => this.domRenderer.removeChild(parent, el));
    // }
  }

  selectRootElement(selectorOrNode: string | any): any {
    // NEEDS WORK
    if (DEBUG) { console.log('Renderer > selectRootElement > selectorOrNode:', selectorOrNode); }

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
    if (DEBUG) { console.log('Renderer > parentNode > node:', node.toString()); }
    return ((node as VirtualNode).domElement || node as HTMLElement).parentNode;
  }

  nextSibling(node: any): any {
    if (DEBUG) { console.log('Renderer > nextSibling > node:', node.toString()); }
    return ((node as VirtualNode).domElement || node as HTMLElement).nextSibling;
  }

  setAttribute(node: HTMLElement | VirtualNode, name: string, value: string, namespace?: string ): void {
    if (DEBUG) { console.log('Renderer > setAttribute > node:', node.toString(), 'name:', name, 'value:', value, namespace ? 'namespace:' : '', namespace); }

    // Use DOM Renderer to update rendered element and return (the virtual node is
    //  not used once the DOM element is rendered).
    if ((!isVirtualNode(node)  || !!node.domElement)) {
      this.domRenderer.setAttribute((node as VirtualNode).domElement || node, name, value, namespace);
      return;
    }

    // Update the virtual node.
    node.setProperty(name, value);

    // Provide a callback for deferred DOM rendering.
    node.addRenderDomCallback((el) => this.domRenderer.setAttribute(el, name, value, namespace));
  }

  removeAttribute(node: HTMLElement | VirtualNode, name: string, namespace?: string): void {
    if (DEBUG) { console.log('Renderer > removeAttribute > node:', node.toString(), 'name:', name, namespace ? 'namespace:' : '', namespace); }

    // Use DOM Renderer to update rendered element and return (the virtual node is
    //  not used once the DOM element is rendered).
    if ((!isVirtualNode(node)  || !!node.domElement)) {
      this.domRenderer.removeAttribute((node as VirtualNode).domElement || node, name, namespace);
      return;
    }

    // Update the virtual node.
    node.removeProperty(name);

    // Provide a callback for deferred DOM rendering.
    node.addRenderDomCallback((el) => this.domRenderer.removeAttribute(el, name, namespace));
  }

  addClass(node: HTMLElement | VirtualNode, name: string): void {
    if (DEBUG) { console.log('Renderer > addClass > node:', node.toString(), 'name:', name); }

    // Use DOM Renderer to update rendered element and return (the virtual node is
    //  not used once the DOM element is rendered).
    if ((!isVirtualNode(node)  || !!node.domElement)) {
      this.domRenderer.addClass((node as VirtualNode).domElement || node, name);
      return;
    }

    // Update the virtual node.
    // TODO: This may only support a single class name, but might work if property name is a single
    //       comma-delimited list of classes...
    node.setProperty('className', name);

    // Provide a callback for deferred DOM rendering.
    node.addRenderDomCallback((el) => this.domRenderer.addClass(el, name));
  }

  removeClass(node: HTMLElement | VirtualNode, name: string): void {
    if (DEBUG) { console.log('Renderer > removeClass > node:', node.toString(), 'name:', name); }

    // Use DOM Renderer to update rendered element and return (the virtual node is
    //  not used once the DOM element is rendered).
    if ((!isVirtualNode(node)  || !!node.domElement)) {
      this.domRenderer.removeClass((node as VirtualNode).domElement || node, name);
      return;
    }

    // Update the virtual node.
    // TODO: This may not work correctly to remove a single name from a comma-delimited list.
    node.removeProperty('className');

    // Provide a callback for deferred DOM rendering.
    node.addRenderDomCallback((el) => this.domRenderer.removeClass(el, name));
  }

  setStyle(node: HTMLElement | VirtualNode, style: string, value: any, flags: RendererStyleFlags2): void {
    // if (DEBUG) { console.log('Renderer > setStyle > node: ', node.toString(), 'style:', style, 'value:', value, 'flags:', flags); }

    // Use DOM Renderer to update rendered element and return (the virtual node is
    //  not used once the DOM element is rendered).
    if ((!isVirtualNode(node)  || !!node.domElement)) {
      this.domRenderer.setStyle((node as VirtualNode).domElement || node, name, value, flags);
      return;
    }

    // Update the virtual node.
    if (flags & RendererStyleFlags2.DashCase) {
      node.setProperty('style', { style: value + !!(flags & RendererStyleFlags2.Important) ? ' !important' : '' });
    } else {
      node.setProperty('style', { style: value });
    }

    // Provide a callback for deferred DOM rendering.
    node.addRenderDomCallback((el) => this.domRenderer.setStyle(el, name, value, flags));
  }

  removeStyle(node: HTMLElement | VirtualNode, style: string, flags: RendererStyleFlags2): void {
    if (DEBUG) { console.log( 'Renderer > removeStyle > node:', node.toString(), 'style:', style, 'flags:', flags); }

    // Use DOM Renderer to update rendered element and return (the virtual node is
    //  not used once the DOM element is rendered).
    if ((!isVirtualNode(node)  || !!node.domElement)) {
      this.domRenderer.removeStyle((node as VirtualNode).domElement || node, style, flags);
      return;
    }

    // Update the virtual node.
    node.removeProperty('style', style);

    // Provide a callback for deferred DOM rendering.
    node.addRenderDomCallback((el) => this.domRenderer.removeStyle(el, style, flags));
  }

  setProperty(node: HTMLElement | VirtualNode, name: string, value: any): void {
    if (DEBUG) { console.log('Renderer > setProperty > node:', node.toString(), 'name:', name, 'value:', value); }

    // Use DOM Renderer to update rendered element and return (the virtual node is
    //  not used once the DOM element is rendered).
    if ((!isVirtualNode(node)  || !!node.domElement)) {
      this.domRenderer.setProperty((node as VirtualNode).domElement || node, name, value);
      return;
    }
    // Update the virtual node.
    node.setProperty(name, value);

    // Provide a callback for deferred DOM rendering.
    node.addRenderDomCallback((el) => this.domRenderer.setProperty(el, name, value));
  }

  setValue(node: HTMLElement | VirtualNode, value: string): void {
    if (DEBUG) { console.log('Renderer > setValue > node:', node.toString(), 'value:', value); }

    // Use DOM Renderer to update rendered element and return (the virtual node is
    //  not used once the DOM element is rendered).
    if ((!isVirtualNode(node)  || !!node.domElement)) {
      this.domRenderer.setValue((node as VirtualNode).domElement || node, value);
      return;
    }
    // Update the virtual node.
    node.setProperty('value', value);

    // Provide a callback for deferred DOM rendering.
    node.addRenderDomCallback((el) => this.domRenderer.setValue(el, value));
  }

  listen(target: 'window' | 'document' | 'body' | HTMLElement | VirtualNode, event: string, callback: (event: any) => boolean): () => void {
    if (DEBUG) { console.log('Renderer > listen > target:', target, 'event:', event); }

    // Use DOM Renderer to update rendered element and return (the virtual node is
    //  not used once the DOM element is rendered).
    if (!isVirtualNode(target) || target.domElement) {
      return this.domRenderer.listen((target as VirtualNode).domElement || target, event, callback);
    }

    // Update the virtual node.
    target.setProperty(event, callback);

    // Provide a callback for deferred DOM rendering.
    target.addRenderDomCallback((el) => this.domRenderer.listen(el, event, callback));

    // NEEDS WORK: Implement prevent default callback behavior.
    // return <() => void>this.eventManager.addEventListener(
    //            target, event, decoratePreventDefault(callback)) as() => void;


    // tslint:disable-next-line:no-unused-expression
    return () => null;
  }

}
