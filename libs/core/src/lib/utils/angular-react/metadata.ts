import { AngularReactMetadata } from '../../declarations/interfaces';
import { RendererType2 } from '@angular/core';

const KEY = 'angularReact';

export const setAngularReactMetadata = (
  componentDef: {
    data: {
      [kind: string]: any;
    };
  },
  metadata: AngularReactMetadata
): void => {
  if (componentDef.data) {
    componentDef.data[KEY] = metadata;
  } else {
    componentDef.data = {
      [KEY]: metadata
    }
  }
};

export const getAngularReactMetadata = (
  type: {
    data: {
      [kind: string]: any;
    };
  }
): AngularReactMetadata => {
  return type?.data?.[KEY] as AngularReactMetadata;
};

export const isAngularReactComponent = (type: RendererType2 | null): boolean => {
  return type?.data?.[KEY] != null;
};
