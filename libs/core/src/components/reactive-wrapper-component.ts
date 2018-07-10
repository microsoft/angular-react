import { ElementRef, OnDestroy } from "@angular/core";
import { IObjectDidChange, Lambda, isObservableObject, IObservableValue, isObservable, observe } from "mobx";

import { ReactWrapperComponent } from './wrapper-component';
import { isReactNode } from "../renderer/react-node";

export abstract class ReactiveReactWrapperComponent<TProps extends {}> extends ReactWrapperComponent<TProps> implements OnDestroy {

  private readonly _disposables: Lambda[] = [];

  ngOnDestroy() {
    this._disposables.forEach(dispose => dispose());
  }

  protected detectChanges(changes: IObjectDidChange) {
    if (isReactNode(this.reactNodeRef.nativeElement)) {
      this.reactNodeRef.nativeElement.setRenderPending();
    }
  }

  /**
   * Helper method to observe an object
   * The dispose function will be automatically called on `ngOnDestroy()`, but you can call it beforehand.
   * @returns `null` if the item is not observable, a `Lambda` if it was observed.
   */
  protected observe<T>(item: T): null | Lambda {
    if (!isObservable(item)) {
      return null;
    }

    const dispose = observe(item, changes => this.detectChanges(changes));
    this._disposables.push(dispose);
    return dispose;
  }

}
