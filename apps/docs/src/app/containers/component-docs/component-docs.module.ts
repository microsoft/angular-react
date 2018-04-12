import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ReactComponentsModule } from '../../react-components';
import { SharedModule } from '../../shared';
import { ComponentsModule } from '../../components';

import { ComponentDocsComponent } from './component-docs.component';
import { FabricComponent } from './fabric/fabric.component';
import { MaterialComponent } from './material/material.component';
import { MaterialModule } from '../../material.module';
import { FabricModule } from '../../fabric.module';


const components = [
  ComponentDocsComponent,
  FabricComponent,
  MaterialComponent,
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    FabricModule,
    ReactComponentsModule,
    SharedModule,
    MaterialModule,
    ComponentsModule,
  ],
  declarations: components,
  exports: components,
})
export class ComponentDocsModule { }

export {
  ComponentDocsComponent,
  FabricComponent,
  MaterialComponent,
};
