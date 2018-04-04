import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NxModule } from '@nrwl/nx';
import { AngularReactBrowserModule } from '@angular-react/core';
import { ReactComponentsModule } from './react-components/react-components.module';

import { registerElement } from '@angular-react/core/src/renderer/registry';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Dialog } from 'office-ui-fabric-react/lib/Dialog';
import { DialogFooter } from 'office-ui-fabric-react/lib/components/Dialog';


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
