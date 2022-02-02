import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TokenStorageService } from 'src/app/utils/token-storage/token-storage.service';
import { Router } from '@angular/router';
import { UserImagesService } from 'src/app/services/user-images/user-images.service';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { errorsTexts, routes } from 'src/app/utils/consts/consts';
import { componentId as CID } from './upload-image-consts';

@Component({
  templateUrl: 'upload-image.component.html',
  styleUrls: ['upload-image.component.css'],
})
export class UploadImageComponent {
  inputImageName = CID.INPUT_IMAGE_NAME;
  inputImageUrl = CID.INPUT_IMAGE_URL;
  inputImageDescription = CID.INPUT_IMAGE_DESCRIPTION;
  inputImagePrivacy = CID.INPUT_IMAGE_PRIVACY;
  submitButton = CID.SUBMIT_BUTTON;
  image = {
    name: '',
    url: 'https://media1.giphy.com/media/r31CDVGv8RRRbZPU6r/giphy.gif',
    description: '',
    isPrivate: false,
  };
  isImageUrlValid = false;
  form = new FormGroup({
    imageName: new FormControl('', Validators.required),
    imageUrl: new FormControl('', Validators.required),
    imageDescription: new FormControl(null),
    isPrivate: new FormControl(false),
  });

  constructor(
    private userImageService: UserImagesService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
  ) {}

  get imageName() {
    return this.form.get('imageName');
  }
  get imageUrl() {
    return this.form.get('imageUrl');
  }

  previewName(name: string) {
    this.image.name = name;
  }

  previewLink(link: string) {
    this.image.url = link;
  }

  previewDescription(description: string) {
    this.image.description = description;
  }

  setImageUrlValidStatus(status: boolean) {
    this.isImageUrlValid = status;
  }

  submit(): void {
    const token = this.tokenStorageService.getToken().getValue();
    const formData = this.form.value;
    const imageData = {
      url: formData.imageUrl,
      name: formData.imageName,
      description: formData.imageDescription,
      isPrivate: formData.isPrivate,
    };

    if (!token) {
      this.tokenStorageService.errorSignOut();

      return;
    }

    if (!this.isImageUrlValid) {
      alert(errorsTexts.IMG_LINK_ERROR);

      return;
    }

    this.userImageService.createImage(imageData, token).subscribe(
      () => {
        this.router.navigate([routes.USER_IMAGES]);
      },
      (err: HttpErrorResponse) => {
        if (err.status === HttpStatusCode.Forbidden) {
          return this.tokenStorageService.errorSignOut();
        }

        return alert(err.message);
      },
    );
  }
}
