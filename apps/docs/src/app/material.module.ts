import { MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule, MatTabsModule } from '@angular/material';
import { NgModule } from '@angular/core';

const componentModules = [
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatIconModule,
  MatTabsModule,
]
@NgModule({
  imports: componentModules,
  exports: componentModules,
})
export class MaterialModule { }
