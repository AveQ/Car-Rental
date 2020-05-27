import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modalLogin.component.html',
  styleUrls: ['./modalLogin.component.scss']
})
export class ModalLoginComponent {
  @Input('text') text = 'error';
}
