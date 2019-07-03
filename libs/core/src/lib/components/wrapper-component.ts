// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
/// <reference path="../@types/geteventlisteners.d.ts" />

import {
  AfterViewInit,
  ChangeDetectorRef,
  ElementRef,
  Input,
  NgZone,
  OnChanges,
  Renderer2,
  SimpleChanges,
  AfterContentInit,
} from '@angular/core';
import classnames from 'classnames';
import toStyle from 'css-to-style';
import stylenames, { StyleObject } from 'stylenames';

import { Many } from '../declarations/many';
import { ReactContentProps } from '../renderer/react-content';
import { isReactNode } from '../renderer/react-node';
import { isReactRendererData } from '../renderer/renderer';
import { toObject } from '../utils/object/to-object';
import { afterRenderFinished } from '../utils/render/render-delay';
import { InputRendererOptions, JsxRenderFunc, createInputJsxRenderer, createRenderPropHandler } from './render-props';

// Forbidden attributes are still ignored, since they may be set from the wrapper components themselves (forbidden is only applied for users of the wrapper components)
const ignoredAttributeMatchers = [/^_?ng-?.*/, /^style$/, /^class$/];

const ngClassRegExp = /^ng-/;

export type ContentClassValue = string[] | Set<string> | { [klass: string]: any };
export type ContentStyleValue = string | StyleObject;

/**
 * Optional options to pass to `ReactWrapperComponent`.
 */
export interface WrapperComponentOptions {
  /**
   * Whether the host's `display` should be set to the root child node's`display`.
   * @default `false`.
   */
  readonly setHostDisplay?: boolean;

  /**
   * The zone to use to track changes to inner (Angular) templates & components.
   * @default `undefined`.
   */
  readonly ngZone?: NgZone;
}

const defaultWrapperComponentOptions: WrapperComponentOptions = {
  setHostDisplay: false,
};

/**
 * Base class for Angular @Components wrapping React Components.
 * Simplifies some of the handling around passing down props and CSS styling on the host component.
 */
// NOTE: TProps is not used at the moment, but a preparation for a potential future change.
export abstract class ReactWrapperComponent<TProps extends {}> implements AfterContentInit, AfterViewInit, OnChanges {
  private _contentClass: Many<ContentClassValue>;
  private _contentStyle: ContentStyleValue;

  private _ngZone: NgZone;
  private _shouldSetHostDisplay: boolean;

  protected abstract reactNodeRef: ElementRef<HTMLElement>;

  /**
   * Alternative to `class` and `[ngClass]` using the same syntax.
   *
   * @description Since this is a wrapper component, sticking to the virtual DOM concept, its DOM element shouldn't have any styling of its own.
   * Instead, any value passes to `contentClass` will be passed to the root component's class as `className`.
   */
  @Input()
  set contentClass(value: Many<ContentClassValue>) {
    this._contentClass = value;
    if (isReactNode(this.reactNodeRef.nativeElement)) {
      this.reactNodeRef.nativeElement.setProperty('className', classnames(value));
      this.markForCheck();
    }
  }

  get contentClass(): Many<ContentClassValue> {
    return this._contentClass;
  }

  /**
   * Alternative to `style` and `[ngStyle]` using (almost) the same syntax.
   * All syntax supports by `ngStyle` is supported, with the exception of specifying units in the key (`{ 'width.px': 12 }`).
   *
   * @description Since this is a wrapper component, sticking to the virtual DOM concept, this should have any styling of its own.
   * Any value passes to `contentStyle` will be passed to the root component's style.
   */
  @Input()
  set contentStyle(value: ContentStyleValue) {
    this._contentStyle = value;
    if (isReactNode(this.reactNodeRef.nativeElement)) {
      const stringValue = typeof value === 'string' ? value : stylenames(value);
      this.reactNodeRef.nativeElement.setProperty('style', toStyle(stringValue));
      this.markForCheck();
    }
  }

  get contentStyle(): ContentStyleValue {
    return this._contentStyle;
  }

  /**
   * Creates an instance of ReactWrapperComponent.
   * @param elementRef The host element.
   * @param changeDetectorRef The change detector for the component.
   * @param renderer The Angular renderer.
   */
  constructor(
    public readonly elementRef: ElementRef<HTMLElement>,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly renderer: Renderer2,
    { setHostDisplay, ngZone }: WrapperComponentOptions = defaultWrapperComponentOptions
  ) {
    this._ngZone = ngZone;
    this._shouldSetHostDisplay = setHostDisplay;
  }

  ngAfterContentInit() {
    this._passAttributesAsProps();
  }

