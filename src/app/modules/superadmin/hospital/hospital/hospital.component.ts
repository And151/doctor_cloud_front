import {AfterViewInit, Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {IHospital} from "../../../../models/hospitals.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {HospitalsService} from "../../../../service/hospitals.service";
import {MatDialog} from "@angular/material/dialog";
import {AddHospitalComponent} from "../add-hospital/add-hospital.component";
import {actionType} from "../../../../shared/search-box/search-box.component";
import {EditHospitalComponent} from "../edit-hospital/edit-hospital.component";
import {FuseSplashScreenService} from "../../../../../@fuse/services/splash-screen";
import {Subscription} from "rxjs";
import {ConfirmDialogComponent} from "../../../../shared/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.scss']
})
export class HospitalComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  hospitalData: IHospital[];
  displayedColumns: string[] = ["id", "name", "address", "longitude", "latitude", "createdAt", "updatedAt", "actions"];
  hospitalName: string;
  hospitalAddress: string;
  dataSource: MatTableDataSource<IHospital> = new MatTableDataSource<IHospital>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  private hospitalsSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private _hospitalService: HospitalsService,
    private _dialog: MatDialog,
    private _splashScreenService: FuseSplashScreenService
  ) {
  }

  ngOnInit(): void {
    this.hospitalsSubscription = this._hospitalService.hospitals$.subscribe(
      data => {
        this.hospitalData = data;
        this.dataSource.data = this.hospitalData;
      }
    );
  }

  ngOnDestroy() {
    this.hospitalsSubscription.unsubscribe();
  }


  ngOnChanges(changes: SimpleChanges) {
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
    const nameRegex = new RegExp(`.*${this.hospitalName?.trim().toLowerCase() || ''}.*`, 'gm');
    const addressRegex = new RegExp(`.*${this.hospitalAddress?.trim().toLowerCase() || ''}.*`, 'gm');
    this.dataSource.data = this.hospitalData.filter(item =>
      this.hospitalName ? nameRegex.exec(item.name.toLowerCase()) :
        this.hospitalAddress ? addressRegex.exec(item.address.toLowerCase()) : null);
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
                this._splashScreenService.show();
                this._hospitalService.editHospital(id, res.data).subscribe(_ => {
                  this._hospitalService.getHospitals().subscribe();
                  this._splashScreenService.hide();
                });
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
        content: 'Are you sure you want to delete the hospital?',
        yesButton: 'Yes'
      }
    })
        .afterClosed()
        .subscribe(
            confirmed => {
              if (confirmed) {
                this._splashScreenService.show();
                this._hospitalService.deleteHospital(id).subscribe(_ => {
                  this._hospitalService.getHospitals().subscribe();
                  this._splashScreenService.hide();
                });
              }
            }
        )
  }
}
