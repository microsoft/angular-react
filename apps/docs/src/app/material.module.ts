import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { NgModule } from '@angular/core';

const components = [
  MatButtonModule,
  MatCheckboxModule,
]
@NgModule({
  imports: components,
  exports: components,
})
export class MaterialModule { }
