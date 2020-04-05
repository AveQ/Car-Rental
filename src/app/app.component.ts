import {Component, OnInit} from '@angular/core';
import { DarkModeService } from './services/darkMode.service';
import {SigninDynamicService} from './services/signinDynamic.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'PAW';
  constructor(private serviceMode: DarkModeService, private authService: SigninDynamicService) {}
  changeMode(value) {
    return this.serviceMode.changeMode(value);
  }

  ngOnInit(): void {
    this.authService.autoLogin();
  }
}
