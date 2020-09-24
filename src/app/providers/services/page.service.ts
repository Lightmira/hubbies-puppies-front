import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { User } from '../../models/User';

@Injectable({ providedIn: 'root' })
export class AccountService {
  public user: Observable<User>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  add(params) {
    return this.http.post(`${environment.apiUrl}/pages`, params)
      .pipe(map(x => {
        const page = { ...params };

        return x;
      }))
  }

}
