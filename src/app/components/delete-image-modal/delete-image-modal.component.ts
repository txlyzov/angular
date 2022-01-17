import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ImageInterface } from 'src/app/models/table-models/image-interface';
import { ImagesService } from 'src/app/services/images/images.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AnyType } from 'src/app/utils/types/any-type';

@Component({
  selector: 'app-delete-image-modal',
  templateUrl: './delete-image-modal.component.html',
})
export class DeleteImageModalComponent {
  @Input() image: ImageInterface | undefined;
  @Output() refreshPageData: EventEmitter<AnyType> = new EventEmitter();

  constructor(private imageService: ImagesService) {}

  public deleteImage(imageId: number | undefined) {
    if (imageId) {
      this.imageService.deleteImage(imageId).subscribe(
        () => {
          this.refreshPageData.emit();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        },
      );
    }
  }
}
