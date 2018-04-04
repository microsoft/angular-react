import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Type, CompilerOptions } from '@angular/core';
import { ElementSchemaRegistry } from '@angular/compiler';

import { ExtendedElementSchemaRegistry } from './schema';


export function bootstrapAngularReactWithSchema(
  module: Type<{}>,
  customPlatformProviders?: Array<any>,
  customBootstrapProviders?: Array<any>
) {
  return platformBrowserDynamic(customPlatformProviders || []).bootstrapModule(
    module, {
      providers: [
        { provide: ElementSchemaRegistry, useClass: ExtendedElementSchemaRegistry }
      ].concat(customBootstrapProviders || [])
    } as CompilerOptions);
}
