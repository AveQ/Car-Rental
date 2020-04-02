import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {User} from '../auth/user.model';
import {tap} from 'rxjs/operators';

export interface AuthResponseData  {
  id: string;
  email: string;
  token: string;
  expirationDate: string;
}

@Injectable({
    providedIn: 'root'
})
export class SigninDynamicService {
    public subject: Subject<boolean>;
    user = new Subject<User>();

    constructor(private http: HttpClient) {this.subject = new Subject<boolean>(); }

    pushValue(value: boolean) {
        this.subject.next(value);
    }
    signup(value) {
      return this.http.post<AuthResponseData>('http://localhost:3001/user/signup', value);
    }
    login(value) {
      return this.http.post<AuthResponseData>('http://localhost:3001/user/login', value).pipe(
        tap(resData => {
          this.handleAuthentication(resData.id, resData.email, resData.token, resData.expirationDate);
        })
      );
    }
    logout() {
      this.user.next(null);
    }
    private handleAuthentication(id, email, token, expirationDate) {
      const expDate = new Date(new Date().getTime() + +expirationDate * 1000); // one hour expiration
      const user = new User(id, email, token, expDate);
      this.user.next(user);
    }

}
