import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInterface } from 'src/app/models/table-models/user-interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginInfoInterface } from 'src/app/models/login-info-interface';
import { JWTResponseInterface } from 'src/app/models/jwt-response-interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiServerUrl = environment.apiServerBaseUrl;
  private section = 'users';

  constructor(private http: HttpClient) {}
  public registerUser(user: UserInterface): Observable<string> {
    return this.http.post(
      `${this.apiServerUrl}/${this.section}/sign-up`,
      user,
      {
        responseType: 'text',
      },
    );
  }

  public loginUser(
    loginInfoInterface: LoginInfoInterface,
  ): Observable<JWTResponseInterface> {
    return this.http.post<JWTResponseInterface>(
      `${this.apiServerUrl}/${this.section}/login`,
      loginInfoInterface,
    );
  }

  public changeUsersPassword(imageId: number): Observable<string> {
    return this.http.delete(`${this.apiServerUrl}/${this.section}/${imageId}`, {
      responseType: 'text',
    });
  }
}
