import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.scss']
})
export class EditUsersComponent implements OnInit {
  users = [];
  isOpenHistory: boolean = false;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.http.get('http://localhost:3001/user/').subscribe(
      data => {
        for (const element in data) {
            if (data.hasOwnProperty(element)) {
              this.users.push(data[element]);
            }
        }
      }
    );
  }

  openHistory(value: HTMLElement) {
    if (value.classList.value === 'row userHistory userHistory--open') {
      value.classList.remove('userHistory--open');
    } else {
      value.classList.add('userHistory--open');
    }
  }
}
