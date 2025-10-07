import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';


const AUTH_INFO = '/employees/me';
const LOGIN = '/auth/login';
const LOGOUT = '/auth/logout';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  public authInfo(): Observable<any> {
    return this.http.get(AUTH_INFO);
  }

  public login(userCredential: any): Observable<any> {
    return this.http.post<HttpResponse<Object>>(LOGIN, userCredential, {observe: 'response'});
  }

  public logout() {
    return this.http.post(LOGOUT, null);
  }
}
