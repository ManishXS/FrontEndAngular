import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { SharedService } from '../services/shared.service';
import { UserData } from '../models/user-data.model';

@Component({
  selector: 'tenx-app-header',
  templateUrl: './tenx-app-header.component.html',
  styleUrls: ['./tenx-app-header.component.css']
})
export class TenxAppHeaderComponent implements OnInit {
  generatedUserData: UserData = new UserData('', '', '');

  constructor(private userService: UserService, private sharedService: SharedService) {}

  ngOnInit() {
    const userId = this.getCookie('userId');
    const username = this.getCookie('username');
    const profilePic = this.getCookie('profilePic');

    if (userId && username && profilePic) {
      this.generatedUserData = new UserData(userId, username, profilePic);
      this.sharedService.setUserInfo(userId, username, profilePic);
    } else {
      this.generateAndStoreUser(true);
    }
  }

  generateAndStoreUser(storeCookies: boolean) {
    this.userService.generateUserId().subscribe(
      (response: UserData) => {
        this.generatedUserData = response;

        if (storeCookies) {
          this.setCookie('userId', this.generatedUserData.userId, 365);
          this.setCookie('username', this.generatedUserData.username, 365);
          this.setCookie('profilePic', this.generatedUserData.profilePic, 365);
        }

        this.sharedService.setUserInfo(
          this.generatedUserData.userId,
          this.generatedUserData.username,
          this.generatedUserData.profilePic
        );
      },
      error => console.error('Error generating user ID:', error)
    );
  }

  setCookie(name: string, value: string, days: number) {
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/`;
  }

  getCookie(name: string): string | null {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i].trim();
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length);
      }
    }
    return null;
  }
}
