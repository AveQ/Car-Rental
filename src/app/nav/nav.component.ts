import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  isLanguageMenuOpen = false;
  isMainmenuOpen = false;
  constructor() { }

  ngOnInit(): void {
  }
  openLanguageList() {
    if (this.isLanguageMenuOpen === true) {
      return 'nav-languages--open';
    }
  }
  openMainMenu() {
    if (this.isMainmenuOpen === true) {
      return 'nav-menu--open';
    }
  }
}
