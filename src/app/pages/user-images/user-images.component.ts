import { Component } from '@angular/core';
import { ImageFromDatabaseInterface } from 'src/app/models/table-models/image-interface';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { UserImagesService } from 'src/app/services/user-images/user-images.service';
import { TokenStorageService } from 'src/app/utils/token-storage/token-storage.service';
import { ResponseWithMetaInterface } from 'src/app/models/response-with-meta-interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: 'user-images.component.html',
  styleUrls: ['user-images.component.css'],
})
export class UserImagesComponent {
  public images!: ImageFromDatabaseInterface[];
  public imageToEdit!: ImageFromDatabaseInterface;
  public imageToDelete!: ImageFromDatabaseInterface;
  config!: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
  };

  constructor(
    private userImagesService: UserImagesService,
    private tokenStorageService: TokenStorageService,
    private route: ActivatedRoute,
  ) {
    this.config = {
      currentPage: 1,
      itemsPerPage: 16,
      totalItems: 0,
    };
    route.queryParams.subscribe((params) => {
      this.config!.currentPage = params['page'] ? params['page'] : 1;
      this.getImages();
    });
  }

  public getImages(): void {
    const token = this.tokenStorageService.getToken().getValue();

    if (token) {
      this.userImagesService
        .getUserImages(token, this.config.currentPage, this.config.itemsPerPage)
        .subscribe(
          (response: ResponseWithMetaInterface) => {
            this.config.totalItems = response.meta;
            this.images = response.data;
          },
          (err: HttpErrorResponse) => {
            if (err.status === HttpStatusCode.Forbidden) {
              return this.tokenStorageService.errorSignOut();
            }

            return alert(err.message);
          },
        );

      return;
    }

    return this.tokenStorageService.errorSignOut();
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
