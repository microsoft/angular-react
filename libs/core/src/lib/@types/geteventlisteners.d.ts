interface EventListener {
  type: keyof ElementEventMap;
  listener: (ev: ElementEventMap[keyof ElementEventMap]) => void;
  options?: boolean | EventListenerOptions;
}

type EventListenerArray<K extends keyof ElementEventMap> = EventListener[];

type EventListenersMap<K extends keyof ElementEventMap> = Record<K, EventListenerArray<K>>;

// declare global {
interface Element {
  /**
   * Gets all the event listeners of the element.
   */
  getEventListeners<K extends keyof ElementEventMap>(): EventListenersMap<K>;

  /**
   * Gets all the event listeners of a type of the element.
   */
  getEventListeners<K extends keyof ElementEventMap>(type?: K): EventListenerArray<K>;
}
// }
