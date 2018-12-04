interface IEventListener<K extends keyof ElementEventMap> {
  type: K;
  listener: (ev: ElementEventMap[K]) => void;
  options?: boolean | EventListenerOptions;
}

type IEventListenerArray<K extends keyof ElementEventMap> = IEventListener<K>[];

type IEventListenersMap<K extends keyof ElementEventMap> = Record<K, IEventListenerArray<K>>;

interface Element {
  /**
   * Gets all the event listeners of the element.
   */
  getEventListeners<K extends keyof ElementEventMap>(): IEventListenersMap<K>;

  /**
   * Gets all the event listeners of a type of the element.
   */
  getEventListeners<K extends keyof ElementEventMap>(type?: K): IEventListenerArray<K>;
}
