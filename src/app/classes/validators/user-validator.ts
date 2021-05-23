import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable, of } from "rxjs";
import { debounceTime, distinctUntilChanged, map, switchMap } from "rxjs/operators";
import { AuthService } from "src/app/services/auth/auth.service";

@Injectable({
    providedIn: 'root'
})
export class UserValidator {

    constructor(private service: AuthService) {
    }

    static required(control: AbstractControl): { [key: string]: boolean } | null {
        return control.value.length <= 0 ? { 'required': true } : null;
    }

    get uniqueEmail(): AsyncValidatorFn | AsyncValidatorFn[] | null | undefined {
        return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
            return of<string>(control.value).pipe(
                debounceTime(500),
                distinctUntilChanged(),
                switchMap(value => {
                    return this.service.checkUniqueness(value).pipe(
                        map((result: string) => result ? { 'unique': true } : null)
                    );
                })
            );
        };
    }

    get uniqueMobile(): AsyncValidatorFn | AsyncValidatorFn[] | null | undefined {
        return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
            return of<string>(control.value).pipe(
                debounceTime(500),
                distinctUntilChanged(),
                switchMap(value => {
                    return this.service.checkUniqueness(value).pipe(
                        map((result: string) => result ? null : { 'unique': true })
                    );
                })
            );
        };
    }

    get isEmailOrMobilePresent(): AsyncValidatorFn | AsyncValidatorFn[] | null | undefined {
        return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
            return of<string>(control.value).pipe(
                debounceTime(500),
                distinctUntilChanged(),
                switchMap(value => {
                    return this.service.checkUniqueness(value).pipe(
                        map((result: string) => result ? null : { 'present': true })
                    );
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
