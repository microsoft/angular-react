// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { IndexSignature } from './index-signature';
import { KnownKeys } from './known-keys';
import { UnknownKeys } from './unknown-keys';

export type _KnownKeysOmit<T, K extends keyof T> = Pick<T, Exclude<KnownKeys<T> & keyof T, K>>;
export type Omit<T, K extends keyof T> = UnknownKeys<T> extends never
  ? _KnownKeysOmit<T, K>
  : _KnownKeysOmit<T, K> & IndexSignature<T>;
