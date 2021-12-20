// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ngPackagr } = require('ng-packagr');
const path = require('path');

ngPackagr()
  .forProject(path.resolve(__dirname, 'package.json'))
  .withTsConfig(path.resolve(__dirname, 'tsconfig-custom.json'))
  .build();
