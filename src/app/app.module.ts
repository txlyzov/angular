import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PublicImagesComponent } from './public-images';
import { RegisterComponent } from './register';
import { LoginComponent } from './login';
import { TestComponent } from './test/test.component';
import { UserImagesComponent } from './user-images';



@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    PublicImagesComponent,
    UserImagesComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

