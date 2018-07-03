import { AngularReactBrowserModule } from '@angular-react/core';
import { FabBreadcrumbModule, FabButtonModule, FabCalloutModule, FabCheckboxModule, FabChoiceGroupModule, FabComboBoxModule, FabCommandBarModule, FabDatePickerModule, FabDialogModule, FabDividerModule, FabFabricModule, FabGroupedListModule, FabIconModule, FabImageModule, FabPanelModule, FabPersonaModule, FabSpinnerModule } from '@angular-react/fabric';
import { FabToggleModule } from '@angular-react/fabric/src/toggle';
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
    FabDatePickerModule,
    FabDividerModule,
    FabSpinnerModule,
    FabToggleModule,
    FabPersonaModule,
  ],
  declarations: [AppComponent, PanelBodyComponent],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    initializeIcons();
  }
}
