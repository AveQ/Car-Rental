import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SigninDynamicService } from './signinDynamic.service';


@Component({
  selector: 'app-signin-dynamic',
  templateUrl: './signin-dynamic.component.html',
  styleUrls: ['./signin-dynamic.component.scss']
})
export class SigninDynamicComponent implements OnInit {

  signinForm: FormGroup;
  focusonEmail: boolean = false;
  focusonPassword: boolean = false;
  dataInvalid: boolean = false;
  constructor(private ele: ElementRef, private ren: Renderer2, private siginSer: SigninDynamicService) { }

  ngOnInit(): void {
    this.signinForm = new FormGroup (
      {
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, Validators.required)
      }
    );
    }
  onSubmit() {
    console.log(this.signinForm);
  }
  onFocus(name: string) {
    if ((name === 'password' && this.focusonPassword === true ) ||
      (name === 'password' && this.focusonPassword === false &&
      this.signinForm.get('password').value !== null && this.signinForm.get('password').value !== '')
      ) {
        return 'form__label--inputfocus'; // return class with animation for label in form
    } else if ((name === 'email' && this.focusonEmail === true ) ||
      (name === 'email' && this.focusonEmail === false &&
      this.signinForm.get('email').value !== null && this.signinForm.get('email').value !== '')
      ) {
        return 'form__label--inputfocus'; // return class with animation for label in form
    } else {
        return 'form__label';
    }
  }

  closeComponent() {
    this.siginSer.pushValue(false);
    
  }

}
