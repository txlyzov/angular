import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ImageFromDatabaseInterface } from 'src/app/models/table-models/image-interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  private apiServerUrl = environment.apiServerBaseUrl;
  private section = 'images';

  constructor(private http: HttpClient) {}

  public getPublicImages(): Observable<ImageFromDatabaseInterface[]> {
    return this.http.get<ImageFromDatabaseInterface[]>(
      `${this.apiServerUrl}/${this.section}`,
    );
  }
}
