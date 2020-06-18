import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DarkModeService} from '../services/darkMode.service';
import {SigninDynamicService} from '../services/signinDynamic.service';
import {Subscription} from 'rxjs';
import {ScrollIntoService} from '../services/scrollInto.service';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

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
  private isAdministrator = false;
  nameOfUser = 'GUEST';
  typeOfUser = 'GUEST';
  @ViewChild('ttest') ttest;

  constructor(private modeService: DarkModeService,
              private signService: SigninDynamicService,
              private scrollService: ScrollIntoService,
              private router: Router,
              private translate: TranslateService) {
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.signService.subject.subscribe(value => {
      this.isSigninPanelOpen = value;
    });
    this.userSub = this.signService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      this.isSigninPanelOpen = false;
      this.isMainmenuOpen = false;
      this.nameOfUser = user ? user.email.split('@')[0].toUpperCase() : 'GUEST';
      this.typeOfUser = user ? user.isAdmin : 'GUEST';
      if (user && user.isAdmin === 'ADMIN') {
        this.isAdministrator = true;
      } else {
        this.isAdministrator = false;
      }
    });
  }

  openLanguageList() {
    if (this.isLanguageMenuOpen === true) {
      return 'nav-languages--open';
    }
  }

  openMainMenu() {
    const obj = {
      'nav-menu--open': this.isMainmenuOpen,
      'nav-menu--darkmode': this.modeService.isDarkMode
    };
    return obj;
  }

  closeMainMenu() {
    this.isMainmenuOpen = !this.isMainmenuOpen;
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

  changeLanguage(lang) {
    this.translate.use(lang);
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

  isUserAnAdmin() {
    return (this.isAdministrator && this.isAuthenticated);
  }

  ngOnDestroy(): void {
    this.signService.subject.unsubscribe();
    this.userSub.unsubscribe();
  }

  scrollInto(where, info) {
    this.router.navigate(['/'], {queryParams: {action: info}}).finally(() => {
      this.scrollService.changeSubject(where);
    });
  }
}
