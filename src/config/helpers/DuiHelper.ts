
export class DuiUtil {

    static formatterDui(dui : string) : string {
        if (!dui) return '';
        return `${dui.substring(0,8)}-${dui.substring(8)}`;
    }

    static unFormatterDui(dui: string) : string {
        return `${dui.replace('-','')}`;
    }
}