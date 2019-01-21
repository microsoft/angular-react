import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DotComponent } from './dot/dot.component';
import { TriangleComponent } from './triangle/triangle.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MaterialModule } from '../material.module';
import { IconsComponent } from './icons/icons.component';
import { SubNavComponent } from './sub-nav/sub-nav.component';
import { FabricModule } from '../fabric.module';
import { PageHeaderComponent } from './page-header/page-header.component';
import { ReactComponentsModule } from '../react-components/react-components.module';
import { SharedModule } from '../shared/shared.module';

const components = [
  DotComponent,
  IconsComponent,
  NavbarComponent,
  PageHeaderComponent,
  SubNavComponent,
  TriangleComponent,
];

@NgModule({
  imports: [CommonModule, RouterModule, FabricModule, ReactComponentsModule, MaterialModule, SharedModule],
  declarations: components,
  exports: components,
})
export class ComponentsModule {}

export { DotComponent, IconsComponent, NavbarComponent, PageHeaderComponent, SubNavComponent, TriangleComponent };
