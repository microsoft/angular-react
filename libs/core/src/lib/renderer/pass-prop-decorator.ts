// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

export const passPropsSymbol = Symbol('passProps');

export interface PassProp {
  sourceKey: PropertyKey;
  targetKey: PropertyKey;
}

function passPropImpl(target: Object, propertyKey: PropertyKey, targetKey: PropertyKey) {
  if (!target[passPropsSymbol]) {
    target[passPropsSymbol] = [];
  }

  (target[passPropsSymbol] as PassProp[]).push({
    sourceKey: propertyKey,
    targetKey: targetKey,
  });
}

const passPropRename: (propName: string) => PropertyDecorator = propName => (target, propertyKey) =>
  passPropImpl(target, propertyKey, propName);

const passPropDirect: PropertyDecorator = (target, propertyKey) => passPropImpl(target, propertyKey, propertyKey);

/**
 * Decorator to specify a property that should be passed as a prop to the underlying React component implicitly.
 * Mainly useful for passing child components using the `Disguise` component.
 */
export function passProp(): PropertyDecorator;
export function passProp(propName: string): PropertyDecorator;
export function passProp(...args: any[]) {
  if (args.length === 0) {
    return passPropDirect;
  }

  if (args.length === 1) {
    return passPropRename(args[0]);
  }

  throw new Error('[passProp] Only 0 or 1 arguments accepted.');
}

export function getPassProps<T extends object>(obj: T): PassProp[] {
  return obj[passPropsSymbol];
}
