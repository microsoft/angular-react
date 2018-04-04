import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Type } from '@angular/core';
import { ElementSchemaRegistry } from '@angular/compiler';
import { FabricElementSchemaRegistry } from './schema';

export function bootstrapAngularReactWithSchea(
  module: Type<{}>,
  customPlatformProviders?: Array<any>,
  customBootstrapProviders?: Array<any>
) {
  return platformBrowserDynamic(customPlatformProviders || []).bootstrapModule(
    module,
    {
      providers: [
        {
          provide: ElementSchemaRegistry,
          useClass: FabricElementSchemaRegistry
        }
      ].concat(customBootstrapProviders || [])
    }
  );
}
