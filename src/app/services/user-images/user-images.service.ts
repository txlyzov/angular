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

  public getUserImages(token: string): Observable<ImageInterface[]> {
    return this.http.get<ImageInterface[]>(
      `${this.apiServerUrl}/${this.section}`,
      {
        headers: new HttpHeaders().set('AuthToken', token),
      },
    );
  }
}