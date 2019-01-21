import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ComponentDocsComponent } from './component-docs.component';
import { FabricComponent } from './fabric/fabric.component';
import { SemanticUiComponent } from './semantic-ui/semantic-ui.component';
import { MaterialModule } from '../../material.module';
import { FabricModule } from '../../fabric.module';
import { SemanticModule } from '../../semantic.module';
import { ReactComponentsModule } from '../../react-components/react-components.module';
import { SharedModule } from '../../shared/shared.module';
import { ComponentsModule } from '../../components/components.module';

const components = [ComponentDocsComponent, FabricComponent, SemanticUiComponent];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    FabricModule,
    SemanticModule,
    ReactComponentsModule,
    SharedModule,
    MaterialModule,
    ComponentsModule,
  ],
  declarations: components,
  exports: components,
})
export class ComponentDocsModule {}

export { ComponentDocsComponent, FabricComponent, SemanticUiComponent };
