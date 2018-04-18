import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WrappersComponent } from './wrappers.component';

describe('WrappersComponent', () => {
  let component: WrappersComponent;
  let fixture: ComponentFixture<WrappersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WrappersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrappersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
