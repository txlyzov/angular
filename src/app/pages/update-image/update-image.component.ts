import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TokenStorageService } from 'src/app/utils/token-storage/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageFromDatabaseInterface } from 'src/app/models/table-models/image-interface';
import { UserImagesService } from 'src/app/services/user-images/user-images.service';
import { HttpErrorResponse } from '@angular/common/http';
import { routes } from 'src/app/utils/consts/consts';

@Component({
  templateUrl: 'update-image.component.html',
  styleUrls: ['update-image.component.css'],
})
export class UpdateImageComponent implements OnInit {
  image!: ImageFromDatabaseInterface;
  form = new FormGroup({
    imageName: new FormControl(null, Validators.required),
    imageDescription: new FormControl(null),
    isPrivate: new FormControl(false),
  });

  constructor(
    private userImageService: UserImagesService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  get imageName() {
    return this.form.get('imageName');
  }

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
      this.router.navigate([routes.LOGIN]);
    }
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

  submit(): void {
    const token = this.tokenStorageService.getToken().getValue();
    const formData = this.form.value;
    const id = this.route.snapshot.paramMap.get('id');

    if (!token) {
      this.tokenStorageService.signOut();
      alert('Auth error');
      this.router.navigate([routes.LOGIN]);

      return;
    }

    if (!id) {
      alert('Link error');
      this.router.navigate([routes.USER_IMAGES]);

      return;
    }

    this.image.id = parseInt(id);
    this.image.name = formData.imageName;
    this.image.description = formData.imageDescription;
    this.image.isPrivate = formData.isPrivate;
    this.userImageService.updateUserImage(token, this.image).subscribe(
      () => {
        this.router.navigate([routes.USER_IMAGES]);
      },
      (err: HttpErrorResponse) => {
        alert(err.message);
      },
    );
  }
}
