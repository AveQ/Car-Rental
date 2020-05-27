import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DarkModeService} from '../services/darkMode.service';
import {Router} from '@angular/router';
import {ScrollIntoService} from '../services/scrollInto.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(
    private modeSerive: DarkModeService,
    private router: Router,
    private scrollService: ScrollIntoService) {
  }

  ngOnInit(): void {
    this.scrollService.scrollSubject.subscribe(value => {
      switch (value) {
        case 'aboutUs':
          document.getElementById('aboutUs').scrollIntoView({behavior: 'smooth'});
          break;
        case 'localisation':
          document.getElementById('localisation').scrollIntoView({behavior: 'smooth'});
          break;
      }
    });
  }

  changeMode(value) {
    return this.modeSerive.changeMode(value);
  }


}
