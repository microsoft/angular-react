import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularReactBrowserModule } from '@angular-react/core';
import {
  FabButtonModule,
  FabContextualMenuModule,
  FabDropdownModule,
  FabPivotModule,
  FabCommandBarModule,
} from '@angular-react/fabric';

import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { MaterialModule } from './material.module';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MaterialModule,
        FabDropdownModule,
        ComponentsModule,
        AngularReactBrowserModule,
        FabPivotModule,
        FabContextualMenuModule,
        FabCommandBarModule,
        FabButtonModule,
      ],
      declarations: [AppComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
