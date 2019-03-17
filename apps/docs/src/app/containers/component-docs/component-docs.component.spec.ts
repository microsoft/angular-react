import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MaterialModule } from '../../material.module';

import { ComponentDocsComponent } from './component-docs.component';
import { SubNavComponent } from '../../components/components.module';

describe('ComponentDocsComponent', () => {
  let component: ComponentDocsComponent;
  let fixture: ComponentFixture<ComponentDocsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MaterialModule],
      declarations: [ComponentDocsComponent, SubNavComponent],
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
