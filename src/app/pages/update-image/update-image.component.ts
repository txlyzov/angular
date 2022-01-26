import { Component, OnInit } from '@angular/core';
import { HttpStatusCode } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TokenStorageService } from 'src/app/utils/token-storage/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageInterface } from 'src/app/models/table-models/image-interface';
import { UserImagesService } from 'src/app/services/user-images/user-images.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  templateUrl: 'update-image.component.html',
  styleUrls: ['update-image.component.css'],
})
export class UpdateImageComponent implements OnInit {
  image!: ImageInterface; // = {
  //   url: 'https://media1.giphy.com/media/r31CDVGv8RRRbZPU6r/giphy.gif',
  // };
  form = new FormGroup({
    imageName: new FormControl(null, Validators.required),
    imageDescription: new FormControl(null),
    isPrivate: new FormControl(false),
  });

  constructor(
    //private httpStatusCode: HttpStatusCode,
    private userImageService: UserImagesService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const token = this.tokenStorageService.getToken().getValue();
    const id = this.route.snapshot.paramMap.get('id');

    if (token && id) {
      this.userImageService.getUserImage(token, id).subscribe(
        (res) => {
          this.image = res;
          this.form.get('imageName')!.setValue(this.image.name);
          this.form.get('imageDescription')!.setValue(this.image.description);
          this.form.get('isPrivate')!.setValue(this.image.isPrivate);
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
    const id = this.route.snapshot.paramMap.get('id');

    if (token) {
      if (id) {
        const imageData: ImageInterface = {
          id: parseInt(id),
          name: formData.imageName,
          description: formData.imageDescription,
          isPrivate: formData.isPrivate,
        };
        this.userImageService.updateUserImage(token, imageData).subscribe(
          (res) => {
            console.log(res);
            this.router.navigate(['/images-control']);
          },
          (err: HttpErrorResponse) => {
            alert(err.message);
          },
        );
      } else {
        alert('Link error');
        this.router.navigate(['/image-control']);
      }
    } else {
      this.tokenStorageService.signOut();
      alert('Auth error');
      this.router.navigate(['/login']);
    }
  }
}
