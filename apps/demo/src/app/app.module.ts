import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NxModule } from '@nrwl/nx';

import { AngularReactBrowserModule, registerElement } from '@angular-react/core';
import { AngularReactFabricModule } from '@angular-react/fabric';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { ReactComponentsModule } from './react-components/react-components.module';
import { AppRoutingModule } from './app-routing.module';
import { ContainersModule } from './containers/containers.module';


@NgModule({
  imports: [
    AngularReactBrowserModule,
    NxModule.forRoot(),
    AngularReactFabricModule,
    AppRoutingModule,

    ContainersModule,
    ComponentsModule,
    ReactComponentsModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
