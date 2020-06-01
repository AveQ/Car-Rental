import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserPanelService} from '../../account/userPanel.service';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.scss']
})
export class EditUsersComponent implements OnInit {
  users = [];
  historyArray = [];
  isOpenHistory: boolean = false;
  loadingData = true;
  constructor(private http: HttpClient, private userPanel: UserPanelService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.loadingData = true;
    this.userPanel.getAllUsers().subscribe(
      data => {
        for (const element in data) {
            if (data.hasOwnProperty(element)) {
              this.users.push(data[element]);
            }
        }
      },
      error => {
      },
      () => {
        this.addHistoryToUser();
        this.loadingData = false;
      }
    );
  }
  addHistoryToUser() {
    let i = 0;
    for (const ind of this.users) {
      this.checkHistory(ind.historyId, i, ind.email);
      i++;
    }
  }
  openHistory(value: HTMLElement, id) {
    if (value.classList.value === 'row userHistory userHistory--open') {
      value.classList.remove('userHistory--open');
    } else {
      value.classList.add('userHistory--open');
    }
  }
  checkHistory(id, i, name) {
    let histArray = [];
    const tempArray = id.split(' ');
    for (const index of tempArray) {
      this.userPanel.checkDateInHistoryId(index).subscribe(history => {
        if (Object.values(history).includes(name)) {
          histArray.push(history);
        }
      },
        error => {},
        () => {
          Object.assign(this.users[i], {"history": histArray});
          this.historyArray = histArray;
        });
    }
  }
  deleteUser(userId) {
    this.userPanel.deleteUser(userId).subscribe();
  }
}
