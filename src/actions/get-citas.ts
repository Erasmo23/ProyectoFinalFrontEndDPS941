import { Item } from "react-native-picker-select";
import { consultorioApi } from "../config/api/consultorioApi";
import { DateUtils } from "../config/helpers/DateHelpers";
import type { Cita } from "../domain/entities/Cita";
import type { CitaAPIResponse, CitaFullDataAPIResponse, CitaListAPIResponse, RegistroCitaAPIResponse } from "../infrastructure/interfaces/citas.response";
import { CitaMapper } from "../infrastructure/mappers/cita.mapper";
import type { RegistroCita } from "../domain/entities/RegistroCita";
import { ActionAPIResponse } from "../infrastructure/interfaces/catalogos.responses";
import type { ReprogramacionCita } from "../domain/entities/ReprogramacionCita";
import type { FinalizarCita } from "../domain/entities/FinalizarCita";


export const emptyRegistroCita : RegistroCita = {
    citaId : 0,
    pacienteId: 0,
    doctorId: 0,
    consultorioId: 0,
    fechaCita: new Date()
}

export const emptyCita : Cita = {
    citaId : 0,
    paciente:          '',
    doctor:            '',
    consultorio:       '',
    fechacita:         '',
    fechaReprogramada : ''
}


export const getCitasPendientesAction = async (page: number, size: number, fecha : Date | undefined) : Promise<Cita[]>  => {

    const fechaFilter = DateUtils.formatDate(fecha!);

    try {
        
        const {data} = await consultorioApi.get<CitaListAPIResponse>(`/citas/citasPendientes?page=${page}&size=${size}&fecha=${fechaFilter}`);

        return data.content.map( apiResponse => CitaMapper.citaApiResponseToEntity(apiResponse));

    } catch (error) {
        console.error(error);
        throw new Error (`Error fetching Citas api /citas/citasPendientes?page=${page}&size=${size}&dui=${fechaFilter}`);

    }

}

export const getHistorialCitasAction = async (page: number, size: number, fecha : Date | undefined) : Promise<Cita[]>  => {

    const fechaFilter = DateUtils.formatDate(fecha!);

    try {
        
        const {data} = await consultorioApi.get<CitaListAPIResponse>(`/citas/historial?page=${page}&size=${size}&fecha=${fechaFilter}`);

        return data.content.map( apiResponse => CitaMapper.citaApiResponseToEntity(apiResponse));

    } catch (error) {
        console.error(error);
        throw new Error (`Error fetching Citas api /citas/historial?page=${page}&size=${size}&dui=${fechaFilter}`);

    }

}

export const getCitaByIdAction = async (id: number) : Promise<Cita>  => {

    try {
        const {data} = await consultorioApi.get<CitaAPIResponse>(`/citas/${id}`);
        return CitaMapper.citaApiResponseToEntity(data);

    } catch (error) {
        console.error(error);
        throw new Error (`Error fetching citas api /registroCita/${id}`);

    }

}


export const getRegistroCitaByIdAction = async (id: string) : Promise<RegistroCita>  => {

    if (id === 'create') return emptyRegistroCita;

    try {
        const {data} = await consultorioApi.get<RegistroCitaAPIResponse>(`/citas/registroCita/${id}`);
        return {
            ...data,
            fechaCita: DateUtils.parseDate(data.fechaCita)
        };

    } catch (error) {
        console.error(error);
        throw new Error (`Error fetching citas api /registroCita/${id}`);

    }

}

export const getSelectPacientesAction = async () : Promise<Item []>  => {

    try {
        const {data} = await consultorioApi.get<Item[]>('/citas/selectPacientes');
        return data;

    } catch (error) {
        console.error(error);
        throw new Error ('Error fetching citas api /citas/selectPacientes');

    }

}

export const getSelectDoctoresAction = async () : Promise<Item []>  => {

    try {
        const {data} = await consultorioApi.get<Item[]>('/citas/selectDoctores');
        return data;

    } catch (error) {
        console.error(error);
        throw new Error ('Error fetching citas api /citas/selectDoctores');

    }

}

export const getSelectConsultoriosAction = async () : Promise<Item []>  => {

    try {
        const {data} = await consultorioApi.get<Item[]>('/citas/selectConsultorios');
        return data;

    } catch (error) {
        console.error(error);
        throw new Error ('Error fetching citas api /citas/selectConsultorios');

    }

}

export const createOrUpdateCitaAction = async (cita : RegistroCita, citaId : string) : Promise<ActionAPIResponse> =>{

    if (citaId && citaId !== 'create'){
        cita.citaId = Number(citaId);
        return update(cita);
    }

    return create(cita);
}

const update = async (cita : RegistroCita) : Promise<ActionAPIResponse> =>  {
    try {
        
        const { data} = await consultorioApi.put<ActionAPIResponse>(`/citas/editProgramadaOrRepro/${cita.citaId}`, {
            ...cita,
            fechaCita: DateUtils.formatDate(cita.fechaCita),
        });

        return data;

    } catch (error) {
        console.error(error);
        throw new Error (`Error PUT api /doctores/editProgramadaOrRepro/${cita.citaId}`);
    }
}

const create = async (cita : RegistroCita) : Promise<ActionAPIResponse> => {

    try {
        const {data} = await consultorioApi.post<ActionAPIResponse>(`/citas/create`, {
            ...cita,
            fechaCita: DateUtils.formatDate(cita.fechaCita),
        });

        return data;

    } catch (error) {
        console.error(error);
        throw new Error (`Error POST api /citas/create`);
    }
}

export const updateReprogramacionCitaAction = async (cita : ReprogramacionCita) : Promise<ActionAPIResponse> =>  {
    try {
        
        const { data} = await consultorioApi.put<ActionAPIResponse>(`/citas/reprogramar/${cita.citaId}`, {
            ...cita,
            fechaReprogramacion: DateUtils.formatDate(cita.fechaReprogramacion),
        });

        return data;

    } catch (error) {
        console.error(error);
        throw new Error (`Error PUT api /reprogramar/${cita.citaId}`);
    }
}


export const finalizarCitaAction = async (cita : FinalizarCita) : Promise<ActionAPIResponse> =>  {
    try {
        
        const { data} = await consultorioApi.put<ActionAPIResponse>(`/citas/finalizar/${cita.citaId}`, {
            ...cita,
        });

        return data;

    } catch (error) {
        console.error(error);
        throw new Error (`Error PUT api /citas/finalizar/${cita.citaId}`);
    }
}

export const cancelarCitaAction = async (citaId: number) : Promise<ActionAPIResponse> =>  {
    try {
        
        const { data} = await consultorioApi.patch<ActionAPIResponse>(`/citas/cancelar/${citaId}`);
        return data;

    } catch (error) {
        console.error(error);
        throw new Error (`Error PUT api /citas/cancelar/${citaId}`);
    }
}


export const getCitaFullDataByIdAction = async (id: number) : Promise<CitaFullDataAPIResponse>  => {

    try {
        const {data} = await consultorioApi.get<CitaFullDataAPIResponse>(`/citas/fullData/${id}`);
        return data;
    } catch (error) {
        console.error(error);
        throw new Error (`Error fetching citas api /citas/fullData/${id}`);

    }

}