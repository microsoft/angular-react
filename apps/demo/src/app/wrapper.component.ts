import { Component } from '@angular/core';

@Component({
  selector: 'wrapper',
  template: `<ng-content></ng-content>`,
  styles: ['react-renderer'],
})
export class WrapperComponent { }
