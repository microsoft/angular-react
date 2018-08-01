import { Component, AfterViewInit, ViewChild, ElementRef, ViewContainerRef, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { throttleTime } from 'rxjs/operators';
import { SubNavService } from '../../shared/sub-nav.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, AfterViewInit {
  @ViewChild('primary', { read: ElementRef })
  primaryNav: ElementRef;
  @ViewChild('container', { read: ViewContainerRef })
  container: ViewContainerRef;

  collapseSecondaryNav = false;

  constructor(private subNavService: SubNavService) {}

  ngOnInit() {
    this.subNavService.vcr = this.container;
  }

  ngAfterViewInit() {
    fromEvent(window, 'scroll')
      // .pipe(throttleTime(1))
      .subscribe(e => {
        this.collapseSecondaryNav = window.pageYOffset > this.primaryNav.nativeElement.offsetHeight / 4;
      });
  }
}
