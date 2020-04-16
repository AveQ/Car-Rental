import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserPanelService} from './userPanel.service';
import {Subscription} from 'rxjs';
import {SigninDynamicService} from '../services/signinDynamic.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, OnDestroy {
  name = 'Guest';
  private historyId = '';
  private userId;
  dateToday = new Date().getTime();
  futureRentals = [];
  currentlyRentals = [];
  inactiveRentals = [];
  userSub: Subscription;
  constructor(private router: Router, private userService: UserPanelService, private authService: SigninDynamicService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      if (user) {
        this.name = user.email.split('@')[0];
        this.userId = user.id;
      }
    }, error => {
    }, () => {
    });
    this.getUserHistory(this.userId);
  }

  getUserHistory(id) {
    this.userService.getUser(id).subscribe(
      data => {
        for (const element in data) {
          if (data.hasOwnProperty(element)) {
            if (element === 'historyId') {
              this.historyId = data[element];
            }
          }
        }
      },
      error => {
      },
      () => {
        if (this.historyId !== '') {
          this.assignToCorrectArray();
        }
      }
    );
  }

  assignToCorrectArray() {
    const tempArray = this.historyId.split(' ');
    let from;
    let to;
    for (const element of tempArray) {
      this.userService.checkDateInHistoryId(element).subscribe(
        hist => {
          const obj = hist;
          for (const value in hist) {
            if (hist.hasOwnProperty(value)) {
              if (value === 'from') {
                from = new Date(hist[value]).getTime();
              }
              if (value === 'to') {
                to = new Date(hist[value]).getTime();
              }
            }
          }
          if ((from < this.dateToday ) && (to < this.dateToday)) {
            this.inactiveRentals.push(obj);
          } else if ((from > this.dateToday ) && (to > this.dateToday)) {
            this.futureRentals.push(obj);
          } else {
            this.currentlyRentals.push(obj);
          }

        },
        error => {},
        () => {

        }
      );
    }
  }
  deleteHistory(history) {
    // delete from history
    this.userService.deleteHistory(history._id);
    // delete from user
    this.userService.patchUserHistory(history.userId, history._id);
    // delete from vehicle
    this.userService.patchVehicleHistory(history.vehicleId, history._id);
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
