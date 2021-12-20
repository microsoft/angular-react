const proxyHandlerMap = new Map<string, {
  beforeNgInit: () => void
}>()

interface IConstructor {
  new (...args: any[]): {
    ngOnInit(): void
  }
}
export function Styled<T extends IConstructor>() {
  return function (constructor: any) {
    const ngOnInit = constructor.prototype.ngOnInit;
    constructor.prototype.ngOnInit = function () {
      const handler = proxyHandlerMap.get(constructor.name);
      if (handler && handler.beforeNgInit) {
        handler.beforeNgInit.apply(this);
      }
      if (ngOnInit) {
        ngOnInit.apply(this);
      }
    }
    return constructor as any;
  }
}

export function proxyStyles<T>(
  fabComponentName: string,
  handlers: {
    beforeNgInit: (this: T) => void
  }
) {
	proxyHandlerMap.set(fabComponentName, handlers);
}
