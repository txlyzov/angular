import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ImageFromDatabaseInterface } from 'src/app/models/table-models/image-interface';
import { AnyType } from '../../utils/types/any-type';

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.css'],
})
export class ImageCardComponent {
  @Input() isOnlyDisplaying: boolean | undefined;
  @Input() image: ImageFromDatabaseInterface | undefined;
  @Output() onOpenModal: EventEmitter<AnyType> = new EventEmitter();

  public setParamsToImageDeleteModal(
    image: ImageFromDatabaseInterface | undefined,
  ) {
    this.onOpenModal.emit(image);
  }

  public openLink(url: string | undefined) {
    if (url) {
      window.open(url, '_blank');
    }
  }
}
