import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AppComponent } from './app.component';
import { UserService } from './services/user.service';


import { AppRoutingModule } from './app-routing.module';

import { FormsModule } from '@angular/forms';
import { TenxAppHeaderComponent } from './tenx-app-header/tenx-app-header.component';
import { TenxAppNavigationComponent } from './tenx-app-navigation/tenx-app-navigation.component';
import { FeedsComponent } from './feeds/feeds.component';
import { CommentsPopupComponent } from './modals/comments-popup/comments-popup.component';
import { NotificationsPopupComponent } from './modals/notifications-popup/notifications-popup.component';
import { FeedsPopUpComponent } from './modals/feeds-pop-up/feeds-pop-up.component';


@NgModule({
  declarations: [
    AppComponent,
    TenxAppHeaderComponent,
    TenxAppNavigationComponent,
    FeedsComponent,
    CommentsPopupComponent,
    NotificationsPopupComponent,
    FeedsPopUpComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressBarModule,
    AppRoutingModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
