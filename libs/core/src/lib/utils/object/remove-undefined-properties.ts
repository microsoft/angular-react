// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

/**
 * Remove all undefined properties from obj.
 *
 * Does **not** modify the original object.
 * @returns A clone of `obj`, with all `undefined` properties removed
 */
const removeUndefinedProperties = <T extends object>(obj: T): Partial<T> => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value === undefined) return acc;
    return Object.assign(acc, { [key]: value });
  }, {});
};

export default removeUndefinedProperties;
