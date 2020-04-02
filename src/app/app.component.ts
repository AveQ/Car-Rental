import { Component } from '@angular/core';
import { DarkModeService } from './services/darkMode.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PAW';
  constructor(private serviceMode: DarkModeService) {}
  changeMode(value) {
    return this.serviceMode.changeMode(value);
  }
}
