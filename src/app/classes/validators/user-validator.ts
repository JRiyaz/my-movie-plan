import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Token } from "src/app/interfaces/application";
import { AuthService } from "src/app/services/auth/auth.service";

@Injectable({
    providedIn: 'root'
})
export class UserValidator {

    constructor(private _service: AuthService) {
    }

    static required(control: AbstractControl): { [key: string]: boolean } | null {
        return control.value.length <= 0 ? { 'required': true } : null;
    }

    get uniqueEmail(): AsyncValidatorFn | AsyncValidatorFn[] | null | undefined {
        return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
            return this._service.checkUniqueness(control.value)
                .pipe(
                    map((res: Token) => {
                        console.log(res.token);
                        return res.token ? { unique: true } : null;
                    })
                );
        };
    }

    get uniqueMobile(): AsyncValidatorFn | AsyncValidatorFn[] | null | undefined {
        return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
            return this._service.checkUniqueness(control.value)
                .pipe(
                    map((res: Token) => {
                        console.log(res.token);
                        return res.token ? { unique: true } : null;
                    })
                );
        };
    }

    get isEmailOrMobilePresent(): AsyncValidatorFn | AsyncValidatorFn[] | null | undefined {
        return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
            return this._service.checkUniqueness(control.value)
                .pipe(
                    map((res: Token) => {
                        console.log(res.token);
                        return res.token ? null : { present: true };
                    })
                );
        };
    }


    // static uniqueEmail(control: AbstractControl): Promise<ValidationErrors | null> | null {
    //     const service = new UserService();
    //     return new Promise((resolve, reject) => {
    //         setTimeout(() => {
    //             return service.isEmailExists(control.value) ? resolve({ unique: true }) : resolve(null);
    //         }, 3000);
    //     });
    // }
}
