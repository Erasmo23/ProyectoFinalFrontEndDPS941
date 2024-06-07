import { DateUtils } from "../../config/helpers/DateHelpers";
import { DuiUtil } from "../../config/helpers/DuiHelper";
import { Doctor } from "../../domain/entities/Doctor";
import { Paciente } from "../../domain/entities/Paciente";
import { DoctorAPIResponse } from "../interfaces/doctores.response";
import { PacienteApiResponse } from "../interfaces/pacientes.response";

export abstract class DoctorMapper {

    static doctorApiResponseToEntity (apiResponse : DoctorAPIResponse ) : Doctor {
        return {
            ...apiResponse,
            telefono : (!apiResponse.telefono) ? '' :  apiResponse.telefono,
            dui: DuiUtil.formatterDui(apiResponse.dui),
        }
    }
}