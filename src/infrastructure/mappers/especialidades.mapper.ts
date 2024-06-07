import { Item } from "react-native-picker-select";
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

    static especialidadesAPIResponseToSelectOption ( apiResponse : CatalogoAPIResponse) : Item {
        return {
            value: apiResponse.id.toString(),
            label: apiResponse.codigo + ' - ' + apiResponse.descripcion,
            color: '#0095FF'
        }
    }

}