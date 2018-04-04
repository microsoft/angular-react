import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FabricButtonComponent } from './fabric-button.component';
import { FabricDialogComponent, FabricDialogFooterComponent } from './fabric-dialog.component';

const components = [
  FabricButtonComponent,
  FabricDialogComponent,
  FabricDialogFooterComponent,
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: components,
  exports: components,
  schemas: [NO_ERRORS_SCHEMA]
})
export class ReactComponentsModule { }
