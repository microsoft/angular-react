// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

/**
 * Delays the execution of a function to be after the next render.
 *
 * @param callback The function to execute
 */
export const afterRenderFinished = (callback: Function) => {
  setTimeout(callback, 0);
};
