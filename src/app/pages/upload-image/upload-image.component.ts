import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TokenStorageService } from 'src/app/utils/token-storage/token-storage.service';
import { Router } from '@angular/router';
import { ImageInterface } from 'src/app/models/table-models/image-interface';
import { UserImagesService } from 'src/app/services/user-images/user-images.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  templateUrl: 'upload-image.component.html',
  styleUrls: ['upload-image.component.css'],
})
export class UploadImageComponent {
  image: ImageInterface = {
    url: 'https://media1.giphy.com/media/r31CDVGv8RRRbZPU6r/giphy.gif',
  };
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

  // get imageName() {
  //   return this.form.get('imageName');
  // }
  // get imageUrl() {
  //   return this.form.get('imageUrl');
  // }

  previewName(name: string) {
    this.image.name = name;
  }

  previewLink(link: string) {
    this.image.url = link;
  }

  previewDescription(description: string) {
    this.image.description = description;
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

    if (token) {
      this.userImageService.createImage(imageData, token).subscribe(
        () => {
          this.router.navigate(['/images-control']);
        },
        (err: HttpErrorResponse) => {
          alert(err.message);
        },
      );
    } else {
      this.tokenStorageService.signOut();
      alert('Auth error');
      this.router.navigate(['/login']);
    }
  }
}
