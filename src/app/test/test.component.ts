import {Component, OnInit, Renderer2, ViewChild} from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor(private rend: Renderer2) { }
  public initialCount = 100;
  private addClass = true;
  changeValues() {
    if (this.initialCount === 100) {
      this.initialCount = this.initialCount + 1;
    } else {
      this.initialCount = this.initialCount - 1;
    }
  }
  ngOnInit(): void {
  }
  setClass() {
    if (this.addClass) {
      return '.like-button--active';
    }
  }
}
