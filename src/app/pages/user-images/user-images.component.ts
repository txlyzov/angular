import { Component, OnInit } from '@angular/core';
import { ImageInterface } from 'src/app/models/table-models/image-interface';
import { ImagesService } from 'src/app/services/images/images.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  templateUrl: 'user-images.component.html',
  styleUrls: ['user-images.component.css'],
})
export class UserImagesComponent implements OnInit {
  public images!: ImageInterface[];
  public imageToEdit!: ImageInterface;
  public imageToDelete!: ImageInterface;

  constructor(private imageService: ImagesService) {}

  ngOnInit() {
    this.getAllImages();
  }

  public getAllImages(): void {
    this.imageService.getPublicImages().subscribe(
      (response: ImageInterface[]) => {
        this.images = response;
      },
      (err: HttpErrorResponse) => {
        alert(err.message);
      },
    );
  }

  public onOpenModal(model: { image: ImageInterface | null; mode: string }) {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (model.mode === 'delete') {
      if (model.image) this.imageToDelete = model.image;
      button.setAttribute('data-target', '#deleteImageModal');
    }

    container?.appendChild(button);
    button.click();
  }

  public openLink(url: string) {
    window.open(url, '_blank');
  }
}
