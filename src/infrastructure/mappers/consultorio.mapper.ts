import { DateUtils } from "../../config/helpers/DateHelpers";
import type { Consultorio } from "../../domain/entities/consultorio";
import type { CatalogoAPIResponse } from "../interfaces/catalogos.responses";

export abstract class ConsultorioMapper {

    static catalogoAPIResponseToEntity (apiResponse : CatalogoAPIResponse ) : Consultorio {
        return {
            id: apiResponse.id,
            codigo: apiResponse.codigo,
            descripcion: apiResponse.descripcion,
            fechaCreacion: DateUtils.formatDate(apiResponse.fechaDeRegistro)
        }
    }

}