import { Component, OnInit } from '@angular/core';
import { FeedService } from '../services/feed.service';
import { SharedService } from '../services/shared.service';
import { Feed } from '../models/feed.model';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css']
})
export class FeedsComponent implements OnInit {
  feeds: Feed[] = [];
  pageNumber: number = 1;
  loading: boolean = false;
  userId: string | null = null;

  constructor(private feedService: FeedService, private sharedService: SharedService) {}

  ngOnInit() {
    this.sharedService.getUserId().subscribe(userId => {
      this.userId = userId;
      this.loadFeeds(userId || undefined);  // Ensures it's either a string or undefined

    });
    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  loadFeeds(userId?: string) {
    if (this.loading) return;

    this.loading = true;
    this.feedService.getFeeds(this.pageNumber, 10, userId).subscribe(
      (newFeeds: Feed[]) => {
        this.feeds = [...this.feeds, ...newFeeds];
        this.loading = false;
        this.pageNumber++;
      },
      error => {
        this.loading = false;
        console.error('Error loading feeds:', error);
      }
    );
  }

  downloadFile(filePath: string): void {
    const link = document.createElement('a');
    link.href = filePath;
    link.download = filePath.split('/').pop() || 'download';
    link.click();
  }

  onScroll() {
    const bottomOfWindow = window.innerHeight + window.scrollY >= document.body.offsetHeight;
    if (bottomOfWindow) {
      this.loadFeeds(this.userId || undefined);  // This ensures undefined is passed if userId is null
    }
  }
}
