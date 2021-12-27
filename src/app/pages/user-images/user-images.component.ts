import { Component, OnInit } from '@angular/core';
import { Image } from '../../models/image';

@Component({
  templateUrl: 'user-images.component.html',
  styleUrls: ['user-images.component.css'],
})
export class UserImagesComponent implements OnInit {
  public images!: Image[];
  public imageToEdit!: Image;
  public imageToDelete!: Image;

  ngOnInit() {
    this.images = [
      new Image(1, 1, '1', 'https://picsum.photos/100'),
      new Image(1, 1, '2', 'https://picsum.photos/200'),
      new Image(1, 1, '3', 'https://picsum.photos/300'),
      new Image(1, 1, '4', 'https://picsum.photos/400'),
      new Image(1, 1, '5', 'https://picsum.photos/500'),
      new Image(1, 1, '6', 'https://picsum.photos/600'),
      new Image(1, 1, '7', 'https://picsum.photos/700'),
      new Image(1, 1, '8', 'https://picsum.photos/800'),
      new Image(1, 1, '9', 'https://picsum.photos/900'),
      new Image(1, 1, '0', 'https://picsum.photos/110'),
      new Image(1, 1, '1', 'https://picsum.photos/220'),
      new Image(1, 1, '2', 'https://picsum.photos/230'),
      new Image(1, 1, '3', 'https://picsum.photos/240'),
      new Image(1, 1, '4', 'https://picsum.photos/250'),
      new Image(1, 1, '5', 'https://picsum.photos/260'),
      new Image(1, 1, '6', 'https://picsum.photos/270'),
      new Image(1, 1, '7', 'https://picsum.photos/280'),
    ];
  }

  public onOpenModal(model: { image: Image | null; mode: string }) {
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
