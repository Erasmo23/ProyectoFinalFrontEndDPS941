import moment from "moment";

export class DateUtils {
    static formatDate(date: Date): string {
        if (!date) return '';
        return moment(date).format('DD/MM/yyyy');
    }
}