import { Component, Input, OnInit } from '@angular/core';
import { Image } from '../../models/image';

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.css']
})
export class ImageCardComponent implements OnInit {

  // public images!: Image[];
  public imageToEdit!: Image;
  public imageToDelete!: Image;

  @Input() image: Image | undefined;

  constructor() { 
   }

  ngOnInit() { }



  public onOpenModal(image: Image | undefined, mode: string) {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    //for future

    // if(mode === 'edit'){
    //   if(image)
    //   this.imageToEdit = image;
    //   button.setAttribute('data-target','#editImageModal');
    // } 
    if (mode === 'delete') {
      if (image)
        this.imageToDelete = image;
      button.setAttribute('data-target', '#deleteImageModal');
    }
    //button.setAttribute('data-target', '#deleteImageModal');
    container?.appendChild(button);
    button.click();
  }


  public onEditImage(image: Image): void {
    //for future

    // document.getElementById('edit-image-form')?.click();
  }

  public openLink(url: string | undefined) {
    if(url)
    window.open(url, "_blank");
  }

}
