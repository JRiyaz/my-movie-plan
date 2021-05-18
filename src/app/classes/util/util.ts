export class Util {

    private static date: string = '15 May 2021';

    static toAmOrPm(time: string): string {
        return new Date(`${Util.date} ${time}`).toLocaleTimeString('en-US');
    }

    static extractTimeAndConvertToNumber(time: string): number {
        return new Date(`${Util.date} ${time}`).getTime();
    }

    static formatDate(date: any): string {
        return new Date(date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });
    }

    static getTomarrow(date: any): Date {
        const temp = new Date(date);
        // const day = 60 * 60 * 24 * 1000;
        // const day = 86400000;
        // return new Date(temp.getTime() + day);
        return new Date(temp.getFullYear(), temp.getMonth(), (temp.getDate() + 1));

    }

    static getYestarday(date: any): Date {
        const day = 86400000;
        const temp = new Date(date);
        return new Date(temp.getTime() - day);

    }

    static sortDates(date1: any, date2: any): number {
        return new Date(date1).getTime() - new Date(date2).getTime();
    }

    static numberField(event: any): boolean {
        // Number(value);
        // parseInt(value);
        // parseFloat('364.585');
        let charCode: number = event.keyCode;
        return (charCode > 31 && (charCode < 48 || charCode > 57)) ? false : true;
    }

    static getFormatedtime(date: any): string {
        return new Date(date).toLocaleTimeString('en-US');
    }

}
