import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class UserPanelService {
  constructor(private http: HttpClient) {
  }
  getUser(id) {
    return this.http.get('https://localhost:3001/user/' + id);
  }
  checkDateInHistoryId(id) {
    return this.http.get('https://localhost:3001/history/' + id);
  }
  getAllUsers() {
    return this.http.get('https://localhost:3001/user/');
  }
  patchUserHistory(idUser, history) {
    let userHistory;
    this.http.get('https://localhost:3001/user/' + idUser).subscribe(
      data => {
        for (const element in data) {
          if (data.hasOwnProperty(element)) {
            if (element === 'historyId') {
                userHistory = data[element];
            }
          }
        }
      },
      error => {
      },
      () => {
        if (userHistory.includes(' ') ){
          if (userHistory.split(history + ' ')[1]) {
            userHistory = userHistory.split(history + ' ')[0].concat(userHistory.split(history + ' ')[1]);
          } else {
            userHistory = userHistory.split(history)[0];
          }
        } else {
          userHistory = '';
        }
        this.http.patch(('https://localhost:3001/user/' + idUser), [{'propName': 'historyId', 'value': userHistory}]).subscribe();
      }
    );
  }
  patchVehicleHistory(idVehicle, history) {
    let vehHistory;
    this.http.get('https://localhost:3001/vehicles/' + idVehicle).subscribe(
      data => {
        for (const element in data) {
          if (data.hasOwnProperty(element)) {
            if (element === 'historyId') {
              vehHistory = data[element];
            }
          }
        }
      },
      error => {
      },
      () => {
        if (vehHistory.includes(' ') ){
          if (vehHistory.split(history + ' ')[1]){
            vehHistory = vehHistory.split(history + ' ')[0].concat(vehHistory.split(history + ' ')[1]);
          } else {
            vehHistory = vehHistory.split(history)[0];
          }
        } else {
          vehHistory = '';
        }
        this.http.patch(('https://localhost:3001/vehicles/' + idVehicle), [{'propName': 'historyId', 'value': vehHistory}]).subscribe();
      }
    );
  }
  deleteHistory(idHistory) {
    this.http.delete('https://localhost:3001/history/' + idHistory).subscribe();
  }
  deleteUser(id) {
    return this.http.delete('https://localhost:3001/user/' + id);
  }

}
