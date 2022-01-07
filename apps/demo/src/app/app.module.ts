import { AngularReactBrowserModule } from '@angular-react/core';
import { NgModule } from '@angular/core';
import { NxModule } from '@nrwl/nx';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import { AppComponent } from './app.component';
import { CounterComponent } from './counter/counter.component';
import { FabFabricModule } from '@angular-react/fabric/lib/components/fabric';
import { FabIconModule } from '@angular-react/fabric/lib/components/icon';
import { FabButtonModule } from '@angular-react/fabric/lib/components/button';
import { FabDialogModule } from '@angular-react/fabric/lib/components/dialog';
import { FabImageModule } from '@angular-react/fabric/lib/components/image';
import { FabDropdownModule } from '@angular-react/fabric/lib/components/dropdown';
import { FabPanelModule } from '@angular-react/fabric/lib/components/panel';
import { FabCommandBarModule } from '@angular-react/fabric/lib/components/command-bar';
import { FabBreadcrumbModule } from '@angular-react/fabric/lib/components/breadcrumb';
import { FabCalloutModule } from '@angular-react/fabric/lib/components/callout';
import { FabCheckboxModule } from '@angular-react/fabric/lib/components/checkbox';
import { FabChoiceGroupModule } from '@angular-react/fabric/lib/components/choice-group';
import { FabComboBoxModule } from '@angular-react/fabric/lib/components/combo-box';
import { FabGroupedListModule } from '@angular-react/fabric/lib/components/grouped-list';
import { FabDatePickerModule } from '@angular-react/fabric/lib/components/date-picker';
import { FabDividerModule } from '@angular-react/fabric/lib/components/divider';
import { FabSpinnerModule } from '@angular-react/fabric/lib/components/spinner';
import { FabToggleModule } from '@angular-react/fabric/lib/components/toggle';
import { FabPersonaModule } from '@angular-react/fabric/lib/components/persona';
import { FabPivotModule } from '@angular-react/fabric/lib/components/pivot';
import { FabLinkModule } from '@angular-react/fabric/lib/components/link';
import { FabMessageBarModule } from '@angular-react/fabric/lib/components/message-bar';
import { FabHoverCardModule } from '@angular-react/fabric/lib/components/hover-card';
import { FabModalModule } from '@angular-react/fabric/lib/components/modal';
import { FabTooltipModule } from '@angular-react/fabric/lib/components/tooltip';
import { FabShimmerModule } from '@angular-react/fabric/lib/components/shimmer';
import { FabSliderModule } from '@angular-react/fabric/lib/components/slider';
import { FabSearchBoxModule } from '@angular-react/fabric/lib/components/search-box';
import { FabCalendarModule } from '@angular-react/fabric/lib/components/calendar';
import { FabDetailsListModule } from '@angular-react/fabric/lib/components/details-list';
import { FabGroupModule } from '@angular-react/fabric/lib/components/group';
import { FabMarqueeSelectionModule } from '@angular-react/fabric/lib/components/marquee-selection';
import { FabSpinButtonModule } from '@angular-react/fabric/lib/components/spin-button';
import { FabTextFieldModule } from '@angular-react/fabric/lib/components/text-field';
import { FabPeoplePickerModule, FabTagPickerModule } from '@angular-react/fabric/lib/components/pickers';
import { FabProgressIndicatorModule } from '@angular-react/fabric/lib/components/progress-indicator';
import { FabRatingModule } from '@angular-react/fabric/lib/components/rating';

@NgModule({
  imports: [
    AngularReactBrowserModule,
    NxModule.forRoot(),
    FabFabricModule,
    FabIconModule,
    FabButtonModule,
    FabDialogModule,
    FabImageModule,
    FabDropdownModule,
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
    FabCalendarModule,
    FabDetailsListModule,
    FabGroupModule,
    FabMarqueeSelectionModule,
    FabSpinButtonModule,
    FabTextFieldModule,
    FabPeoplePickerModule,
    FabTagPickerModule,
    FabProgressIndicatorModule,
    FabRatingModule
  ],
  declarations: [AppComponent, CounterComponent],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    initializeIcons();
  }
}
