import { DomElementSchemaRegistry } from '@angular/compiler';
import { SchemaMetadata } from '@angular/core';

const EXTENDED_ELEMENT_SCHEMA = ['DefaultButton', 'Dialog', 'DialogFooter'];

const EXTENDED_PROPERTIES_SCHEMA = {
  DefaultButton: {
    text: 'string',
    disabled: 'boolean',
    primary: 'boolean'
  }
};

export class ExtendedElementSchemaRegistry extends DomElementSchemaRegistry {
  constructor() {
    super();
  }

  hasElement(tagName: string, schemaMetas: SchemaMetadata[]): boolean {
    return (
      EXTENDED_ELEMENT_SCHEMA.indexOf(tagName) > -1 ||
      super.hasElement(tagName, schemaMetas)
    );
  }

  hasProperty(
    tagName: string,
    propName: string,
    schemaMetas: SchemaMetadata[]
  ): boolean {
    const elementProperties = EXTENDED_PROPERTIES_SCHEMA[tagName];
    return (
      (elementProperties && elementProperties[propName]) ||
      super.hasProperty(tagName, propName, schemaMetas)
    );
  }
}
