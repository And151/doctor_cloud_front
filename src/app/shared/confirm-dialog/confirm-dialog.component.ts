import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
  title: string;
  content: string;
  noButton = 'No Thanks';
  yesButton = 'Ok';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
  ) {
    this.title = data.title;
    this.content = data.content;
    if (data.yesButton) {
      this.yesButton = data.yesButton;
    }
    if (data.noButton) {
      this.yesButton = data.noButton;
    }
  }

}
