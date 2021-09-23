import { OnInit, OnChanges, OnDestroy, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, DoCheck } from "@angular/core";
import { IStyleFunctionOrObject } from "@fluentui/react";
import { TypedChanges } from '@angular-react/fabric/lib/declarations';

const proxyHandlerMap = new Map<string, {
  beforeNgInit?: () => void
  beforeNgChanges?: (changes: TypedChanges<any>) => void
  beforeNgDestroy?: () => void
  beforeNgDoCheck?: () => void
  beforeNgAfterContentInit?: () => void
  beforeNgAfterContentChecked?: () => void
  beforeNgAfterViewInit?: () => void
  beforeNgAfterViewChecked?: () => void
}>()

interface IConstructor {
  new (...args: any[]): {
    ngOnInit?(): void
    ngOnChanges?(changes: TypedChanges<any>): void
    ngOnDestroy?(): void
    ngDoCheck?(): void
    ngAfterContentInit?(): void
    ngAfterContentChecked?(): void
    ngAfterViewInit?(): void
    ngAfterViewChecked?(): void
  }
}
export function Styled<T extends IConstructor>(componentName: string) {
  return function (constructor: T) {
    class Wrapper extends constructor implements OnInit, OnChanges, OnDestroy, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, DoCheck {
      styles: IStyleFunctionOrObject<any, any>;
      ngOnInit() {
        const handler = proxyHandlerMap.get(componentName);
        if (handler && handler.beforeNgInit) {
          handler.beforeNgInit.apply(this);
        }
        if (super.ngOnInit) {
          super.ngOnInit();
        }
      }
      ngOnChanges(changes: TypedChanges<T>) {
        const handler = proxyHandlerMap.get(componentName);
        if (handler && handler.beforeNgChanges) {
          handler.beforeNgChanges.apply(this, [changes]);
        }
        if (super.ngOnChanges) {
          super.ngOnChanges(changes);
        }
      }
      ngOnDestroy() {
        const handler = proxyHandlerMap.get(componentName);
        if (handler && handler.beforeNgDestroy) {
          handler.beforeNgDestroy.apply(this);
        }
        if (super.ngOnDestroy) {
          super.ngOnDestroy();
        }
      }
      ngDoCheck() {
        const handler = proxyHandlerMap.get(componentName);
        if (handler && handler.beforeNgDoCheck) {
          handler.beforeNgDoCheck.apply(this);
        }
        if (super.ngDoCheck) {
          super.ngDoCheck();
        }
      }
      ngAfterContentInit() {
        const handler = proxyHandlerMap.get(componentName);
        if (handler && handler.beforeNgAfterContentInit) {
          handler.beforeNgAfterContentInit.apply(this);
        }
        if (super.ngAfterContentInit) {
          super.ngAfterContentInit();
        }
      }
      ngAfterContentChecked() {
        const handler = proxyHandlerMap.get(componentName);
        if (handler && handler.beforeNgAfterContentChecked) {
          handler.beforeNgAfterContentChecked.apply(this);
        }
        if (super.ngAfterContentChecked) {
          super.ngAfterContentChecked();
        }
      }
      ngAfterViewInit() {
        const handler = proxyHandlerMap.get(componentName);
        if (handler && handler.beforeNgAfterViewInit) {
          handler.beforeNgAfterViewInit.apply(this);
        }
        if (super.ngAfterViewInit) {
          super.ngAfterViewInit();
        }
      }
      ngAfterViewChecked() {
        const handler = proxyHandlerMap.get(componentName);
        if (handler && handler.beforeNgAfterViewChecked) {
          handler.beforeNgAfterViewChecked.apply(this);
        }
        if (super.ngAfterViewChecked) {
          super.ngAfterViewChecked();
        }
      }
    }
    return Wrapper as any;
  }
}

export function proxy<T>(
  fabComponentName: string,
  handlers: {
    beforeNgInit?: (this: T) => void
    beforeNgChanges?: (this: T, changes: TypedChanges<T>) => void
    beforeNgDestroy?: (this: T) => void
    beforeNgDoCheck?: (this: T) => void
    beforeNgAfterContentInit?: (this: T) => void
    beforeNgAfterContentChecked?: (this: T) => void
    beforeNgAfterViewInit?: (this: T) => void
    beforeNgAfterViewChecked?: (this: T) => void
  }
) {
	proxyHandlerMap.set(fabComponentName, handlers);
}
