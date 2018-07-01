import { AngularReactBrowserModule } from '@angular-react/core';
import { FabButtonModule, FabCommandBarModule, FabDialogModule, FabIconModule, FabImageModule, FabPanelModule } from '@angular-react/fabric';
import { NgModule } from '@angular/core';
import { NxModule } from '@nrwl/nx';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { AppComponent, PanelBodyComponent } from './app.component';
import { WrapperComponent } from './wrapper.component';

@NgModule({
  imports: [AngularReactBrowserModule,
    NxModule.forRoot(),
    FabIconModule,
    FabButtonModule,
    FabDialogModule,
    FabImageModule,
    FabPanelModule,
    FabCommandBarModule,
  ],
  declarations: [AppComponent, PanelBodyComponent],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    initializeIcons();
  }
}
