import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ImageInterface } from 'src/app/models/image-interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  private apiServerUrl = environment.apiServerBaseUrl;

  constructor(private http: HttpClient) {}

  public getImages(): Observable<ImageInterface[]> {
    const uri = 'images';

    return this.http.get<ImageInterface[]>(`${this.apiServerUrl}/${uri}`);
  }

  public deleteImage(imageId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServerUrl}/images/delete/${imageId}`,
    );
  }
}
