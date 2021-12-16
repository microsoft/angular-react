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
    const ngOnInit = constructor.prototype.ngOnInit
    constructor.prototype.ngOnInit = function () {
      const handler = proxyHandlerMap.get(componentName);
      if (handler && handler.beforeNgInit) {
        handler.beforeNgInit.apply(this);
      }
      if (ngOnInit) {
        ngOnInit.apply(this);
      }
    }

    const ngOnChanges = constructor.prototype.ngOnChanges
    constructor.prototype.ngOnChanges = function (changes: TypedChanges<T>) {
      const handler = proxyHandlerMap.get(componentName);
      if (handler && handler.beforeNgChanges) {
        handler.beforeNgChanges.apply(this, [changes]);
      }
      if (ngOnChanges) {
        ngOnChanges.apply(this, [changes]);
      }
    }

    const ngOnDestroy = constructor.prototype.ngOnDestroy
    constructor.prototype.ngOnDestroy = function () {
      const handler = proxyHandlerMap.get(componentName);
      if (handler && handler.beforeNgDestroy) {
        handler.beforeNgDestroy.apply(this);
      }
      if (ngOnDestroy) {
        ngOnDestroy.ngOnDestroy.apply(this);
      }
    }

    const ngDoCheck = constructor.prototype.ngDoCheck
    constructor.prototype.ngDoCheck = function () {
      const handler = proxyHandlerMap.get(componentName);
      if (handler && handler.beforeNgDoCheck) {
        handler.beforeNgDoCheck.apply(this);
      }
      if (ngDoCheck) {
        ngDoCheck.apply(this);
      }
    }

    const ngAfterContentInit = constructor.prototype.ngAfterContentInit
    constructor.prototype.ngAfterContentInit = function () {
      const handler = proxyHandlerMap.get(componentName);
      if (handler && handler.beforeNgAfterContentInit) {
        handler.beforeNgAfterContentInit.apply(this);
      }
      if (ngAfterContentInit) {
        ngAfterContentInit.apply(this);
      }
    }

    const ngAfterContentChecked = constructor.prototype.ngAfterContentChecked
    constructor.prototype.ngAfterContentChecked = function () {
      const handler = proxyHandlerMap.get(componentName);
      if (handler && handler.beforeNgAfterContentChecked) {
        handler.beforeNgAfterContentChecked.apply(this);
      }
      if (ngAfterContentChecked) {
        ngAfterContentChecked.apply(this);
      }
    }

    const ngAfterViewInit = constructor.prototype.ngAfterViewInit
    constructor.prototype.ngAfterViewInit = function () {
      const handler = proxyHandlerMap.get(componentName);
      if (handler && handler.beforeNgAfterViewInit) {
        handler.beforeNgAfterViewInit.apply(this);
      }
      if (ngAfterViewInit) {
        ngAfterViewInit.apply(this);
      }
    }

    const ngAfterViewChecked = constructor.prototype.ngAfterViewChecked
    constructor.prototype.ngAfterViewChecked = function () {
      const handler = proxyHandlerMap.get(componentName);
      if (handler && handler.beforeNgAfterViewChecked) {
        handler.beforeNgAfterViewChecked.apply(this);
      }
      if (ngAfterViewChecked) {
        ngAfterViewChecked.apply(this);
      }
    }

    return constructor as any;
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
