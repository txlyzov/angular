import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TokenStorageService } from 'src/app/utils/token-storage/token-storage.service';
import { Router } from '@angular/router';
import { ImageInterface } from 'src/app/models/table-models/image-interface';
import { ImagesService } from 'src/app/services/images/images.service';

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
    private imagesService: ImagesService,
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
    console.log(this.form.value);
  }

  reloadPage() {
    this.router.navigate(['/']);
  }
}
