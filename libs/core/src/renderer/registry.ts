import * as React from 'react';
import { Disguise } from "./components/Disguise";
import { ReactContent } from "./react-content";

export type ComponentResolver = () => React.ReactType;

const elementMap = new Map<string, { resolver: ComponentResolver }>();
const camelCaseSplit = /([a-z0-9])([A-Z])/g;

export function registerElement(
  elementName: string,
  resolver: ComponentResolver
): void {
  if (elementMap.has(elementName)) {
    throw new Error(`Element for ${elementName} already registered.`);
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
