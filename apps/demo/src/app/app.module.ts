import { AngularReactBrowserModule } from '@angular-react/core';
import { FabBreadcrumbModule, FabButtonModule, FabCalloutModule, FabModalModule, FabCheckboxModule, FabChoiceGroupModule, FabComboBoxModule, FabCommandBarModule, FabDatePickerModule, FabDialogModule, FabDividerModule, FabFabricModule, FabGroupedListModule, FabIconModule, FabImageModule, FabPanelModule, FabPersonaModule, FabSpinnerModule, FabMessageBarModule, FabLinkModule, FabToggleModule, FabPivotModule, FabHoverCardModule, FabTooltipModule, FabShimmerModule, FabSliderModule, FabSearchBoxModule } from '@angular-react/fabric';
import { NgModule } from '@angular/core';
import { NxModule } from '@nrwl/nx';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { AppComponent } from './app.component';

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
    FabPivotModule,
    FabLinkModule,
    FabMessageBarModule,
    FabHoverCardModule,
    FabModalModule,
    FabTooltipModule,
    FabShimmerModule,
    FabSliderModule,
    FabSearchBoxModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    initializeIcons();
  }
}
