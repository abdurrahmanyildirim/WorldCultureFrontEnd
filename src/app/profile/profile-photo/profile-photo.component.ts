import { Component, OnInit } from '@angular/core';
import { ProfileComponent } from '../profile.component';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-profile-photo',
  templateUrl: './profile-photo.component.html',
  styleUrls: ['./profile-photo.component.css']
})
export class ProfilePhotoComponent implements OnInit {

  constructor(
    private profileComponent: ProfileComponent,
    private alertifyService: AlertifyService,
    private activatedRoute: ActivatedRoute
  ) { }

  baseUrl: string = "https://localhost:44303/api/";
  uploader: FileUploader;

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.initializeUploader()
    })
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'profile/changeProfilePhoto',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      autoUpload: false,
      removeAfterUpload: true,
      maxFileSize: 10 * 1024 * 1024
    })
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      this.alertifyService.success("Fotoğraf değiştirildi.");
      this.profileComponent.getAccountData();
    }
  }
}
