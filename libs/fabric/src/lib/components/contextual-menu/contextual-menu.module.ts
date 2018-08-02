import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ContextualMenuItemDirective } from './directives/contextual-menu-item.directive';

const components = [ContextualMenuItemDirective];

@NgModule({
  imports: [CommonModule],
  declarations: components,
  exports: components,
  schemas: [NO_ERRORS_SCHEMA],
})
export class FabContextualMenuModule {}
