import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorTemplateComponent } from './doctor-template.component';

describe('DoctorTemplateComponent', () => {
  let component: DoctorTemplateComponent;
  let fixture: ComponentFixture<DoctorTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
