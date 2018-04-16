import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SemanticUiComponent } from './semantic-ui.component';

describe('SemanticUiComponent', () => {
  let component: SemanticUiComponent;
  let fixture: ComponentFixture<SemanticUiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SemanticUiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SemanticUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
