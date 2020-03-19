import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SigninDynamicService {
    public subject: Subject<boolean>;
    constructor() {this.subject = new Subject<boolean>(); }

    pushValue(value: boolean) {
        this.subject.next(value);
    }

}
