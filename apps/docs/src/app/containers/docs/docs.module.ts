import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../../material.module';

import { DocsComponent } from './docs.component';
import { FabricModule } from '../../fabric.module';
import { GettingStartedComponent } from './getting-started/getting-started.component';
import { WrappersComponent } from './wrappers/wrappers.component';
import { ComponentsModule } from '../../components/components.module';
import { ReactComponentsModule } from '../../react-components/react-components.module';
import { SharedModule } from '../../shared/shared.module';

const components = [DocsComponent, GettingStartedComponent, WrappersComponent];

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
export class DocsModule {}

export { DocsComponent, GettingStartedComponent, WrappersComponent };
