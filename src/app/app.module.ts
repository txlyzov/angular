import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PublicImagesComponent } from './pages/public-images';
import { RegisterComponent } from './pages/register';
import { LoginComponent } from './pages/login';
import { UserImagesComponent } from './pages/user-images';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ImageCardComponent } from './componentsF/image-card/image-card.component';
import { DeleteImageModalComponent } from './componentsF/delete-image-modal/delete-image-modal.component';
import { ImageComponent } from './components/image/image.component';
import { SelectComponent } from './components/select/select.component';



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
    SelectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

