import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ImageInterface } from 'src/app/models/table-models/image-creation-interface';
import { AnyType } from 'src/app/utils/types/any-type';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css'],
})
export class ImageComponent {
  @Input() image: ImageInterface | undefined;
  @Output() setImageUrlValidStatus = new EventEmitter<AnyType>();

  public openLink(url: string | undefined) {
    if (url) {
      window.open(url, '_blank');
    }
  }

  onSuccess() {
    this.setImageUrlValidStatus.emit(true);
  }
  onFailed() {
    this.setImageUrlValidStatus.emit(false);
  }
}
