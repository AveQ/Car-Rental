import { Component, OnInit } from '@angular/core';
import {DarkModeService} from '../../services/darkMode.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private modeService: DarkModeService) { }

  ngOnInit(): void {
  }
  changeMode(value) {
    return this.modeService.changeMode(value);
  }
}
