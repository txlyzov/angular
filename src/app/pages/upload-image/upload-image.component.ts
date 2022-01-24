import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
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
    name: 'Test',
    url: 'https://techrocks.ru/wp-content/uploads/2019/02/code.jpg',
    description: 'for test',
  };
  form!: FormGroup;
  // form = new FormGroup({
  //   imageName: new FormControl('', Validators.required),
  //   imageDescription: new FormControl('', Validators.required),
  //   isPrivate: new FormControl('', Validators.required),
  // });
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private imagesService: ImagesService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    // this.form = this.formBuilder.group({
    //   imageName: '',
    //   imageDescription: '',
    //   isPrivate: false,
    // });
    this.form = new FormGroup({
      imageName: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
      ]),
      imageDescription: new FormControl(null, Validators.required),
      isPrivate: new FormControl(null, Validators.required),
    });
    // if (this.tokenStorageService.getObservableToken()) {
    //   this.isLoggedIn = true;
    // }
  }

  submit(): void {
    // console.log(this.form.getRawValue());
    console.log(this.form.value.imageName);
    // this.imagesService.createImage(this.form.getRawValue()).subscribe(
    //   (res) => {
    //     console.log(res);
    //     // this.tokenStorageService.saveToken(res.token);
    //     // this.tokenStorageService.saveLogin(res.login);
    //     // this.isLoginFailed = false;
    //     // this.isLoggedIn = true;
    //     //this.reloadPage();
    //   },
    //   (err: HttpErrorResponse) => {
    //     alert(err.message);
    //   },
    // );
  }

  reloadPage() {
    this.router.navigate(['/']);
  }
}
