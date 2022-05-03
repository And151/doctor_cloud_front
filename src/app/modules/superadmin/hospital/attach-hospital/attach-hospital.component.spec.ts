import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachHospitalComponent } from './attach-hospital.component';

describe('AttachHospitalComponent', () => {
  let component: AttachHospitalComponent;
  let fixture: ComponentFixture<AttachHospitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttachHospitalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachHospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
