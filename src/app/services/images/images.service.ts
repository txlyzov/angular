import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ImageInterface } from 'src/app/models/table-models/image-interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  private apiServerUrl = environment.apiServerBaseUrl;
  private section = 'images';

  constructor(private http: HttpClient) {}

  public getPublicImages(): Observable<ImageInterface[]> {
    return this.http.get<ImageInterface[]>(
      `${this.apiServerUrl}/${this.section}`,
    );
  }

  public deleteImage(imageId: number): Observable<string> {
    return this.http.delete(`${this.apiServerUrl}/${this.section}/${imageId}`, {
      responseType: 'text',
    });
  }
}
