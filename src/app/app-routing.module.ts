import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PublicImagesComponent } from './pages/public-images';
import { RegisterComponent } from './pages/register';
import { LoginComponent } from './pages/login';
import { UserImagesComponent } from './pages/user-images';
import { AuthGuard } from './guards/auth.guard';
import { UploadImageComponent } from './pages/upload-image';
import { UpdateImageComponent } from './pages/update-image';

const routes: Routes = [
  { path: '', component: PublicImagesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'images-control',
    component: UserImagesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'new-image',
    component: UploadImageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'update-image/:id',
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
