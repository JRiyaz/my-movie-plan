import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Show } from "src/app/interfaces/application";
import { ApplicationService } from "src/app/services/application/application.service";
import { Util } from "../util/util";

export class ApplicationValidator {

    static uniqueAuditoriumName(control: AbstractControl): ValidationErrors | null {
        const service: ApplicationService = new ApplicationService();
        return service.getAuditoriumNames()
            .find(auditorium => auditorium.toLowerCase() == control.value.toLowerCase())
            ? { 'uniqueName': true }
            : null;
    }

    static uniqueMovieName(control: AbstractControl): ValidationErrors | null {
        const service: ApplicationService = new ApplicationService();
        return service.getMovieNames()
            .find(movie => movie.toLowerCase() == control.value.toLowerCase())
            ? { 'uniqueName': true }
            : null;
    }

    public static uniqueFacility(facilities: string[]): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
            return facilities?.find(facility => facility.toLowerCase() == control.value.toLowerCase())
                ? { 'uniqueName': true }
                : null;
        };
    }

    // public static uniqueAuditoriumName(auditoriums: string[]): ValidatorFn {
    //     return (control: AbstractControl): { [key: string]: boolean } | null => {
    //         return auditoriums?.find(auditorium => auditorium.toLowerCase() == control.value.toLowerCase())
    //             ? { 'uniqueName': true }
    //             : null;
    //     };
    // }

    // https://www.infragistics.com/community/blogs/b/infragistics/posts/how-to-create-custom-validators-for-angular-reactive-forms
    public static uniqueShowName(shows: Show[]): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
            return shows?.find(show => show.name.toLowerCase() == control.value.toLowerCase())
                ? { 'uniqueName': true }
                : null;
        };
    }

    public static uniqueShowTime(shows: Show[]): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
            let isNotValid = false;
            for (let i = 0; i < shows?.length; i++)
                if (!ApplicationValidator.isTimeDifferenceValid(shows[i]?.startTime, control.value)) {
                    isNotValid = true;
                    break;
                }
            return isNotValid ? { 'uniqueTime': true } : null;
        };
    }

    private static isTimeDifferenceValid(previous: string, present: string): boolean {
        const p_time = Util.extractTimeAndConvertToNumber(previous);
        const n_time = Util.extractTimeAndConvertToNumber(present);
        const difference = p_time - n_time;
        return difference >= 10000000 || difference <= -10000000 ? true : false;
    }

}
