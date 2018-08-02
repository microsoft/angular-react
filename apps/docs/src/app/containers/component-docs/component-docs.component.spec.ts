import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentDocsComponent } from './component-docs.component';

describe('ComponentDocsComponent', () => {
  let component: ComponentDocsComponent;
  let fixture: ComponentFixture<ComponentDocsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ComponentDocsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
