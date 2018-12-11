/**
 * Monkey-patches `Element`'s `addEventListener` & `removeEventListener` and adds `getEventListeners`.
 * This later allows the renderer to emit any event handlers attached to React-wrapped components as Angular Outputs:
 * ```html
 * <my-component (arbitraryEvent)="onEventHandler($event)"></my-component>
 * ```
 *
 * @note Taken and modified from https://github.com/colxi/getEventListeners to be compiled into ES5, allowing running in older browsers
 **/

Element.prototype['_addEventListener'] = Element.prototype.addEventListener;
Element.prototype['_removeEventListener'] = Element.prototype.removeEventListener;

Element.prototype.addEventListener = function<K extends keyof ElementEventMap>(
  type: K,
  listener: (this: Element, ev: ElementEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions
): void {
  if (options === undefined) options = false;

  // declare listener
  this._addEventListener(type, listener, options);

  if (!this.eventListenerList) this.eventListenerList = {};
  if (!this.eventListenerList[type]) this.eventListenerList[type] = [];

  // add listener to  event tracking list
  this.eventListenerList[type].push({
    type: type,
    listener: listener,
    useCapture: options,
  });
};

Element.prototype.removeEventListener = function<K extends keyof ElementEventMap>(
  type: K,
  listener: (this: Element, ev: ElementEventMap[K]) => any,
  options?: boolean | EventListenerOptions
): void {
  if (options === undefined) options = false;

  // remove listener
  this._removeEventListener(type, listener, options);

  if (!this.eventListenerList) this.eventListenerList = {};
  if (!this.eventListenerList[type]) this.eventListenerList[type] = [];

  // Find the event in the list, If a listener is registered twice, one
  // with capture and one without, remove each one separately. Removal of
  // a capturing listener does not affect a non-capturing version of the
  // same listener, and vice versa.
  for (let i = 0; i < this.eventListenerList[type].length; i++) {
    if (
      this.eventListenerList[type][i].listener === listener &&
      this.eventListenerList[type][i].useCapture === options
    ) {
      this.eventListenerList[type].splice(i, 1);
      break;
    }
  }
  // if no more events of the removed event type are left,remove the group
  if (this.eventListenerList[type].length == 0) delete this.eventListenerList[type];
};

Element.prototype.getEventListeners = function<K extends keyof ElementEventMap>(type?: K) {
  if (!this.eventListenerList) this.eventListenerList = {};

  // return requested listeners type or all them
  if (type === undefined) return this.eventListenerList;
  return this.eventListenerList[type];
};

/*
    Element.prototype.clearEventListeners = function(a){
        if(!this.eventListenerList)
            this.eventListenerList = {};
        if(a==undefined){
            for(var x in (this.getEventListeners())) this.clearEventListeners(x);
            return;
        }
        var el = this.getEventListeners(a);
        if(el==undefined)
            return;
        for(var i = el.length - 1; i >= 0; --i) {
            var ev = el[i];
            this.removeEventListener(a, ev.listener, ev.useCapture);
        }
    };
    */
