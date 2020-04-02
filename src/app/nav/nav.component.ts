import {Component, OnDestroy, OnInit} from '@angular/core';
import { DarkModeService } from '../services/darkMode.service';
import { SigninDynamicService } from '../services/signinDynamic.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAuthenticated = false;
  private isLanguageMenuOpen = false;
  private isMainmenuOpen = false;
  private isSigninPanelOpen = false;
  nameOfUser = 'GUEST';
  typeOfUser = 'GUEST';
  constructor(private modeService: DarkModeService, private signService: SigninDynamicService) { }

  ngOnInit(): void {
    this.signService.subject.subscribe(value => {
      this.isSigninPanelOpen = value;
    });
    this.userSub = this.signService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      this.isSigninPanelOpen = false;
      this.isMainmenuOpen = false;
      this.nameOfUser = user ? user.email.split('@')[0].toUpperCase() : 'GUEST';
      this.typeOfUser = user ? 'USER' : 'GUEST';
    });
  }
  openLanguageList() {

    if (this.isLanguageMenuOpen === true) {
      return 'nav-languages--open';
    }
  }
  openMainMenu() {
    const obj = {
      'nav-menu--open': this.isMainmenuOpen ? true : false,
      'nav-menu--darkmode': this.modeService.isDarkMode ? true : false
    };
    return obj;
  }
  signStatus() {
    if (!this.isAuthenticated) {
      this.isSigninPanelOpen = !this.isSigninPanelOpen;
    } else {
      this.isSigninPanelOpen = false;
    }
  }
  languageStatus() {
    this.isLanguageMenuOpen = !this.isLanguageMenuOpen;
  }
  menuStatus() {
    this.isMainmenuOpen = !this.isMainmenuOpen;
  }
  changeMode(value: string) {
    return this.modeService.changeMode(value);
  }
  otherMode(value) {
    this.modeService.otherMode(value);
  }
  isSigninTrue() {
    return this.isSigninPanelOpen;
  }
  logout() {
    this.signService.logout();
  }
  ngOnDestroy(): void {
    this.signService.subject.unsubscribe();
    this.userSub.unsubscribe();
  }
}
