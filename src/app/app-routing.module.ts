import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PublicImagesComponent } from './pages/public-images';
import { RegisterComponent } from './pages/register';
import { LoginComponent } from './pages/login';
import { UserImagesComponent } from './pages/user-images';
import { AuthGuard } from './guards/auth.guard';
import { UploadImageComponent } from './pages/upload-image';
import { UpdateImageComponent } from './pages/update-image';
import { routes as r } from './utils/consts/consts';

const routes: Routes = [
  { path: r.PUBLIC_IMAGES.slice(0, -1), component: PublicImagesComponent },
  { path: r.LOGIN.slice(0, -1), component: LoginComponent },
  { path: r.REGISTER.slice(0, -1), component: RegisterComponent },
  {
    path: r.USER_IMAGES.slice(0, -1),
    component: UserImagesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: r.UPLOAD_IMAGE.slice(0, -1),
    component: UploadImageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: r.UPDATE_IMAGE + r.ID.slice(0, -1),
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
