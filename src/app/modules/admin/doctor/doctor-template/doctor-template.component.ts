import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {UserRole, UserTypes} from "../../../../core/user/user.types";
import {DoctorService} from "../../../../service/doctor.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-doctor-template',
  templateUrl: './doctor-template.component.html',
  styleUrls: ['./doctor-template.component.scss']
})
export class DoctorTemplateComponent implements OnInit {
  @Output()
  onChange = new EventEmitter();
  @Input()
  type: string = 'Create';

  constructor(
    private _doctorService: DoctorService,
    private _form: FormBuilder,
    private _snack: MatSnackBar,
  ) {
  }

  newDoctor = this._form.group({
    first_name: [""],
    last_name: [""],
    email: [""],
    phone: [""],
    password: ["", Validators.min(8)],
    imageUrl: [""],
    type: UserTypes.DOCTOR,
    roleId: UserRole.USER
  })

  ngOnInit(): void {
  }


  change() {
    this.onChange.emit(this.newDoctor.getRawValue());
  }
}
