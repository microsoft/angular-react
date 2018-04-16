import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatTabsModule,
  MatToolbarModule,
  MatMenuModule,
  MatSlideToggleModule,
  MatSliderModule,
  MatButtonToggleModule,
} from '@angular/material';

const componentModules = [
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatTabsModule,
  MatToolbarModule,
  MatMenuModule,
  MatSlideToggleModule,
  MatSliderModule,
  MatButtonToggleModule,
]
@NgModule({
  imports: componentModules,
  exports: componentModules,
})
export class MaterialModule { }
