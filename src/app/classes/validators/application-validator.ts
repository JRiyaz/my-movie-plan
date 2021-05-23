import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Show } from "src/app/interfaces/application";
import { GlobalService } from "src/app/services/global/global.service";
import { Util } from "../util/util";

@Injectable({
    providedIn: 'root'
})
export class ApplicationValidator {

    constructor(private service: GlobalService) { }

    uniqueAuditoriumName(control: AbstractControl): ValidationErrors | null {
        return this.service.getAuditoriumNames()
            .find(auditorium => auditorium.toLowerCase() == control.value.toLowerCase())
            ? { 'uniqueName': true }
            : null;
        return null;
    }

    uniqueMovieName(control: AbstractControl): ValidationErrors | null {
        return this.service.getMovieNames()
            .find(movie => movie.toLowerCase() == control.value.toLowerCase())
            ? { 'uniqueName': true }
            : null;
        return null;
    }

    public static uniqueFacility(facilities: string[]): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
            return facilities?.find(facility => facility.toLowerCase() == control.value.toLowerCase())
                ? { 'uniqueName': true }
                : null;
        };
    }

    public static uniqueSafeties(safeties: string[]): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
            return safeties?.find(safety => safety.toLowerCase() == control.value.toLowerCase())
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
