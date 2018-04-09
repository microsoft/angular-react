import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularReactFabricModule } from '@angular-react/fabric';

import { AngularPerfComponent } from './angular-perf/angular-perf.component';
import { MixedPerfComponent } from './mixed-perf/mixed-perf.component';
import { FabricComponent } from './fabric/fabric.component';
import { MaterialComponent } from './material/material.component';
import { LandingComponent } from './landing/landing.component';
import { ComponentsModule } from '../components/components.module';
import { ReactComponentsModule } from '../react-components/react-components.module';


@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    AngularReactFabricModule,
    ReactComponentsModule,
  ],
  declarations: [AngularPerfComponent, MixedPerfComponent, FabricComponent, MaterialComponent, LandingComponent]
})
export class ContainersModule { }
