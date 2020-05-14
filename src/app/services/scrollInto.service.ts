import {Injectable} from '@angular/core';
import {HomepageComponent} from '../homepage/homepage.component';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollIntoService {
  scrollSubject = new Subject<string>();
  changeSubject(value) {
    this.scrollSubject.next(value);
  }
}
