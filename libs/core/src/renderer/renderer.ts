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
import { ReactNode } from './react-node';


@Injectable()
export class AngularReactRendererFactory extends ɵDomRendererFactory2 {
  private _rendererByCompId = new Map<string, Renderer2>();
  private _defaultRenderer: Renderer2;

  public reactNodes: Array<ReactNode> = [];

  private _needsRendering = true;
  public setNeedsRendering() {
    this._needsRendering = true;
  }

  constructor(
    private _eventManager: EventManager,
    private _sharedStylesHost: ɵDomSharedStylesHost
  ) {
    super(_eventManager, _sharedStylesHost);

    this._defaultRenderer = new AngularReactRenderer(this._eventManager, this);
  }

  createRenderer(element: any, type: RendererType2 | null): Renderer2 {
    if (!element || !type) {
      return super.createRenderer(element, type);
    }

    // Determine whether this component is a react wrapper and provide the unique renderer.
    if (type && type.styles.length && type.styles[0] === 'react-renderer') {
      console.log('Factory > createRenderer: ', type, 'element: ', element);

      let renderer = this._rendererByCompId.get(type.id);
      if (!renderer) {
        console.log('Using new instance of AngularReactRenderer...');
        renderer = this._defaultRenderer;
        this._rendererByCompId.set(type.id, renderer);
      }

      return renderer;
    }

    console.log(
      'Factory > createRenderer_DEFAULT: ',
      type,
      'element: ',
      element
    );
    return super.createRenderer(element, type);
  }

  begin() {
    // console.log('Factory > begin');
  }

  end() {
    console.log('Factory > end');

    if (this._needsRendering) {
      console.log('Factory > end > rendering reactNodes: ', this.reactNodes);
      this.reactNodes.map(node => node.render());
      this._needsRendering = false;
    }
  }
}

class AngularReactRenderer implements Renderer2 {
  data: { [key: string]: any } = Object.create(null);

  constructor(
    private eventManager: EventManager,
    private rootRenderer: AngularReactRendererFactory
  ) {}

  destroyNode: null;

  destroy(): void {
    console.log('Renderer > destroy');
  }

  createElement(name: string, namespace?: string): ReactNode {
    console.log(
      'Renderer > createElement > name: ',
      name,
      'namespace: ',
      namespace
    );

    // return new ElementNode(name, this._rootRenderer.wrapper, this._rootRenderer);

    // tslint:disable-next-line:no-eval
    return new ReactNode(name, this.rootRenderer);
  }

  createComment(value: string): any {
    console.log('Renderer > createComment > value: ', value);

    // return document.createComment(value);
    return null;
  }

  createText(value: string): string {
    // console.log('Renderer > createText > value: ', value);
    // debugger;

    // return React.createElement(name);
    // return new ReactElementDefinition(DefaultButton);

    // Only return and write a node if the string is not empty.
    if (!value.trim()) {
      return null;
    }

    console.log('Renderer > createText > value: ', value);
    return value; // document.createTextNode(value);
  }

  appendChild(parent: any, newChild: ReactNode): void {
    // Only append a child if there is a child.
    if (!newChild) {
      return;
    }

    // Determine if the child is being appended to another react element or to the containing DOM element.
    if (parent && parent.type) {
      parent.children.push(newChild);
      console.log('Renderer > appendChild-to-children: ', newChild);
    } else {
      newChild.parent = parent;
      this.rootRenderer.reactNodes.push(newChild);
      console.log('Renderer > appendChild: ', newChild);
    }
  }

  insertBefore(parent: any, newChild: any, refChild: any): void {
    console.log(
      'Renderer > insertBefore > parent: ',
      parent,
      'child: ',
      newChild
    );

    if (parent) {
      parent.insertBefore(newChild, refChild);
    }
  }

  removeChild(parent: any, oldChild: any): void {
    console.log(
      'Renderer > removeChild > parent: ',
      parent,
      'child: ',
      oldChild
    );

    if (parent) {
      parent.removeChild(oldChild);
    }
  }

  selectRootElement(selectorOrNode: string | any): any {
    console.log(
      'Renderer > selectRootElement > selectorOrNode: ',
      selectorOrNode
    );

    const el: any =
      typeof selectorOrNode === 'string'
        ? document.querySelector(selectorOrNode)
        : selectorOrNode;
    if (!el) {
      throw new Error(
        `The selector "${selectorOrNode}" did not match any elements`
      );
    }
    el.textContent = '';
    return el;
  }

