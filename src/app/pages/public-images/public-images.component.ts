import { Component } from '@angular/core';
import { ImageFromDatabaseInterface } from 'src/app/models/table-models/image-interface';
import { ImagesService } from 'src/app/services/images/images.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ResponseWithMetaInterface } from 'src/app/models/response-with-meta-interface';

@Component({
  templateUrl: 'public-images.component.html',
  styleUrls: ['public-images.component.css'],
})
export class PublicImagesComponent {
  public images!: ImageFromDatabaseInterface[];
  config!: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
  };

  constructor(
    private imageService: ImagesService,
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
    this.imageService
      .getPublicImages(this.config.currentPage, this.config.itemsPerPage)
      .subscribe(
        (response: ResponseWithMetaInterface) => {
          this.config.totalItems = response.meta.count;
          this.images = response.data.rows;
        },
        (err: HttpErrorResponse) => {
          alert(err.message);
        },
      );
  }

  public openLink(url: string) {
    window.open(url, '_blank');
  }
}
