import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../workspace/user/model/user';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

export interface UserListResponse {
  data: any[];
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseUrl = `${environment.API_BASE_URL}/users`;

  constructor(private http: HttpClient) {
  }

  createUser(payload: User): Observable<any> {
    return this.http.post<any>(this.baseUrl, payload);
  }

  getUsers(
    page: number,
    size: number,
    departments?: string[],
  ): Observable<UserListResponse> {
    return this.http.post<UserListResponse>(
      `${this.baseUrl}/list?page=${page}&size=${size}`,
      {departments: departments ?? []},
    );
  }

  getUserById(id: string) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  updateUser(id: string, data: any) {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

}
