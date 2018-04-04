import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NxModule } from '@nrwl/nx';
import { ReactComponentsModule } from './react-components/react-components.module';

import { AngularReactBrowserModule, registerElement } from '@angular-react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Dialog } from 'office-ui-fabric-react/lib/Dialog';
import { DialogFooter } from 'office-ui-fabric-react/lib/components/Dialog';
import { AppComponent } from './app.component';


@NgModule({
  imports: [
    AngularReactBrowserModule,
    NxModule.forRoot(),
    ReactComponentsModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    // Add any React elements to the registry (used by the renderer).
    registerElement('DefaultButton', () => DefaultButton);
    registerElement('Dialog', () => Dialog);
    registerElement('DialogFooter', () => DialogFooter);
  }
}
