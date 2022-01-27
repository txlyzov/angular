import { Component, OnInit } from '@angular/core';
import { ImageFromDatabaseInterface } from 'src/app/models/table-models/image-interface';
import { ImagesService } from 'src/app/services/images/images.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  templateUrl: 'public-images.component.html',
  styleUrls: ['public-images.component.css'],
})
export class PublicImagesComponent implements OnInit {
  public images!: ImageFromDatabaseInterface[];

  constructor(private imageService: ImagesService) {}

  ngOnInit() {
    this.getAllImages();
  }

  public getAllImages(): void {
    this.imageService.getPublicImages().subscribe(
      (response: ImageFromDatabaseInterface[]) => {
        this.images = response;
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
