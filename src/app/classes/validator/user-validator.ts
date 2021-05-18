import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { UserService } from "src/app/services/user/user.service";

export class UserValidator {

    static required(control: AbstractControl): { [key: string]: boolean } | null {
        return control.value.length <= 0 ? { 'required': true } : null;
    }

    static get uniqueEmail(): AsyncValidatorFn | AsyncValidatorFn[] | null | undefined {
        return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
            const service = new UserService();
            return service.isEmailExists(control.value).pipe(
                map((result: boolean) => result ? { 'unique': true } : null)
            );
        };
    }

    static get uniqueMobile(): AsyncValidatorFn | AsyncValidatorFn[] | null | undefined {
        return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
            const service = new UserService();
            return service.isMobileExists(control.value).pipe(
                map((result: boolean) => result ? null : { 'unique': true })
            );
        };
    }

    static get isEmailOrMobilePresent(): AsyncValidatorFn | AsyncValidatorFn[] | null | undefined {
        return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
            const service = new UserService();
            return service.isEmailOrMobileExists(control.value).pipe(
                map((result: boolean) => result ? null : { 'present': true })
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
