// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import removeUndefinedProperties from './remove-undefined-properties';

describe('object utils', () => {
  describe('remove undefined', () => {
    it('should remove only undefined properties', () => {
      const obj = {
        keep1: 'keep',
        keep2: null,
        keep3: [],
        keep4: false,
        remove: undefined,
      };

      expect(removeUndefinedProperties(obj)).toEqual({
        keep1: 'keep',
        keep2: null,
        keep3: [],
        keep4: false,
      });
    });
  });
});
