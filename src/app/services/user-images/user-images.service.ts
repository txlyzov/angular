import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ImageInterface } from 'src/app/models/table-models/image-interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserImagesService {
  private apiServerUrl = environment.apiServerBaseUrl;
  private section = 'user-images';

  constructor(private http: HttpClient) {}

  createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', 'Basic ' + btoa('username:password'));
  }

  public createImage(
    image: ImageInterface,
    token: string,
  ): Observable<ImageInterface> {
    return this.http.post(`${this.apiServerUrl}/${this.section}`, image, {
      headers: new HttpHeaders().set('AuthToken', token),
    });
  }

  public getUserImages(token: string): Observable<ImageInterface[]> {
    return this.http.get<ImageInterface[]>(
      `${this.apiServerUrl}/${this.section}`,
      {
        headers: new HttpHeaders().set('AuthToken', token),
      },
    );
  }

  public getUserImage(
    token: string,
    imageId: string,
  ): Observable<ImageInterface> {
    return this.http.get<ImageInterface>(
      `${this.apiServerUrl}/${this.section}/${imageId}`,
      {
        headers: new HttpHeaders().set('AuthToken', token),
      },
    );
  }

  public updateUserImage(
    token: string,
    image: ImageInterface,
  ): Observable<string> {
    return this.http.put(`${this.apiServerUrl}/${this.section}`, image, {
      headers: new HttpHeaders().set('AuthToken', token),
      responseType: 'text',
    });
  }
}
