import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularReactBrowserModule } from '@angular-react/core';

import { ReactDotComponent } from './react-dot.component';
import { ReactComponentsModule } from '../react-components.module';

describe('ReactDotComponent', () => {
  let component: ReactDotComponent;
  let fixture: ComponentFixture<ReactDotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AngularReactBrowserModule, ReactComponentsModule],
    }).compileComponents();
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
