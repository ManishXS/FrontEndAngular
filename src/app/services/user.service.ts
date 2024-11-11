import { Injectable } from '@angular/core';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { UserData } from '../models/user-data.model';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;
  private apiKey = environment.apiKey;

  // Define httpOptions with headers here
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-API-KEY': this.apiKey // Replace this with your API key value
    })
  };

  constructor(private http: HttpClient) {}

  generateUserId(): Observable<UserData> {
    const sanitizedUrl = `${this.apiUrl}/Users/create`.trim().replace(/\s+/g, '');

    // Pass only headers in the request using `this.httpOptions.headers`
    return this.http.get<UserData>(sanitizedUrl, { headers: this.httpOptions.headers }).pipe(
      tap((response: UserData) => response), // Process the response if needed
      catchError((error: HttpErrorResponse) => {
        throw error; // Handle error accordingly
      })
    );
  }
}
