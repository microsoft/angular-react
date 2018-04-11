import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements AfterViewInit {

  @ViewChild('primary', { read: ElementRef }) primaryNav: ElementRef;

  collapseSecondaryNav = false;

  ngAfterViewInit() {
    fromEvent(window, 'scroll')
      // .pipe(throttleTime(1))
      .subscribe(e => {
        this.collapseSecondaryNav = window.pageYOffset >
          this.primaryNav.nativeElement.offsetHeight / 4;
      });
  }

}
