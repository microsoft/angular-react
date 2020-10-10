
import { registerElement } from '@angular-react/core';
import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Rating } from 'office-ui-fabric-react/lib/Rating';
import { FabRatingComponent } from './rating.component';

const components = [FabRatingComponent];

@NgModule({
  imports: [CommonModule],
  declarations: components,
  exports: components,
  schemas: [NO_ERRORS_SCHEMA],
})
export class FabRatingModule {
  constructor() {
    registerElement('Rating', () => Rating);
  }
}