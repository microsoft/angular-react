import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubNavService } from './sub-nav.service';
import { SubNavDirective } from './sub-nav.directive';

const components = [SubNavDirective];

@NgModule({
  imports: [CommonModule],
  declarations: components,
  providers: [SubNavService],
  exports: components,
})
export class SharedModule {}

export { SubNavDirective, SubNavService };
