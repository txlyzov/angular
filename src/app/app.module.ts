import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PublicImagesComponent } from './pages/public-images';
import { RegisterComponent } from './pages/register';
import { LoginComponent } from './pages/login';
import { UserImagesComponent } from './pages/user-images';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ImageCardComponent } from './components/image-card/image-card.component';
import { DeleteImageModalComponent } from './components/delete-image-modal/delete-image-modal.component';
import { ImageComponent } from './components/image/image.component';
import { SelectComponent } from './components/select/select.component';
import { GalleryElementsBarComponent } from './components/gallery-elements-bar/gallery-elements-bar.component';



@NgModule({
  declarations: [
    AppComponent,
    PublicImagesComponent,
    UserImagesComponent,
    RegisterComponent,
    LoginComponent,
    PaginationComponent,
    ImageCardComponent, //broken
    DeleteImageModalComponent,//broken
    ImageComponent,
    SelectComponent,
    GalleryElementsBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

