import { SubNavDirective } from './sub-nav.directive';
import { TestBed } from '@angular/core/testing';
import { SubNavService } from './sub-nav.service';

import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'test-component',
  template: `
    <div *subnav></div>
  `,
})
class TestComponent {}

describe('SubNavDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      providers: [SubNavService],
    });
  });

  it('should create an instance', () => {
    const testComponent = TestBed.createComponent(TestComponent);
    expect(testComponent.componentInstance).toBeTruthy();
  });
});
