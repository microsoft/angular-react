import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  AngularPerfComponent,
  ComponentDocsComponent,
  DocsComponent,
  FabricComponent,
  LandingComponent,
  SemanticUiComponent,
  MixedPerfComponent,
  PerformanceComponent,
  ProfilesComponent,
} from './containers';


const routes: Routes = [
    { path: 'landing', redirectTo: '' },
    { path: '', component: LandingComponent },
    { path: 'performance', component: PerformanceComponent, children: [
      { path: '', redirectTo: 'angular', pathMatch: 'full' },
      { path: 'angular', component: AngularPerfComponent },
      { path: 'mixed', component: MixedPerfComponent },
      { path: 'profiles', component: ProfilesComponent },
    ] },
    { path: 'components', component: ComponentDocsComponent, children: [
      { path: '', redirectTo: 'fabric', pathMatch: 'full' },
      { path: 'fabric', component: FabricComponent },
      { path: 'semantic-ui', component: SemanticUiComponent },
    ] },
    { path: 'docs', component: DocsComponent },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
})
export class AppRoutingModule {}
