interface EventListener<K extends keyof ElementEventMap> {
  type: K;
  listener: (ev: ElementEventMap[K]) => void;
  options?: boolean | EventListenerOptions;
}

type EventListenerArray<K extends keyof ElementEventMap> = EventListener<K>[];

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
