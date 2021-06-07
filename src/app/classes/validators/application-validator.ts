import { Injectable } from "@angular/core";
import { AbstractControl, ValidatorFn } from "@angular/forms";
import { Show } from "src/app/interfaces/application";
import { Util } from "../util/util";

@Injectable({
    providedIn: 'root'
})
export class ApplicationValidator {

    static uniqueAuditoriumName(auditoriumNames: string[]): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
            return auditoriumNames ? auditoriumNames
                .find(name => name.toLowerCase() == control.value.toLowerCase())
                ? { 'uniqueName': true }
                : null : null;
        };
    }

    static uniqueMovieName(movieNames: string[]): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
            return movieNames ? movieNames
                .find(name => name.toLowerCase() == control.value.toLowerCase())
                ? { 'uniqueName': true }
                : null : null;
        };
    }

    static validMovieGenre(genres: string[]): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
            return genres ? genres
                .find(genre => genre.toLowerCase() == control.value.toLowerCase())
                ? null
                : { 'validGenre': true } : null;
        };
    }

    static uniqueFacility(facilities: string[]): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
            return facilities ? facilities.find(facility => facility.toLowerCase() == control.value.toLowerCase())
                ? { 'uniqueName': true }
                : null : null;
        };
    }

    static uniqueSafeties(safeties: string[]): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
            return safeties ? safeties.find(safety => safety.toLowerCase() == control.value.toLowerCase())
                ? { 'uniqueName': true }
                : null : null;
        };
    }

    static uniqueShowName(shows: Show[]): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
            return shows ? shows.find(show => show.name.toLowerCase() == control.value.toLowerCase())
                ? { 'uniqueName': true }
                : null : null;
        };
    }

    public static uniqueShowTime(shows: Show[]): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
            if (shows) {
                let isNotValid = false;
                for (let i = 0; i < shows?.length; i++)
                    if (!ApplicationValidator.isTimeDifferenceValid(shows[i]?.startTime, control.value)) {
                        isNotValid = true;
                        break;
                    }
                return isNotValid ? { 'uniqueTime': true } : null;
            }
            else
                return null;
        };
    }

    private static isTimeDifferenceValid(previous: string, present: string): boolean {
        const p_time = Util.extractTimeAndConvertToNumber(previous);
        const n_time = Util.extractTimeAndConvertToNumber(present);
        const difference = p_time - n_time;
        return difference >= 10000000 || difference <= -10000000 ? true : false;
    }

    // uniqueAuditoriumName(control: AbstractControl): ValidationErrors | null {
    //     return new GlobalService().getAuditoriumNames()
    //         .find(auditorium => auditorium.toLowerCase() == control.value.toLowerCase())
    //         ? { 'uniqueName': true }
    //         : null;
    //     return null;
    // }

    // uniqueAuditoriumName(auditoriumNames: string[]): ValidationErrors | null {
    //     return (control: AbstractControl): { [key: string]: boolean } | null => {
    //         return auditoriumNames
    //             .find(name => name.toLowerCase() == control.value.toLowerCase())
    //             ? { 'uniqueName': true }
    //             : null;
    //     }
    // }

    // uniqueMovieName(movieNames: string[]): ValidationErrors | null {
    //     return (control: AbstractControl): { [key: string]: boolean } | null => {
    //         return movieNames
    //             .find(name => name.toLowerCase() == control.value.toLowerCase())
    //             ? { 'uniqueName': true }
    //             : null;
    //     }
    // }
    // return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    //     return this._service.getMovieNames()
    //         .pipe(
    //             map((movies: string[]) => {
    //                 console.log('validating movie names');
    //                 return movies.find(movie => movie.toLowerCase() == control.value.toLowerCase())
    //                     ? { 'uniqueName': true }
    //                     : null
    //             }
    //             )
    //         );
    // }


    // validMovieLanguage(control: AbstractControl): ValidationErrors | null {
    //     return GlobalConstants.ALL_LANGUAGES
    //         .find(language => language.toLowerCase() == control.value.toLowerCase())
    //         ? null
    //         : { 'validLanguage': true };
    // }
    // validMovieGenre(control: AbstractControl): ValidationErrors | null {
    //     return GlobalConstants.ALL_GENERS
    //         .find(genre => genre.toLowerCase() == control.value.toLowerCase())
    //         ? null
    //         : { 'validLanguage': true };
    // }

    // public static uniqueAuditoriumName(auditoriums: string[]): ValidatorFn {
    //     return (control: AbstractControl): { [key: string]: boolean } | null => {
    //         return auditoriums?.find(auditorium => auditorium.toLowerCase() == control.value.toLowerCase())
    //             ? { 'uniqueName': true }
    //             : null;
    //     };
    // }

    // https://www.infragistics.com/community/blogs/b/infragistics/posts/how-to-create-custom-validators-for-angular-reactive-forms
}
