// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { IndexSignature } from './index-signature';
import { KnownKeys } from './known-keys';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<KnownKeys<T> & keyof T, K>> & IndexSignature<T>;
