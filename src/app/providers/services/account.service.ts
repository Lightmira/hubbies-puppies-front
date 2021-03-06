import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { User } from '../../models/User';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login(email, password) {
    return this.http.post<User>(
      `${environment.apiUrl}/login_check`, {
        'username': email,
        'password': password
      })
      .pipe(map(user => {
        console.dir(user);
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/account/login']);
  }

  register(user: User) {
    return this.http.post(`${environment.apiUrl}/register`, user);
  }

  getAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  getByUuid(uuid: string) {
    return this.http.get<User>(`${environment.apiUrl}/users/${uuid}`);
  }

  update(uuid, params) {
    return this.http.put(`${environment.apiUrl}/users/${uuid}`, params)
      .pipe(map(x => {
        // update stored user if the logged in user updated their own record
        if (uuid == this.userValue._uuid) {
          // update local storage
          const user = { ...this.userValue, ...params };
          localStorage.setItem('user', JSON.stringify(user));

          // publish updated user to subscribers
          this.userSubject.next(user);
        }
        return x;
      }));
  }

  delete(uuid: string) {
    return this.http.delete(`${environment.apiUrl}/users/${uuid}`)
      .pipe(map(x => {
        // auto logout if the logged in user deleted their own record
        if (uuid == this.userValue._uuid) {
          this.logout();
        }
        return x;
      }));
  }
}
