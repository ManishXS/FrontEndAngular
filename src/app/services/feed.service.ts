import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feed } from '../models/feed.model';
import { environment } from '../environment';  // Ensure the path is correct

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  private baseUrl = environment.apiUrl; // Correct backend API URL

  constructor(private http: HttpClient) {}

  getFeeds(pageNumber: number, pageSize: number, userId?: string): Observable<Feed[]> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    if (userId) {
      params = params.set('userId', userId);
    }

    console.log(`Calling API to retrieve feeds: ${this.baseUrl}/Feeds/getUserFeeds?pageNumber=${pageNumber}&pageSize=${pageSize}${userId ? `&userId=${userId}` : ''}`);

    return this.http.get<Feed[]>(`${this.baseUrl}/Feeds/getUserFeeds`, { params });
  }
}
