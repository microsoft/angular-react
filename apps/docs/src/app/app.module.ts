import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NxModule } from '@nrwl/nx';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularReactBrowserModule, registerElement } from '@angular-react/core';

import { SharedModule } from './shared';
import { ComponentsModule } from './components';
import { LandingComponent, ComponentDocsModule, DocsModule, PerformanceModule } from './containers';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { ReactComponentsModule } from './react-components';
import { AppComponent } from './app.component';
import { FabricModule } from './fabric.module';


@NgModule({
  imports: [
    AngularReactBrowserModule,
    NxModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FabricModule,

    SharedModule,
    ReactComponentsModule,
    ComponentsModule,
    ComponentDocsModule,
    DocsModule,
    PerformanceModule,
  ],
  declarations: [AppComponent, LandingComponent],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
