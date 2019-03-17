import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularReactBrowserModule } from '@angular-react/core';
import { FabDialogModule, FabButtonModule, FabComboBoxModule, FabCalendarModule } from '@angular-react/fabric';

import { FabricComponent } from './fabric.component';

describe('FabricComponent', () => {
  let component: FabricComponent;
  let fixture: ComponentFixture<FabricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AngularReactBrowserModule, FabButtonModule, FabDialogModule, FabComboBoxModule, FabCalendarModule],
      declarations: [FabricComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FabricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
