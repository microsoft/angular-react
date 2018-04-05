import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MixedPerfComponent } from './mixed-perf.component';

describe('MixedPerfComponent', () => {
  let component: MixedPerfComponent;
  let fixture: ComponentFixture<MixedPerfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MixedPerfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MixedPerfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
