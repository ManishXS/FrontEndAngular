import { Component, OnInit } from '@angular/core';
import { UploadService } from '../../services/upload.service';
import { SharedService } from '../../services/shared.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-feeds-pop-up',
  templateUrl: './feeds-pop-up.component.html',
  styleUrls: ['./feeds-pop-up.component.css']
})
export class FeedsPopUpComponent implements OnInit {
  selectedFile: File | null = null;
  uploadProgress: number = 0;
  userId: string | null = null;
  username: string | null = null;
  profilePic: string | null = null;

  constructor(private uploadService: UploadService, private sharedService: SharedService) {}

  ngOnInit(): void {
    this.sharedService.getUserId().subscribe(userId => this.userId = userId);
    this.sharedService.getUsername().subscribe(username => this.username = username);
    this.sharedService.getProfilePic().subscribe(profilePic => this.profilePic = profilePic);
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] || null;
    if (this.selectedFile) {
      this.uploadFile();
    }
  }

  uploadFile(): void {
    if (this.selectedFile && this.userId && this.username) {
      const formData = new FormData();
  
      // Add required fields to formData
      formData.append('file', this.selectedFile);
      formData.append('userId', this.userId);  // Required field
      formData.append('fileName', this.selectedFile.name);  // Required field: use the actual file name
      formData.append('description', 'Sample description'); // Add a description or make it dynamic
      formData.append('contentType', this.selectedFile.type); // Optional: File's content type
      formData.append('fileSize', this.selectedFile.size.toString()); // Optional: File's size
      if (this.profilePic) {
        formData.append('profilePic', this.profilePic); // Optional profile pic
      }
  
      this.uploadService.uploadFile(formData).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress && event.total) {
          this.uploadProgress = Math.round((100 * event.loaded) / event.total);
        } else if (event.type === HttpEventType.Response) {
          console.log('File uploaded successfully:', event.body);
        }
      }, error => {
        console.error('Upload failed:', error);
      });
    } else {
      console.error('User data or file is missing');
    }
  }
}
