import { NgModule } from '@angular/core';
import { SemButtonModule } from '@angular-react/semantic-ui';

const componentModules = [SemButtonModule];
@NgModule({
  imports: componentModules,
  exports: componentModules,
})
export class SemanticModule {}
