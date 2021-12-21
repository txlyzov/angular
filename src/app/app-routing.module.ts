import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { PublicImagesComponent } from './public-images';
import { RegisterComponent } from './register';
import { LoginComponent } from './login';
import { UserImagesComponent } from './user-images';

const routes: Routes = [
  { path: '', component: PublicImagesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'images-control', component: UserImagesComponent},

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
//export const AppRoutingModule = RouterModule.forRoot(routes);