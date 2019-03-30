// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

export { AngularReactBrowserModule } from './lib/angular-react-browser.module';
export * from './lib/components/wrapper-component';
export * from './lib/declarations/public-api';
export * from './lib/renderer/components/Disguise';
export { getPassProps, passProp, PassProp } from './lib/renderer/pass-prop-decorator';
export { createReactContentElement, ReactContent, ReactContentProps } from './lib/renderer/react-content';
export * from './lib/renderer/react-template';
export { registerElement } from './lib/renderer/registry';
export {
  JsxRenderFunc,
  RenderComponentOptions,
  InputRendererOptions,
  RenderPropOptions,
} from './lib/components/render-props';
