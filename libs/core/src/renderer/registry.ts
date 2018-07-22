import * as React from 'react';

import { Disguise } from "./components/Disguise";
import { ReactContent } from "./react-content";

export type ComponentResolver = () => React.ReactType;

const elementMap = new Map<string, { resolver: ComponentResolver }>();
const camelCaseSplit = /([a-z0-9])([A-Z])/g;

/**
 * Register an element to be renderer when the renderer sees the tag.
 * @param elementName the tag
 * @param resolver A resolver to the React component
 */
export function registerElement(
  elementName: string,
  resolver: ComponentResolver
): void {
  if (elementMap.has(elementName)) {
    // Ignore multiple register attempts for the same component.
    // Angular doesn't allow sharing whole NgModule instances (in this case, an @NgModule for React-wrapped components) with lazy-loaded @NgModules (in the app),
    // To keep the API simple, allow multiple calls to `registerElement`.
    // Disadvantage is that you can't replace (React) component implementations at runtime. This sounds far-fetched, but solvable with a `static forRoot()` pattern for every
    // React-wrapper components' @NgModule, ensuring that `registerElement` is only called once.
    return;
  } else {
    const entry = { resolver: resolver };
    elementMap.set(elementName, entry);
    elementMap.set(elementName.toLowerCase(), entry);
    elementMap.set(
      elementName.replace(camelCaseSplit, '$1-$2').toLowerCase(),
      entry
    );
  }
}

export function isKnownComponent(elementName: string): boolean {
  return (
    elementMap.has(elementName) || elementMap.has(elementName.toLowerCase())
  );
}

export function getComponentClass(
  elementName: string
): React.ReactType {
  const entry =
    elementMap.get(elementName) || elementMap.get(elementName.toLowerCase());
  if (!entry) {
    // throw new TypeError(`No known component for element ${elementName}.`);
    return elementName;
  }

  try {
    return entry.resolver();
  } catch (e) {
    throw new TypeError(`Could not load component for: ${elementName}.${e}`);
  }
}

registerElement('ReactContent', () => ReactContent);
registerElement('Disguise', () => Disguise);
