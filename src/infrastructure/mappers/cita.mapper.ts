import type { Cita } from "../../domain/entities/Cita";
import type { CitaAPIResponse } from "../interfaces/citas.response";

export abstract class CitaMapper {

    static citaApiResponseToEntity (apiResponse : CitaAPIResponse ) : Cita {
        return {
            ...apiResponse,
            fechaReprogramada : apiResponse.fechaReprogramada ? apiResponse.fechaReprogramada : undefined
        }
    }
}