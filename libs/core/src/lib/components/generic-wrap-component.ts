// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as React from 'react';
import {
  Component,
  ElementRef,
  ViewChild,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef,
  Renderer2,
  NgZone,
  Output,
  EventEmitter,
  Type,
} from '@angular/core';

declare const __decorate: typeof import('tslib').__decorate;

import { ReactWrapperComponent } from './wrapper-component';
import { registerElement } from '../renderer/registry';

export interface WrapComponentOptions<TProps extends object> {
  /**
   * The type of the component to wrap.
   */
  ReactComponent: React.ComponentType<TProps>;

  /**
   * The selector to use.
   */
  selector: string;

  /**
   * The prop names to pass to the `reactComponent`, if any.
   * Note that any prop starting with `on` will be converted to an `Output`, and other to `Input`s.
   *
   * @note If `reactComponent` has `propTypes`, this can be omitted.
   */
  propNames?: string[];

  /**
   * @see `WrapperComponentOptions#setHostDisplay`.
   */
  setHostDisplay?: boolean;

  /**
   * An _optional_ callback for specified wether a prop should be considered an `Output`.
   * @default propName => propName.startsWith('on')
   */
  isOutputProp?: (propName: string) => boolean;
}

/**
 * Gets the display name of a component.
 * @param WrappedComponent The type of the wrapper component
 */
function getDisplayName<TProps extends object>(WrappedComponent: React.ComponentType<TProps>): string {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

/**
 * Checks if the propName is an output one.
 * Currently uses a simple check - anything that starts with `on` is considered an output prop.
 */
function defaultIsOutputProp(propName: string): boolean {
  return propName.startsWith('on');
}

function getPropNames<TProps extends object>(ReactComponent: React.ComponentType<TProps>) {
  if (!ReactComponent.propTypes) {
    return null;
  }

  return Object.keys(ReactComponent.propTypes);
}

/**
 * Wrap a React component with an Angular one.
 *
 * @template TProps The type of props of the underlying React element.
 * @param options Options for wrapping the component.
 * @returns A class of a wrapper Angular component.
 */
export function wrapComponent<TProps extends object>(
  options: Readonly<WrapComponentOptions<TProps>>
): Type<ReactWrapperComponent<TProps>> {
  const Tag = getDisplayName(options.ReactComponent);
  registerElement(Tag, () => options.ReactComponent);

  const propNames = options.propNames || getPropNames(options.ReactComponent);
  const isOutputProp = options.isOutputProp || defaultIsOutputProp;

  const inputProps = propNames.filter(propName => !isOutputProp(propName));
  const outputProps = propNames.filter(isOutputProp);

  const inputPropsBindings = inputProps.map(propName => `[${propName}]="${propName}"`);
  const outputPropsBindings = outputProps.map(propName => `(${propName})="${propName}.emit($event)"`);
  const propsBindings = [...inputPropsBindings, ...outputPropsBindings].join('\n');

  @Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: ['react-renderer'],
    selector: options.selector,
    template: `
      <${Tag}
        #reactNode
        ${propsBindings}
      >
        <ReactContent><ng-content></ng-content></ReactContent>
      </${Tag}>
    `,
  })
  class WrapperComponent extends ReactWrapperComponent<TProps> {
    @ViewChild('reactNode') protected reactNodeRef: ElementRef;

    constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, renderer: Renderer2, ngZone: NgZone) {
      super(elementRef, changeDetectorRef, renderer, { ngZone, setHostDisplay: options.setHostDisplay });

      outputProps.forEach(propName => {
        this[propName] = new EventEmitter<any>();
      });
    }
  }

  inputProps.forEach(propName => __decorate([Input()], WrapperComponent.prototype, propName));
  outputProps.forEach(propName => __decorate([Output()], WrapperComponent.prototype, propName));

  return WrapperComponent;
}
