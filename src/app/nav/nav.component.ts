import { Component, OnInit } from '@angular/core';
import { DarkModeService } from '../darkMode.service';
import { SigninDynamicService } from '../auth/signin-dynamic/signinDynamic.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  private isLanguageMenuOpen = false;
  private isMainmenuOpen = false;
  private isSigninPanelOpen = false;

  constructor(private modeService: DarkModeService, private signService: SigninDynamicService) { }

  ngOnInit(): void {
    this.signService.subject.subscribe(value => {
      this.isSigninPanelOpen = value;
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
    this.isSigninPanelOpen = !this.isSigninPanelOpen;
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
  otherMode(value){
    this.modeService.otherMode(value);
  }
  isSigninTrue(){
    return this.isSigninPanelOpen;
  }
}