  parentNode(node: any): any {
    console.log('Renderer > parentNode > node: ', node);

    return node.parentNode;
  }

  nextSibling(node: any): any {
    console.log('Renderer > nextSibling > node: ', node);

    return node.nextSibling;
  }

  setAttribute(
    el: ReactNode,
    name: string,
    value: string,
    namespace?: string
  ): void {
    console.log(
      'Renderer > setAttribute > element: ',
      el,
      'name: ',
      name,
      'value: ',
      value,
      'namespace: ',
      namespace
    );

    // if (namespace) {
    //   name = `${namespace}:${name}`;
    //   const namespaceUri = ɵNAMESPACE_URIS[namespace];
    //   if (namespaceUri) {
    //     el.setAttributeNS(namespaceUri, name, value);
    //   } else {
    //     el.setAttribute(name, value);
    //   }
    // } else {
    //   el.setAttribute(name, value);
    // }

    el.setProperty(name, value);
  }

  removeAttribute(el: any, name: string, namespace?: string): void {
    console.log(
      'Renderer > removeAttribute > element: ',
      el,
      'name: ',
      name,
      'namespace: ',
      namespace
    );

    if (namespace) {
      const namespaceUri = ɵNAMESPACE_URIS[namespace];
      if (namespaceUri) {
        el.removeAttributeNS(namespaceUri, name);
      } else {
        el.removeAttribute(`${namespace}:${name}`);
      }
    } else {
      el.removeAttribute(name);
    }
  }

  addClass(el: any, name: string): void {
    console.log('Renderer > addClass > element: ', el, 'name: ', name);

    el.classList.add(name);
  }

  removeClass(el: any, name: string): void {
    console.log('Renderer > removeClass > element: ', el, 'name: ', name);

    el.classList.remove(name);
  }

  setStyle(
    el: any,
    style: string,
    value: any,
    flags: RendererStyleFlags2
  ): void {
    console.log(
      'Renderer > setStyle > element: ',
      el,
      'style: ',
      style,
      'value: ',
      value,
      'flags: ',
      flags
    );

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
    console.log(
      'Renderer > removeStyle > element: ',
      el,
      'style: ',
      style,
      'flags: ',
      flags
    );

    if (flags & RendererStyleFlags2.DashCase) {
      el.style.removeProperty(style);
    } else {
      // IE requires '' instead of null
      // see https://github.com/angular/angular/issues/7916
      el.style[style] = '';
    }
  }

  setProperty(el: ReactNode, name: string, value: any): void {
    console.log(
      'Renderer > setProperty > element: ',
      el,
      'name: ',
      name,
      'value: ',
      value
    );

    // checkNoSyntheticProp(name, 'property');
    // el[name] = value;
    el.setProperty(name, value);
  }

  setValue(node: any, value: string): void {
    console.log('Renderer > setValue > node: ', node, 'value: ', value);

    node.nodeValue = value;
  }

  listen(
    target: ReactNode,
    event: string,
    callback: (event: any) => boolean
  ): () => void {
    console.log('Renderer > listen > target: ', target, 'event: ', event);

    // // checkNoSyntheticProp(event, 'listener');
    // if (typeof target === 'string') {
    //   return <() => void>this.eventManager.addGlobalEventListener(
    //       target, event, decoratePreventDefault(callback));
    // }
    // return <() => void>this.eventManager.addEventListener(
    //            target, event, decoratePreventDefault(callback)) as() => void;

    target.setProperty(event, callback);

    // tslint:disable-next-line:no-unused-expression
    return () => null;
  }
}

function decoratePreventDefault(eventHandler: Function): Function {
  console.log(
    'Renderer > decoratePreventDefault > eventHandler: ',
    eventHandler
  );

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
  console.log('checkNoSyntheticProp > name: ', name, 'nameKind: ', nameKind);

  if (name.charCodeAt(0) === AT_CHARCODE) {
    throw new Error(
      // tslint:disable-next-line:max-line-length
      `Found the synthetic ${nameKind} ${name}. Please include either "BrowserAnimationsModule" or "NoopAnimationsModule" in your application.`
    );
  }
}
