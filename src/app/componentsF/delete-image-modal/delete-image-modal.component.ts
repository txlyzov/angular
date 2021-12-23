import { Component, Input, OnInit } from '@angular/core';
import { Image } from '../../models/image';

@Component({
  selector: 'app-delete-image-modal',
  templateUrl: './delete-image-modal.component.html',
  styleUrls: ['./delete-image-modal.component.css']
})
export class DeleteImageModalComponent implements OnInit {

  @Input() image: Image | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  public openLink(url: string | undefined) {
    if(url)
    window.open(url, "_blank");
  }

  // public onOpenModal(image: Image | null, mode: string) {
  //   const container = document.getElementById('main-container');
  //   const button = document.createElement('button');
  //   button.type = 'button';
  //   button.style.display = 'none';
  //   button.setAttribute('data-toggle', 'modal');
 
  //   if (mode === 'delete') {
  //     if (image)
  //       this.image = image;
  //     button.setAttribute('data-target', '#deleteImageModal');
  //   }
  //   container?.appendChild(button);
  //   button.click();
  // }
}
