import {Component, OnInit} from '@angular/core';
import {AnalyticsService} from "../../../../service/analytics.service";
import {Istats} from "../../../../models/analytics.model";
import {UserService} from "../../../../core/user/user.service";
import {User, UserRole} from "../../../../core/user/user.types";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  stats: Istats;
  displayedColumns = ["name", "last_name", "email", "created_at", " "];
  dataSource = new MatTableDataSource<User>();

  constructor(
    private _userService: UserService,
    private _analyticsService: AnalyticsService
  ) {
    this._userService.getLastPatients().subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
      }
    );
  }

  ngOnInit(): void {
    if (this._userService.user.roleId === UserRole.SUPER_ADMIN) {
      this._analyticsService.getStats().subscribe(data => {
        this.stats = data;
      });
    }
  }

}
