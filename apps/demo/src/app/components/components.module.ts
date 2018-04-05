import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DotComponent } from './dot/dot.component';
import { ReactComponentsModule } from '../react-components/react-components.module';
import { TriangleComponent } from './triangle/triangle.component';
import { AngularReactFabricModule } from '@angular-react/fabric';



const components = [
  DotComponent,
  TriangleComponent,
];

@NgModule({
  imports: [CommonModule, AngularReactFabricModule, ReactComponentsModule],
  declarations: components,
  exports: components,
})
export class ComponentsModule { }
