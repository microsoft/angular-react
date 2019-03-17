import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularReactBrowserModule } from '@angular-react/core';

import { MaterialModule } from '../../../material.module';
import { ComponentsModule } from '../../../components/components.module';
import { ReactComponentsModule } from '../../../react-components/react-components.module';

import { MixedPerfComponent } from './mixed-perf.component';

describe('MixedPerfComponent', () => {
  let component: MixedPerfComponent;
  let fixture: ComponentFixture<MixedPerfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MixedPerfComponent],
      imports: [AngularReactBrowserModule, MaterialModule, ComponentsModule, ReactComponentsModule],
    }).compileComponents();
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
