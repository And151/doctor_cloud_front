import {AfterViewInit, Component, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {IUser} from "../../../models/user.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ActivatedRoute} from "@angular/router";
import {DoctorService} from "../../../service/doctor.service";
import {actionType} from "../../../shared/search-box/search-box.component";

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit , OnChanges, AfterViewInit{
  displayedColumns: string[] = ["id", "first_name", "last_name", "email", "phone", "type", "roleId", "createdAt", "updatedAt"];
  dataSource: MatTableDataSource<IUser> = new MatTableDataSource<IUser>();
  doctorName: string;
  doctorSurname: string;
  doctorEmail: string;
  doctorData: IUser[]=[];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
      private route: ActivatedRoute,
      private _doctorService: DoctorService

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
    if($event.type === actionType.SEARCH) {
      console.log("searching")
      this.search();
    }
  }

  search() {

  }
}
