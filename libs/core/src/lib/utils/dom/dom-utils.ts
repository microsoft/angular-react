/**
 * Checks if a node is in the DOM.
 *
 * @param node The node to check
 * @returns whether the node is in the DOM
 */
export const isNodeInDOM = (node: Node) => node.isConnected || document.body.contains(node);
