import { AngularReactBrowserModule } from '@angular-react/core';
import { FabButtonModule, FabDialogModule, FabIconModule, FabImageModule, FabPanelModule } from '@angular-react/fabric';
import { NgModule } from '@angular/core';
import { NxModule } from '@nrwl/nx';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { AppComponent } from './app.component';
import { WrapperComponent } from './wrapper.component';

@NgModule({
  imports: [AngularReactBrowserModule,
    NxModule.forRoot(),
    FabIconModule,
    FabButtonModule,
    FabDialogModule,
    FabImageModule,
    FabPanelModule,
  ],
  declarations: [AppComponent, WrapperComponent],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    initializeIcons();
  }
}
