import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {IUniversity} from "../../../../models/university.model";
import {UniversityService} from "../../../../service/university.service";
import {actionType} from "../../../../shared/search-box/search-box.component";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

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
  displayedColumns = ['id', 'name', 'city', 'degree', 'createdAt', 'updatedAt'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private _universityService: UniversityService
  ) {
    this.university = this._universityService.university$.value;
    this.dataSource = new MatTableDataSource(this.university);
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

  }

  private addUniversity() {

  }

  private reset() {

  }
}
