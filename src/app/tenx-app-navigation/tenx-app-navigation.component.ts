import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FeedsPopUpComponent } from '../modals/feeds-pop-up/feeds-pop-up.component';


@Component({
  selector: 'tenx-app-navigation',
  templateUrl: './tenx-app-navigation.component.html',
  styleUrls: ['./tenx-app-navigation.component.css']
})
export class TenxAppNavigationComponent {

  constructor(private dialog: MatDialog) {}

  openCreatePopup(): void {
    console.log("Create button clicked!");
    const dialogRef = this.dialog.open(FeedsPopUpComponent, {
      width: '400px', // You can adjust the size as needed
      data: {} // If you need to pass any data, do so here
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Handle result if needed
    });
  }
}
