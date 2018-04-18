import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../../material.module';
import { ReactComponentsModule } from '../../react-components';
import { SharedModule } from '../../shared';
import { ComponentsModule } from '../../components';

import { DocsComponent } from './docs.component';
import { FabricModule } from '../../fabric.module';
import { GettingStartedComponent } from './getting-started/getting-started.component';
import { WrappersComponent } from './wrappers/wrappers.component';


const components = [
  DocsComponent,
  GettingStartedComponent,
  WrappersComponent,
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    FabricModule,
    ComponentsModule,
    MaterialModule,
    ReactComponentsModule,
    SharedModule,
  ],
  declarations: components,
  exports: components,
})
export class DocsModule { }

export {
  DocsComponent,
  GettingStartedComponent,
  WrappersComponent,
}
