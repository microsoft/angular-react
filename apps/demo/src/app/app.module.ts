import { NgModule } from '@angular/core';
import { NxModule } from '@nrwl/nx';

import { AngularReactBrowserModule } from '@angular-react/core';
import { FabButtonComponent, FabDialogModule } from '@angular-react/fabric';
import { AppComponent } from './app.component';


@NgModule({
  imports: [AngularReactBrowserModule, NxModule.forRoot(), FabButtonComponent, FabDialogModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
