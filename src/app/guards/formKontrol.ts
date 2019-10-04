import { CanDeactivate } from "@angular/router";
import { Observable } from "rxjs/Observable";
 
export interface IFormKontrol {
    FormKontrol(): boolean | Observable<boolean>;
}
 
export class FormKontrol implements CanDeactivate<IFormKontrol> {
    canDeactivate(component: IFormKontrol): boolean | Observable<boolean> {
        if (!component.FormKontrol()) {
            return false;
        }
        return true;
    }
}