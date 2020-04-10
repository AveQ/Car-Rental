import { Component, OnInit } from '@angular/core';
import { DarkModeService } from '../services/darkMode.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(
    private modeSerive: DarkModeService,
    private router: Router) { }

  ngOnInit(): void {
  }

  changeMode(value) {
    return this.modeSerive.changeMode(value);
  }
  goToRent() {
    this.router.navigate(['vehicles']);
  }

}
