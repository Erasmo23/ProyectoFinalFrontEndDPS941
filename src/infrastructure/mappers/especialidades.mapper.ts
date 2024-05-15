import type { Especialidad } from "../../domain/entities/especialidad";
import type { CatalogoAPIResponse } from "../interfaces/catalogos.responses";


export abstract class EspecialidadMapper {

    static especialidadesAPIResponseToEntity ( apiResponse : CatalogoAPIResponse) : Especialidad {
        return {
            id: apiResponse.id,
            codigo: apiResponse.codigo,
            descripcion: apiResponse.descripcion
        }
    } 

}