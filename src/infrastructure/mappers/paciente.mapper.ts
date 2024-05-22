import { DateUtils } from "../../config/helpers/DateHelpers";
import { DuiUtil } from "../../config/helpers/DuiHelper";
import { Paciente } from "../../domain/entities/Paciente";
import { PacienteApiResponse } from "../interfaces/pacientes.response";

export abstract class PacienteMapper {

    static pacienteApiResponseToEntity (apiResponse : PacienteApiResponse ) : Paciente {
        return {
            ...apiResponse,
            altura: (!apiResponse.altura) ? 0 :  apiResponse.altura,
            peso: (!apiResponse.peso) ? 0 :  apiResponse.peso,
            usuarioId: (!apiResponse.usuarioId) ? 0 :  apiResponse.usuarioId,
            telefono : (!apiResponse.telefono) ? '' :  apiResponse.telefono,
            direccion : (!apiResponse.direccion) ? '' :  apiResponse.direccion,
            dui: DuiUtil.formatterDui(apiResponse.dui),
            fechaNacimiento: DateUtils.parseDate(apiResponse.fechaNacimiento)
        }
    }
}