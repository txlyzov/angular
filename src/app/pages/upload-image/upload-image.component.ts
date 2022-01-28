import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TokenStorageService } from 'src/app/utils/token-storage/token-storage.service';
import { Router } from '@angular/router';
import { UserImagesService } from 'src/app/services/user-images/user-images.service';
import { HttpErrorResponse } from '@angular/common/http';
import { routes } from 'src/app/utils/consts/consts';

@Component({
  templateUrl: 'upload-image.component.html',
  styleUrls: ['upload-image.component.css'],
})
export class UploadImageComponent {
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
      alert('Image link is broken');

      return;
    }

    this.userImageService.createImage(imageData, token).subscribe(
      () => {
        this.router.navigate([routes.USER_IMAGES]);
      },
      (err: HttpErrorResponse) => {
        if (err.status === 403) {
          this.tokenStorageService.errorSignOut();
        } else {
          alert(err.message);
        }
      },
    );
  }
}
