import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
// import { EventEmitter } from 'stream';
import { Image } from '../../models/image';

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.css']
})
export class ImageCardComponent {

  @Input() isOnlyDisplaying: boolean | undefined;
  @Input() image: Image | undefined;
  @Output() onOpenModal: EventEmitter<any> = new EventEmitter();

  

  setParamsToImageDeleteModal(image: Image | undefined, mode: string) {
    this.onOpenModal.emit({image,mode});
  }

  public openLink(url: string | undefined) {
    if (url)
      window.open(url, "_blank");
  }

}
