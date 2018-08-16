// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
