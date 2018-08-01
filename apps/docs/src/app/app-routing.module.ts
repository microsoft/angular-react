import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  AngularPerfComponent,
  ComponentDocsComponent,
  DocsComponent,
  FabricComponent,
  GettingStartedComponent,
  LandingComponent,
  MixedPerfComponent,
  PerformanceComponent,
  ProfilesComponent,
  SemanticUiComponent,
  WrappersComponent,
} from './containers';

const routes: Routes = [
  { path: 'landing', redirectTo: '' },
  { path: '', component: LandingComponent },
  {
    path: 'performance',
    component: PerformanceComponent,
    children: [
      { path: '', redirectTo: 'angular', pathMatch: 'full' },
      { path: 'angular', component: AngularPerfComponent },
      { path: 'mixed', component: MixedPerfComponent },
      { path: 'profiles', component: ProfilesComponent },
    ],
  },
  {
    path: 'components',
    component: ComponentDocsComponent,
    children: [
      { path: '', redirectTo: 'fabric', pathMatch: 'full' },
      { path: 'fabric', component: FabricComponent },
      { path: 'semantic-ui', component: SemanticUiComponent },
    ],
  },
  {
    path: 'docs',
    component: DocsComponent,
    children: [
      { path: '', redirectTo: 'getting-started', pathMatch: 'full' },
      { path: 'getting-started', component: GettingStartedComponent },
      { path: 'wrappers', component: WrappersComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
