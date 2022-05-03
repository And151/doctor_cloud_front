import {Component, OnInit} from '@angular/core';
import {AnalyticsService} from "../../../../service/analytics.service";
import {Istats} from "../../../../models/analytics.model";

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

    stats: Istats;
    displayedColumns = ["name", "last_name", "gender", "created_at", " "];
    dataSource = [
        {name: "Inesa", last_name: "Toroyan", gender: "Female", created_at: "April 29,2022"},
        {name: "Inesa", last_name: "Toroyan", gender: "Female", created_at: "April 29,2022"},
        {name: "Inesa", last_name: "Toroyan", gender: "Female", created_at: "April 29,2022"},
        {name: "Inesa", last_name: "Toroyan", gender: "Female", created_at: "April 29,2022"},
        {name: "Inesa", last_name: "Toroyan", gender: "Female", created_at: "April 29,2022"},
    ];

    constructor(private _analyticsService: AnalyticsService) {
    }

    ngOnInit(): void {
        this._analyticsService.getStats().subscribe(data => {
            this.stats = data;
        });
    }

}
