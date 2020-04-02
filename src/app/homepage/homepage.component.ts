import { Component, OnInit } from '@angular/core';
import { DarkModeService } from '../services/darkMode.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(private modeSerive: DarkModeService) { }

  ngOnInit(): void {
  }

  changeMode(value) {
    return this.modeSerive.changeMode(value);
  }

}
