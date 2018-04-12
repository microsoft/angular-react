import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularPerfComponent } from './angular-perf.component';

describe('AngularPerfComponent', () => {
  let component: AngularPerfComponent;
  let fixture: ComponentFixture<AngularPerfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularPerfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularPerfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
