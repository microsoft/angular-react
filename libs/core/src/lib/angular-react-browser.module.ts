// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { NgModule } from '@angular/core';
import { BrowserModule, ɵDomRendererFactory2 } from '@angular/platform-browser';
import { AngularReactRendererFactory } from './renderer/renderer';

@NgModule({
  imports: [BrowserModule],
  exports: [BrowserModule],
  providers: [{ provide: ɵDomRendererFactory2, useClass: AngularReactRendererFactory }],
})
export class AngularReactBrowserModule {}
