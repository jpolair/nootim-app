import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

export interface UserCredentials {
  userId: string;
  clubId: string[];
  token: string;
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  public login(email: string, password: string) {
    return this.http.post(this.baseUrl + 'api/authenticate', { email, password })
      .pipe(
        tap((user: UserCredentials) => {
          if (user.success) {
            localStorage.setItem('nootim-userId', user.userId);
            localStorage.setItem('nootim-token', user.token);
            localStorage.setItem('nootim-clubId', user.clubId[0]);
            localStorage.setItem('nootim-success', JSON.stringify(user.success));
          }
          if (user && !user.success) {
            localStorage.setItem('nootim-success', JSON.stringify(user.success));
          }
        }),
        //catchError(err => new Observable(err)),
      );
  }

  isLogged() {
    if (typeof localStorage.getItem('nootim-token') === 'string' && localStorage.getItem('nootim-success') === 'true') {
      return true;
    }
  }

  public logout() {
    localStorage.removeItem('nootim-token');
    localStorage.removeItem('nootim-userId');
    localStorage.removeItem('nootim-clubId');
    localStorage.removeItem('nootim-success');
  }
}
