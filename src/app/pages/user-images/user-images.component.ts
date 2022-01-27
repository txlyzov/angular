import { Component, OnInit } from '@angular/core';
import { ImageFromDatabaseInterface } from 'src/app/models/table-models/image-interface';
import { HttpErrorResponse } from '@angular/common/http';
import { UserImagesService } from 'src/app/services/user-images/user-images.service';
import { TokenStorageService } from 'src/app/utils/token-storage/token-storage.service';
import { Router } from '@angular/router';
import { routes } from 'src/app/utils/consts/consts';

@Component({
  templateUrl: 'user-images.component.html',
  styleUrls: ['user-images.component.css'],
})
export class UserImagesComponent implements OnInit {
  public images!: ImageFromDatabaseInterface[];
  public imageToEdit!: ImageFromDatabaseInterface;
  public imageToDelete!: ImageFromDatabaseInterface;

  constructor(
    private userImagesService: UserImagesService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.getAllImages();
  }

  public getAllImages(): void {
    const token = this.tokenStorageService.getToken().getValue();

    if (token) {
      this.userImagesService.getUserImages(token).subscribe(
        (response: ImageFromDatabaseInterface[]) => {
          this.images = response;
        },
        (err: HttpErrorResponse) => {
          alert(err.message);
        },
      );
    } else {
      this.tokenStorageService.signOut();
      alert('Auth error');
      this.router.navigate([routes.LOGIN]);
    }
  }

  public onOpenModal(model: {
    image: ImageFromDatabaseInterface | null;
    mode: string;
  }) {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (model.mode === 'delete') {
      if (model.image) {
        this.imageToDelete = model.image;
      }

      button.setAttribute('data-target', '#deleteImageModal');
    }

    container?.appendChild(button);
    button.click();
  }

  public openLink(url: string) {
    window.open(url, '_blank');
  }
}
