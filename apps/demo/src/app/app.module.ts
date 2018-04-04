import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NxModule } from '@nrwl/nx';

import { AngularReactBrowserModule } from '@angular-react/core';
import { AngularReactFabricModule } from '@angular-react/fabric';
import { AppComponent } from './app.component';


@NgModule({
  imports: [
    AngularReactBrowserModule,
    NxModule.forRoot(),
    AngularReactFabricModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