  ngAfterViewInit() {
    if (this._shouldSetHostDisplay) {
      this._setHostDisplay();
    }

    // NOTE: Workaround/fix for Issue #5 (https://github.com/Microsoft/angular-react/issues/5).
    // The wrapper component isn't added to the root react nodes list when it's inside a `ReactContent` node, we manually add it (note that the root nodes list is a `Set`, so it won't duplicate nodes if already exist).
    // There's potentially a better solution instead of this
    const rendererData = this.renderer.data;
    if (isReactRendererData(rendererData)) {
      afterRenderFinished(() => {
        const nativeElement = this.reactNodeRef.nativeElement;
        if (isReactNode(nativeElement)) {
          rendererData.addRootNode(nativeElement);
        }
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this._passAttributesAsProps();

    this.markForCheck();
  }

  /**
   * Mark the component as one that needed re-rendering on the React side,
   * and mark for change detection on the Angular side.
   */
  protected markForCheck() {
    if (isReactNode(this.reactNodeRef.nativeElement)) {
      this.reactNodeRef.nativeElement.setRenderPending();
    }

    this.changeDetectorRef.markForCheck();
  }

  /**
   * Create an JSX renderer for an `@Input` property.
   * @param input The input property.
   * @param additionalProps optional additional props to pass to the `ReactContent` object that will render the content.
   */
  protected createInputJsxRenderer<TContext extends object>(
    input: InputRendererOptions<TContext>,
    additionalProps?: ReactContentProps
  ): JsxRenderFunc<TContext> | undefined {
    if (input === undefined) {
      return undefined;
    }

    if (!this._ngZone) {
      throw new Error('To create an input JSX renderer you must pass an NgZone to the constructor.');
    }

    return createInputJsxRenderer(input, this._ngZone, additionalProps);
  }

  /**
   * Create an event handler for a render prop
   * @param renderInputValue the value of the render `@Input` property.
   * @param jsxRenderer an optional renderer to use.
   * @param additionalProps optional additional props to pass to the `ReactContent` object that will render the content.
   */
  protected createRenderPropHandler<TRenderProps extends object>(
    renderInputValue: InputRendererOptions<TRenderProps>,
    options?: {
      jsxRenderer?: JsxRenderFunc<TRenderProps>;
      additionalProps?: ReactContentProps;
    }
  ): (props?: TRenderProps, defaultRender?: JsxRenderFunc<TRenderProps>) => JSX.Element | null {
    return createRenderPropHandler(renderInputValue, this._ngZone, options);
  }

  private _passAttributesAsProps() {
    const hostAttributes = Array.from((this.elementRef.nativeElement as HTMLElement).attributes);

    if (!this.reactNodeRef || !isReactNode(this.reactNodeRef.nativeElement)) {
      throw new Error('reactNodeRef must hold a reference to a ReactNode');
    }

    // Ensure there are no blacklisted props. Suggest alternative as error if there is any
    hostAttributes.forEach(attr => {
      const [forbidden, alternativeAttrName] = this._isForbiddenAttribute(attr);
      if (forbidden) {
        throw new Error(
          `[${(this.elementRef
            .nativeElement as HTMLElement).tagName.toLowerCase()}] React wrapper components cannot have the '${
            attr.name
          }' attribute set. Use the following alternative: ${alternativeAttrName || ''}`
        );
      }
    });

    const whitelistedHostAttributes = hostAttributes.filter(attr => !this._isIgnoredAttribute(attr));
    const props = whitelistedHostAttributes.reduce(
      (acc, attr) => ({
        ...acc,
        [attr.name]: attr.value,
      }),
      {}
    );

    const eventListeners = this.elementRef.nativeElement.getEventListeners();
    const eventHandlersProps =
      eventListeners && Object.keys(eventListeners).length
        ? toObject(
            Object.values(eventListeners).map<[string, React.EventHandler<React.SyntheticEvent>]>(([eventListener]) => [
              eventListener.type,
              (ev: React.SyntheticEvent) => eventListener.listener(ev && ev.nativeEvent),
            ])
          )
        : {};
    {
    }

    this.reactNodeRef.nativeElement.setProperties({ ...props, ...eventHandlersProps });
  }

  private _setHostDisplay() {
    const nativeElement = this.elementRef.nativeElement;

    // We want to wait until child elements are rendered
    requestAnimationFrame(() => {
      if (nativeElement.firstElementChild) {
        const rootChildDisplay = getComputedStyle(nativeElement.firstElementChild).display;
        nativeElement.style.display = rootChildDisplay;
      }
    });
  }

  private _isIgnoredAttribute(attr: Attr) {
    return ignoredAttributeMatchers.some(regExp => regExp.test(attr.name));
  }

  private _isForbiddenAttribute(attr: Attr): [boolean, string | undefined] {
    const { name, value } = attr;

    if (name === 'key') return [true, undefined];
    if (name === 'class' && value.split(' ').some(className => !ngClassRegExp.test(className)))
      return [true, 'contentClass'];
    if (name === 'style') {
      const style = toStyle(value);
      // Only allowing style if it's something that changes the display - setting anything else should be done on the child component directly (via the `styles` attribute in fabric for example)
      if (Object.entries(style).filter(([key, value]) => value && key !== 'display').length > 0) {
        return [true, 'contentStyle'];
      }
    }

    return [false, undefined];
  }
}
