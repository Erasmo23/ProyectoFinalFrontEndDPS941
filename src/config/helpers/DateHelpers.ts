import moment from "moment";

export class DateUtils {
    static formatDate(date: Date): string {
        if (!date) return '';
        return moment(date).format('DD/MM/yyyy');
    }

    static parseDate (date :string) : Date {
        return moment(date, 'DD/MM/yyyy').toDate();
    }
}