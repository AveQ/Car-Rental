import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FindVehicleService {
    isOpenCheckComponent: Subject<boolean> = new Subject<false>();
    private carBrand: string;

    constructor() {}

    pushValue(value: boolean) {
        this.isOpenCheckComponent.next(value);
    }
    setBrand(value: string) {
        this.carBrand = value;
    }
    getBrand() {
        return this.carBrand;
    }
}
