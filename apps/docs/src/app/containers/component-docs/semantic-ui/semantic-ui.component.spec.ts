import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularReactBrowserModule } from '@angular-react/core';

import { SemanticUiComponent } from './semantic-ui.component';
import { SemanticModule } from '../../../semantic.module';
import { SemButtonModule } from '@angular-react/semantic-ui';

describe('SemanticUiComponent', () => {
  let component: SemanticUiComponent;
  let fixture: ComponentFixture<SemanticUiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AngularReactBrowserModule, SemButtonModule],
      declarations: [SemanticUiComponent],
    }).compileComponents();
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
