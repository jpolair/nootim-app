import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public getUsers() {
    return this.http.get(this.baseUrl + 'api/users');
  }

  public getMe() {
    return this.http.get(this.baseUrl + 'api/users/me');
  }

  public getUserById(id: string) {
    return this.http.get(this.baseUrl + 'api/users/' + id);
  }
}
