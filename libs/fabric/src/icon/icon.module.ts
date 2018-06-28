import { registerElement } from '@angular-react/core';
import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Icon } from 'office-ui-fabric-react/lib/components/Icon';
import { FabIconComponent } from './icon.component';

const components = [
  FabIconComponent,
];

@NgModule({
  imports: [CommonModule],
  declarations: components,
  exports: components,
  schemas: [NO_ERRORS_SCHEMA]
})
export class FabIconModule {

  constructor() {
    // Add any React elements to the registry (used by the renderer).
    registerElement('Icon', () => Icon);
  }

}
