import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularPerfComponent } from './angular-perf.component';
import { MaterialModule } from '../../../material.module';
import { ComponentsModule } from '../../../components/components.module';

describe('AngularPerfComponent', () => {
  let component: AngularPerfComponent;
  let fixture: ComponentFixture<AngularPerfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, ComponentsModule],
      declarations: [AngularPerfComponent],
    }).compileComponents();
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
