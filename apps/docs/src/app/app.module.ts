import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NxModule } from '@nrwl/nx';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularReactBrowserModule } from '@angular-react/core';

import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FabricModule } from './fabric.module';
import { SemanticModule } from './semantic.module';
import { SharedModule } from './shared/shared.module';
import { ReactComponentsModule } from './react-components/react-components.module';
import { ComponentsModule } from './components/components.module';
import { ComponentDocsModule } from './containers/component-docs/component-docs.module';
import { DocsModule } from './containers/docs/docs.module';
import { PerformanceModule } from './containers/performance/performance.module';
import { LandingComponent } from './containers/landing/landing.component';

@NgModule({
  imports: [
    AngularReactBrowserModule,
    NxModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FabricModule,
    SemanticModule,

    SharedModule,
    ReactComponentsModule,
    ComponentsModule,
    ComponentDocsModule,
    DocsModule,
    PerformanceModule,
  ],
  declarations: [AppComponent, LandingComponent],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
