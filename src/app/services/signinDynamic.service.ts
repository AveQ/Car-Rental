import { Injectable, OnInit } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {User} from '../auth/user.model';
import {tap} from 'rxjs/operators';

export interface AuthResponseData  {
  id: string;
  email: string;
  token: string;
  expirationDate: string;
  isAdmin: string;
  historyId: string;
}

@Injectable({
    providedIn: 'root'
})
export class SigninDynamicService {
    public subject: Subject<boolean>;
    user = new BehaviorSubject<User>(null);

    constructor(private http: HttpClient) {this.subject = new Subject<boolean>(); }

    autoLogin() {
      const userData: {
        id: string,
        email: string,
        token: string,
        tokenExpirationDate: string,
        isAdmin: string,
        historyId: string
      } = JSON.parse(localStorage.getItem('userData'));
      if (!userData) {
        return;
      }
      const loadedUser = new User(userData.id, userData.email, userData.token,
        new Date(userData.tokenExpirationDate), userData.isAdmin, userData.historyId);

      if (loadedUser.myToken) {
        this.user.next(loadedUser);
      }
    }
    pushValue(value: boolean) {
        this.subject.next(value);
    }
    signup(value) {
      return this.http.post<AuthResponseData>('http://localhost:3001/user/signup', value);
    }
    login(value) {
      return this.http.post<AuthResponseData>('http://localhost:3001/user/login', value).pipe(
        tap(resData => {
          this.handleAuthentication(resData.id, resData.email, resData.token, resData.expirationDate, resData.isAdmin, resData.historyId);
        })
      );
    }
    logout() {
      this.user.next(null);
      localStorage.clear();
    }
    private handleAuthentication(id, email, token, expirationDate, isAdmin, historyId) {
      const expDate = new Date(new Date().getTime() + +expirationDate * 1000); // one hour expiration
      const user = new User(id, email, token, expDate, isAdmin, historyId);
      this.user.next(user);
      localStorage.setItem('userData', JSON.stringify(user));
    }

}
