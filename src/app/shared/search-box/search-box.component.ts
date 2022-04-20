import {Component, EventEmitter, OnInit, Output} from '@angular/core';

export enum actionType {
  SEARCH = "SEARCH",
  RESET = "RESET",
  ADD = "ADD"
}

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})


export class SearchBoxComponent implements OnInit {

  @Output() action = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  public get actionType () {
    return actionType;
  }
  onAction(action: actionType) {
        this.action.emit({
          type: action
        })
    }
}
