import { Type, ɵNG_COMP_DEF, ɵComponentDef } from '@angular/core'
import { AngularReactMetadata } from '../declarations/interfaces';
import { setAngularReactMetadata } from '../utils/angular-react/metadata';

export function AngularReact(metadata?: AngularReactMetadata) {
  return <T>(componentType: Type<T>) => {
    Promise.resolve().then(() => {
      const componentDef: ɵComponentDef<T> = componentType[ɵNG_COMP_DEF];

      if (componentDef === undefined) {
        throw new Error('Ivy is not enabled.');
      }

      setAngularReactMetadata(componentDef, metadata ?? {});
    });

    return componentType as any;
  }
}
