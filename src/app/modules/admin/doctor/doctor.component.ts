import {AfterViewInit, Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ActivatedRoute} from "@angular/router";
import {DoctorService} from "../../../service/doctor.service";
import {actionType} from "../../../shared/search-box/search-box.component";
import {MatDialog} from "@angular/material/dialog";
import {AddDoctorComponent} from "./add-doctor/add-doctor.component";
import {EditHospitalComponent} from "../../superadmin/hospital/edit-hospital/edit-hospital.component";
import {FuseSplashScreenService} from "../../../../@fuse/services/splash-screen";
import {ConfirmDialogComponent} from "../../../shared/confirm-dialog/confirm-dialog.component";
import {Subscription} from "rxjs";
import {
  EditDoctorHospitalsComponent
} from "../../superadmin/hospital/edit-doctor-hospitals/edit-doctor-hospitals.component";
import {HospitalsService} from "../../../service/hospitals.service";
import {User} from "../../../core/user/user.types";

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ["id", "first_name", "last_name", "email", "phone", "createdAt", "updatedAt", "actions"];
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();
  doctorName: string;
  doctorSurname: string;
  doctorEmail: string;
  doctorData: User[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  private doctorSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private _doctorService: DoctorService,
    private _dialog: MatDialog,
    private _splashScreenService: FuseSplashScreenService,
    private _hospitalService: HospitalsService
  ) {
  }


  ngOnInit(): void {
    this.doctorSubscription = this._doctorService.doctors$.subscribe(data => {
      this.doctorData = data;
      this.dataSource.data = this.doctorData;
    })
  }

  ngOnDestroy() {
    this.doctorSubscription.unsubscribe();
  }


  ngOnChanges(changes: SimpleChanges) {
    this.dataSource.data = changes.doctorData.currentValue;
  }

  ngAfterViewInit() {
    this.assignPaginator();
  }


  assignPaginator() {
    if (!this.dataSource.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  actionChange($event: any) {
    switch ($event.type) {
      case actionType.SEARCH:
        this.search();
        break;
      case actionType.ADD:
        this.addDoctor();
        break;
      case actionType.RESET:
        this.reset();
        break;
    }
  }

  search() {
    const nameRegex = new RegExp(`.*${this.doctorName?.trim().toLowerCase() || ''}.*`, 'gm');
    const surnameRegex = new RegExp(`.*${this.doctorSurname?.trim().toLowerCase() || ''}.*`, 'gm');
    const emailRegex = new RegExp(`.*${this.doctorEmail?.trim().toLowerCase() || ''}.*`, 'gm');
    let data = [...this.doctorData];
    if (this.doctorName) {
      data = data.filter(item => nameRegex.test(item.first_name.toLowerCase()));
    }
    if (this.doctorSurname) {
      data = data.filter(item => surnameRegex.test(item.last_name.toLowerCase()));
    }
    if (this.doctorEmail) {
      data = data.filter(item => emailRegex.test(item.email.toLowerCase()));
    }
    this.dataSource.data = data;
  }

  reset() {
    this.dataSource.data = this.doctorData;
    this.doctorName = '';
    this.doctorSurname = '';
    this.doctorEmail = '';
  }

  addDoctor() {
    this._dialog.open(AddDoctorComponent, {
      maxWidth: '650px',
      width: '100%'
    })
  }

  edit(id) {
    this._dialog.open(EditHospitalComponent, {
      maxWidth: '650px',
      width: '100%',
      data: this.dataSource.data.find(item => item.id === id)
    })
      .afterClosed()
      .subscribe(
        res => {
          if (res?.success) {
            /* this._splashScreenService.show();
             this._doctorService.edi(id, res.data).subscribe(_ => {
               this._doctorService.getHospitals().subscribe();
               this._splashScreenService.hide();
             });*/
          }
        }
      )
  }

  delete(id) {
    this._dialog.open(ConfirmDialogComponent, {
      maxWidth: '650px',
      width: '100%',
      data: {
        title: 'Attention!',
        content: 'Are you sure you want to remove the doctor?',
        yesButton: 'Yes'
      }
    })
      .afterClosed()
      .subscribe(
        confirmed => {
          if (confirmed) {
            this._splashScreenService.show();
            this._doctorService.deleteDoctor(id).subscribe(_ => {
              this._doctorService.getDoctors().subscribe();
              this._splashScreenService.hide();
            });
          }
        }
      )
  }

  modifyHospitals(id) {
    this._dialog.open(EditDoctorHospitalsComponent, {
      maxWidth: '650px',
      width: '100%',
      data: this.dataSource.data.find(item => item.id === id)
    })
      .afterClosed()
      .subscribe(
        res => {
          if (res?.remove) {
            this._splashScreenService.show();
            this._doctorService.removeDoctorFromHospitals(id, res.remove).subscribe(_ => {
              this._doctorService.getDoctors().subscribe();
              this._splashScreenService.hide();
            });
          }
          if (res?.attach) {
            this._splashScreenService.show();
            this._hospitalService.attachHospital(id, res.attach).subscribe(_ => {
              this._doctorService.getDoctors().subscribe();
              this._splashScreenService.hide();
            })
          }
        }
      )
  }
}
