import { BaseComponent } from '@uifabric/utilities/lib';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Dialog } from 'office-ui-fabric-react/lib/Dialog';
import { DialogFooter } from 'office-ui-fabric-react/lib/components/Dialog';

export interface ReactComponentClass {
  new (): BaseComponent;
}
export type ComponentResolver = () => any; // ReactComponentClass;

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
): ReactComponentClass | string {
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

// Register default React Fabric components
registerElement('DefaultButton', () => DefaultButton);
registerElement('Dialog', () => Dialog);
registerElement('DialogFooter', () => DialogFooter);
