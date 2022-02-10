import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PublicImagesComponent } from './pages/public-images';
import { RegisterComponent } from './pages/register';
import { LoginComponent } from './pages/login';
import { UserImagesComponent } from './pages/user-images';
import { AuthGuard } from './guards/auth.guard';
import { UploadImageComponent } from './pages/upload-image';
import { UpdateImageComponent } from './pages/update-image';
import { routes as r } from './utils/consts/routes';

const {
  PUBLIC_IMAGES,
  LOGIN,
  REGISTER,
  USER_IMAGES,
  UPLOAD_IMAGE,
  UPDATE_IMAGE,
  ID,
} = r;

const routes: Routes = [
  { path: PUBLIC_IMAGES, component: PublicImagesComponent },
  { path: LOGIN, component: LoginComponent },
  { path: REGISTER, component: RegisterComponent },
  {
    path: USER_IMAGES,
    component: UserImagesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: UPLOAD_IMAGE,
    component: UploadImageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: UPDATE_IMAGE + ID,
    component: UpdateImageComponent,
    canActivate: [AuthGuard],
  },

  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
