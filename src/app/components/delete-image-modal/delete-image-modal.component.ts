import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ImageFromDatabaseInterface } from 'src/app/models/table-models/image-interface';
import { HttpErrorResponse } from '@angular/common/http';
import { AnyType } from 'src/app/utils/types/any-type';
import { UserImagesService } from 'src/app/services/user-images/user-images.service';
import { TokenStorageService } from 'src/app/utils/token-storage/token-storage.service';

@Component({
  selector: 'app-delete-image-modal',
  templateUrl: './delete-image-modal.component.html',
})
export class DeleteImageModalComponent {
  @Input() image: ImageFromDatabaseInterface | undefined;
  @Output() refreshPageData: EventEmitter<AnyType> = new EventEmitter();

  constructor(
    private userImageService: UserImagesService,
    private tokenStorageService: TokenStorageService,
  ) {}

  public deleteImage(imageId: number | undefined) {
    const token = this.tokenStorageService.getToken().getValue();

    if (token && imageId) {
      this.userImageService.deleteUserImage(token, imageId).subscribe(
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
