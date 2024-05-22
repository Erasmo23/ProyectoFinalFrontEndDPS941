import { consultorioApi } from "../config/api/consultorioApi";
import { DateUtils } from "../config/helpers/DateHelpers";
import { DuiUtil } from "../config/helpers/DuiHelper";
import type { Paciente } from "../domain/entities/Paciente";
import type { ActionAPIResponse } from "../infrastructure/interfaces/catalogos.responses";
import type { PacienteApiResponse, PacienteListAPIResponse } from "../infrastructure/interfaces/pacientes.response";
import { PacienteMapper } from "../infrastructure/mappers/paciente.mapper";

export const emptyPaciente : Paciente = {
    pacienteId : 0, 
    usuarioId: 0,
    dui: '',
    nombres: '',
    apellidos: '',
    fechaNacimiento: new Date(),
    genero: '',
    tipoSangre: '',
    telefono: '',
    direccion: '',
}

export const getPacientesAction = async (page: number, size: number, dui : string = '') : Promise<Paciente[]>  => {

    try {

        const {data} = await consultorioApi.get<PacienteListAPIResponse>(`/pacientes?page=${page}&size=${size}&dui=${dui}`);

        return data.content.map( apiResponse => PacienteMapper.pacienteApiResponseToEntity(apiResponse));

    } catch (error) {
        console.error(error);
        throw new Error (`Error fetching especialidades api /pacientes?page=${page}&size=${size}&dui=${dui}`);

    }

}

export const getPacienteByIdAction = async (id: string) : Promise<Paciente>  => {

    if (id === 'create') return emptyPaciente;

    try {

        const {data} = await consultorioApi.get<PacienteApiResponse>(`/pacientes/${id}`);

        return PacienteMapper.pacienteApiResponseToEntity(data);

    } catch (error) {
        console.error(error);
        throw new Error (`Error fetching especialidades api /pacientes/${id}`);

    }

}

export const createOrUpdatePacienteAction = async (paciente : Paciente, pacienteId : string) : Promise<ActionAPIResponse> =>{

    if (pacienteId && pacienteId !== 'create'){
        paciente.pacienteId = Number(pacienteId);
        return update(paciente);
    }

    return create(paciente);
}

const update = async (paciente: Paciente) : Promise<ActionAPIResponse> =>  {
    try {
        
        const { data, status, statusText, config, request, headers } = await consultorioApi.put<ActionAPIResponse>(`/pacientes/update/${paciente.pacienteId}`, {
            ...paciente,
            fechaNacimiento: DateUtils.formatDate(paciente.fechaNacimiento),
            peso: (paciente.peso === 0) ? '' : paciente.peso,
            altura: (paciente.altura === 0) ? '' : paciente.altura,
            dui: DuiUtil.unFormatterDui(paciente.dui)
        });

        return data;

    } catch (error) {
        console.error(error);
        throw new Error (`Error PUT api /pacientes/update/${paciente.pacienteId}`);
    }
}

const create = async (paciente: Paciente) : Promise<ActionAPIResponse> => {

    try {
        const {data} = await consultorioApi.post<ActionAPIResponse>(`/pacientes/create`, {
            ...paciente,
            fechaNacimiento: DateUtils.formatDate(paciente.fechaNacimiento),
            peso: (paciente.peso === 0) ? '' : paciente.peso,
            altura: (paciente.altura === 0) ? '' : paciente.altura,
            dui: DuiUtil.unFormatterDui(paciente.dui)
        });

        return data;

    } catch (error) {
        console.error(error);
        throw new Error (`Error POST api /pacientes/create`);
    }
}