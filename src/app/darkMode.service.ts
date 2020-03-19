import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DarkModeService {


    isDarkMode: boolean = false;

    constructor() {}

    changeMode(value: string) {
        if (this.isDarkMode) {
            switch (value) {
                case 'navbar':
                    return 'nav--darkmode';
                case 'element':
                    return 'nav-element--darkmode';
                case 'link':
                    return 'nav-link--darkmode';
                case 'underImage':
                    return 'underImage--darkMode';
                case 'underImageBorder':
                    return 'constForOffer--darkMode';
                }
    }
    }
    otherMode(value) {
        this.isDarkMode = value;
    }
}
