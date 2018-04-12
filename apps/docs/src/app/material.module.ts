import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatTabsModule,
  MatToolbarModule,
} from '@angular/material';

const componentModules = [
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatTabsModule,
  MatToolbarModule,
]
@NgModule({
  imports: componentModules,
  exports: componentModules,
})
export class MaterialModule { }
