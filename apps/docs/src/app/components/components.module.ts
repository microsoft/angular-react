import { RouterModule } from '@angular/router';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularReactFabricModule } from '@angular-react/fabric';

import { DotComponent } from './dot/dot.component';
import { ReactComponentsModule } from '../react-components/react-components.module';
import { TriangleComponent } from './triangle/triangle.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MaterialModule } from '../material.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { IconsComponent } from './icons/icons.component';


const components = [
  DotComponent,
  TriangleComponent,
  NavbarComponent,
  SidebarComponent,
  IconsComponent,
];

@NgModule({
  imports: [CommonModule, RouterModule, AngularReactFabricModule, ReactComponentsModule, MaterialModule],
  declarations: components,
  exports: components,
})
export class ComponentsModule { }
