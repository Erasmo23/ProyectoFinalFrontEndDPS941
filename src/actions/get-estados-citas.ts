import { consultorioApi } from "../config/api/consultorioApi";
import { EstadoCitasResponse } from "../infrastructure/interfaces/catalogos.responses";

export const getEstadosCitasAction = async () : Promise<EstadoCitasResponse []>  => {

    try {
        const {data} = await consultorioApi.get<EstadoCitasResponse[]>('/estadocitas/findall');
        return data;

    } catch (error) {
        console.error(error);
        throw new Error ('Error fetching especialidades api /estadocitas/findall');

    }

}