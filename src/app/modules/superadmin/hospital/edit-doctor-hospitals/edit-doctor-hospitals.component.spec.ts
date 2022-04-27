import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDoctorHospitalsComponent } from './edit-doctor-hospitals.component';

describe('EditDoctorHospitalsComponent', () => {
  let component: EditDoctorHospitalsComponent;
  let fixture: ComponentFixture<EditDoctorHospitalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDoctorHospitalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDoctorHospitalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
