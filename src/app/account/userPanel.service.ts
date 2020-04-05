import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class UserPanelService {
  constructor(private http: HttpClient) {
  }
  getUser(id) {
    return this.http.get('http://localhost:3001/user/' + id);
  }
  checkDateInHistoryId(id) {
    return this.http.get('http://localhost:3001/history/' + id);
  }
  getAllUsers() {
    return this.http.get('http://localhost:3001/user/');
  }

}
