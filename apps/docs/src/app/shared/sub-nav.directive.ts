import { Directive, ViewRef, TemplateRef, OnDestroy, OnInit } from '@angular/core';

import { SubNavService } from './sub-nav.service';


@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[subnav]'
})
export class SubNavDirective implements OnInit, OnDestroy {

  private _viewRef : ViewRef;

  constructor( private subNavService: SubNavService,
               public tpl: TemplateRef<any> ) {
  }

  ngOnInit() {
    this._viewRef = this.subNavService.vcr.createEmbeddedView(this.tpl);
  }

  ngOnDestroy() {
    this._viewRef.destroy();
  }

}
