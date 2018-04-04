import { BrowserModule } from '@angular/platform-browser';
import { NgModule, RootRenderer } from '@angular/core';
import { ɵDomRendererFactory2 } from '@angular/platform-browser';
import { ElementSchemaRegistry } from '@angular/compiler';

import { AngularReactRendererFactory } from './renderer/renderer';


@NgModule({
  imports: [BrowserModule],
  exports: [BrowserModule],
  providers: [
    { provide: ɵDomRendererFactory2, useClass: AngularReactRendererFactory }
  ]
})
export class AngularReactBrowserModule {}
