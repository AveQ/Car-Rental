import { Component, OnInit } from '@angular/core';
import { DarkModeService } from 'src/app/darkMode.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  constructor(private modeService: DarkModeService) { }

  ngOnInit(): void {
  }

  changeMode(value) {
    return this.modeService.changeMode(value);
  }
}
