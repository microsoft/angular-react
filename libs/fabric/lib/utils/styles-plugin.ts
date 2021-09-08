import { OnInit } from "@angular/core";
import { IStyleFunctionOrObject } from "@fluentui/react";

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
    class Wrapper extends constructor implements OnInit {
      styles: IStyleFunctionOrObject<any, any>;
      ngOnInit() {
        const handler = proxyHandlerMap.get(constructor.name);
        if (handler && handler.beforeNgInit) {
          handler.beforeNgInit.apply(this);
        }
        if (super.ngOnInit) {
          super.ngOnInit();
        }
      }
    }
    return Wrapper as any;
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
