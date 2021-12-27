import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Image } from '../../models/image';
import { AnyType } from '../../types/any-type';

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.css'],
})
export class ImageCardComponent {
  @Input() isOnlyDisplaying: boolean | undefined;
  @Input() image: Image | undefined;
  @Output() onOpenModal: EventEmitter<AnyType> = new EventEmitter();

  setParamsToImageDeleteModal(image: Image | undefined, mode: string) {
    this.onOpenModal.emit({ image, mode });
  }

  public openLink(url: string | undefined) {
    if (url) window.open(url, '_blank');
  }
}
