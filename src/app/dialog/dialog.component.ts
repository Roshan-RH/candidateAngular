import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  standalone: false,

  //templateUrl: './dialog.component.html',
  template:`
    <h1 mat-dialog-title>{{ data.title }}</h1>
    <div mat-dialog-content>
      <p>{{ data.message }}</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="true">Ok</button>
    </div>
  `,
  styleUrl: './dialog.component.css'
})
export class DialogComponent {
constructor(@Inject(MAT_DIALOG_DATA) public data:any) {
}
}
