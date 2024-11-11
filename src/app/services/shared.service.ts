import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private userIdSubject = new BehaviorSubject<string | null>(null);
  private usernameSubject = new BehaviorSubject<string | null>(null);
  private profilePicSubject = new BehaviorSubject<string | null>(null);

  // Methods to set user info
  setUserInfo(userId: string, username: string, profilePic: string): void {
    this.userIdSubject.next(userId);
    this.usernameSubject.next(username);
    this.profilePicSubject.next(profilePic);
  }

  // Methods to get user info as observables
  getUserId(): Observable<string | null> {
    return this.userIdSubject.asObservable();
  }

  getUsername(): Observable<string | null> {
    return this.usernameSubject.asObservable();
  }

  getProfilePic(): Observable<string | null> {
    return this.profilePicSubject.asObservable();
  }
}
