/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ReactDotComponent } from './react-dot.component';

describe('ReactDotComponent', () => {
  let component: ReactDotComponent;
  let fixture: ComponentFixture<ReactDotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReactDotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactDotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
