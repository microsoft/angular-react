import { NgModule } from '@angular/core';
import { FabButtonModule, FabDialogModule } from '@angular-react/fabric';

const componentModules = [FabButtonModule, FabDialogModule];
@NgModule({
  imports: componentModules,
  exports: componentModules,
})
export class FabricModule {}
