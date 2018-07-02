import { AngularReactBrowserModule } from '@angular-react/core';
import { FabBreadcrumbModule, FabButtonModule, FabCalloutModule, FabCheckboxModule, FabChoiceGroupModule, FabComboBoxModule, FabCommandBarModule, FabDialogModule, FabFabricModule, FabGroupedListModule, FabIconModule, FabImageModule, FabPanelModule } from '@angular-react/fabric';
import { NgModule } from '@angular/core';
import { NxModule } from '@nrwl/nx';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { AppComponent, PanelBodyComponent } from './app.component';

@NgModule({
  imports: [
    AngularReactBrowserModule,
    NxModule.forRoot(),
    FabFabricModule,
    FabIconModule,
    FabButtonModule,
    FabDialogModule,
    FabImageModule,
    FabPanelModule,
    FabCommandBarModule,
    FabBreadcrumbModule,
    FabCalloutModule,
    FabCheckboxModule,
    FabChoiceGroupModule,
    FabComboBoxModule,
    FabGroupedListModule,
  ],
  declarations: [AppComponent, PanelBodyComponent],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    initializeIcons();
  }
}
