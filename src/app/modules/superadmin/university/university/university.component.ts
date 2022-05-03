import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {IUniversity} from "../../../../models/university.model";
import {UniversityService} from "../../../../service/university.service";
import {actionType} from "../../../../shared/search-box/search-box.component";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {UniversityModalComponent} from "../university-modal/university-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../../../shared/confirm-dialog/confirm-dialog.component";
import {FuseSplashScreenService} from "../../../../../@fuse/services/splash-screen";

@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.scss']
})
export class UniversityComponent implements AfterViewInit {
  university: IUniversity[];
  universityName: string;
  dataSource: MatTableDataSource<IUniversity>;
  cityName: string;
  displayedColumns = ['id', 'name', 'city', 'degree', 'createdAt', 'updatedAt', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  private initialData: IUniversity[];

  constructor(
    private _universityService: UniversityService,
    private _dialog: MatDialog,
    private _splashScreenService: FuseSplashScreenService
  ) {
    this.university = this._universityService.university$.value;
    this.dataSource = new MatTableDataSource(this.university);
    this._universityService.university$.subscribe(data => {
      this.dataSource.data = data;
      this.initialData = data;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  actionChange($event: any) {
    switch ($event.type) {
      case actionType.SEARCH:
        this.search();
        break;
      case actionType.ADD:
        this.addUniversity();
        break;
      case actionType.RESET:
        this.reset();
        break;
    }
  }

  private search() {
    this._splashScreenService.show();
    const nameRegex = new RegExp(`.*${this.universityName?.trim().toLowerCase() || ''}.*`, 'gm');
    const cityRegex = new RegExp(`.*${this.cityName?.trim().toLowerCase() || ''}.*`, 'gm');
    let data = [...this.initialData];
    if (this.universityName) {
      data = data.filter(item => nameRegex.test(item.name.toLowerCase()));
    }
    if (this.cityName) {
      data = data.filter(item => cityRegex.test(item.city.toLowerCase()));
    }
    this.dataSource.data = data;
    this._splashScreenService.hide();
  }

  private addUniversity() {
    this._dialog.open(UniversityModalComponent, {
      maxWidth: '650px',
      width: '100%'
    })
      .afterClosed()
      .subscribe(
        res => {
          if (res?.success) {
            this._splashScreenService.show();
            this._universityService.create(res.data).subscribe(_ => {
              this._splashScreenService.hide();
            });
          }
        }
      )
  }

  private reset() {
    this.dataSource.data = this.initialData;
    this.universityName = null;
    this.cityName = null;
  }

  edit(id: number) {
    this._dialog.open(UniversityModalComponent, {
      maxWidth: '650px',
      width: '100%',
      data: this.dataSource.data.find(item => item.id === id)
    })
      .afterClosed()
      .subscribe(
        res => {
          if (res?.success) {
            this._splashScreenService.show();
            this._universityService.update(id, res.data).subscribe(_ => {
              this._splashScreenService.hide();
            });
          }
        }
      )
  }

  delete(id: number) {
    this._dialog.open(ConfirmDialogComponent, {
      maxWidth: '650px',
      width: '100%',
      data: {
        title: 'Attention!',
        content: 'Are you sure you want to delete that?',
        yesButton: 'Yes'
      }
    })
      .afterClosed()
      .subscribe(
        confirmed => {
          if (confirmed) {
            this._splashScreenService.show();
            this._universityService.delete(id).subscribe(_ => {
              this._splashScreenService.hide();
            });
          }
        }
      )
  }
}
