import {AfterViewInit, Component, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {IHospital} from "../../../../models/hospitals.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {HospitalsService} from "../../../../service/hospitals.service";
import {MatDialog} from "@angular/material/dialog";
import {AddHospitalComponent} from "../add-hospital/add-hospital.component";
import {actionType} from "../../../../shared/search-box/search-box.component";

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.scss']
})
export class HospitalComponent implements OnInit , OnChanges, AfterViewInit{

  hospitalData: IHospital[];
  displayedColumns: string[] = [ "id", "name", "address", "longitude","latitude","createdAt","updatedAt"];
  hospitalName:string;
  hospitalAddress: string;
  hospitalOwner: string;
  dataSource:MatTableDataSource<IHospital> = new MatTableDataSource<IHospital>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
      private route: ActivatedRoute,
      private _hospitalService: HospitalsService,
      private _dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this._hospitalService.hospitals$.subscribe(
        data => {
          this.hospitalData = data;
          this.dataSource.data = this.hospitalData;
        }
    );
  }


  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
    this.dataSource.data = changes.hospitalData.currentValue;
  }

  ngAfterViewInit() {
    this.assignPaginator();
  }

  assignPaginator() {
    if (!this.dataSource.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  search() {
    this.dataSource.data = this.hospitalData.filter(item =>
        this.hospitalName? this.hospitalName === item.name :
            this.hospitalAddress? this.hospitalAddress === item.address: null);
  }

  reset() {
    this.dataSource.data = this.hospitalData;
  }

  addHospital() {
    this._dialog.open(AddHospitalComponent, {
      width: '650px',
      height: '600px',
    })
  }

  actionChange($event: any) {
    switch ($event.type) {
      case actionType.SEARCH:
        this.search();
        break;
      case actionType.ADD:
        this.addHospital();
        break;
      case actionType.RESET:
        this.reset();
        break;
    }
  }
}
