import { NgModule } from '@angular/core';
import { 
  FabButtonModule,
  FabDialogModule,
  FabComboBoxModule, 
  FabCalendarModule
} from '@angular-react/fabric';

const componentModules = [
  FabButtonModule,
  FabDialogModule,
  FabComboBoxModule,
  FabCalendarModule
];
@NgModule({
  imports: componentModules,
  exports: componentModules,
})
export class FabricModule {}
