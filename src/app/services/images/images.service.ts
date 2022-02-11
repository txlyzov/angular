import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ResponseWithMetaInterface } from 'src/app/models/response-with-meta-interface';

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  private apiServerUrl = environment.apiServerBaseUrl;
  private section = 'images';

  constructor(private http: HttpClient) {}

  public getPublicImages(
    pageNumber: number,
    limitNumber: number,
  ): Observable<ResponseWithMetaInterface> {
    return this.http.get<ResponseWithMetaInterface>(
      `${this.apiServerUrl}/${this.section}?limit=${limitNumber}&page=${pageNumber}`,
    );
  }
}
