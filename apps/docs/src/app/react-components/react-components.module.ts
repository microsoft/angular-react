import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { registerElement } from '@angular-react/core';
import { ReactDotComponent, ReactDot } from './react-dot/react-dot.component';


const components = [
  ReactDotComponent,
];

@NgModule({
  imports: [CommonModule],
  declarations: components,
  exports: components,
  schemas: [NO_ERRORS_SCHEMA]
})
export class ReactComponentsModule {

  constructor() {
    // Add any React elements to the registry (used by the renderer).
    registerElement('ReactDot', () => ReactDot);
  }

}
