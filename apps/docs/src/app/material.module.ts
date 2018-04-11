import { MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule } from '@angular/material';
import { NgModule } from '@angular/core';

const componentModules = [
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatIconModule,
]
@NgModule({
  imports: componentModules,
  exports: componentModules,
})
export class MaterialModule { }
