// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

export const afterRenderFinished = (callback: Function) => {
  setTimeout(callback, 0);
};
