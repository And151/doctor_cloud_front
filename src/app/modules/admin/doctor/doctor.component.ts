import {AfterViewInit, Component, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {IUser} from "../../../models/user.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ActivatedRoute} from "@angular/router";
import {DoctorService} from "../../../service/doctor.service";
import {actionType} from "../../../shared/search-box/search-box.component";
import {MatDialog} from "@angular/material/dialog";
import {AddDoctorComponent} from "./add-doctor/add-doctor.component";

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit , OnChanges, AfterViewInit{
  displayedColumns: string[] = ["id", "first_name", "last_name", "email", "phone", "type", "roleId", "createdAt", "updatedAt", "edit"];
  dataSource: MatTableDataSource<IUser> = new MatTableDataSource<IUser>();
  doctorName: string;
  doctorSurname: string;
  doctorEmail: string;
  doctorData: IUser[]=[];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
      private route: ActivatedRoute,
      private _doctorService: DoctorService,
      private _dialog: MatDialog

  ) { }



  ngOnInit(): void {
    this._doctorService.doctors$.subscribe(data => {
      this.doctorData = data;
      this.dataSource.data = this.doctorData;
    })
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
    this.dataSource.data = this.doctorData.filter(item =>
        this.doctorName ? nameRegex.exec(item.first_name.toLowerCase()) :
            this.doctorSurname ? surnameRegex.exec(item.last_name.toLowerCase()) :
                this.doctorEmail ? emailRegex.exec(item.email.toLowerCase()) : null);
  }

  reset() {
    this.dataSource.data = this.doctorData;
  }

  addDoctor() {
    this._dialog.open(AddDoctorComponent, {
      maxWidth: '650px',
      width: '100%'
    })
  }
}
