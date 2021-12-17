import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProfilesComponent } from './profiles.component';
import { MaterialModule } from '../../../material.module';
import { ComponentsModule } from '../../../components/components.module';

describe('ProfilesComponent', () => {
  let component: ProfilesComponent;
  let fixture: ComponentFixture<ProfilesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, ComponentsModule],
      declarations: [ProfilesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
