import { Component, AfterViewInit, ViewChild, ElementRef, ViewContainerRef, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { SubNavService } from '../../shared/sub-nav.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit, AfterViewInit {
  @ViewChild('primary', { read: ElementRef, static: true })
  primaryNav: ElementRef;
  @ViewChild('container', { read: ViewContainerRef, static: true })
  container: ViewContainerRef;

  collapseSecondaryNav = false;

  constructor(private subNavService: SubNavService) {}

  ngOnInit() {
    this.subNavService.vcr = this.container;
  }

  ngAfterViewInit() {
    fromEvent(window, 'scroll')
      .subscribe(e => {
        this.collapseSecondaryNav = window.pageYOffset > this.primaryNav.nativeElement.offsetHeight / 4;
      });
  }
}
