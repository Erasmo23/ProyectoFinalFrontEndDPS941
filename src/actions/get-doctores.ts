import { consultorioApi } from "../config/api/consultorioApi";

import { DuiUtil } from "../config/helpers/DuiHelper";
import type { Doctor } from "../domain/entities/Doctor";
import type { ActionAPIResponse } from "../infrastructure/interfaces/catalogos.responses";
import type { DoctorAPIResponse, DoctorListAPIResponse } from "../infrastructure/interfaces/doctores.response";

import { DoctorMapper } from "../infrastructure/mappers/doctor.mapper";

export const emptyDoctor : Doctor = {
    doctorId: 0,
    dui: '',
    nombres: '',
    apellidos: '',
    telefono: '',
    especialidadId : 0,
    especialidad: ''
}

export const getDoctoresAction = async (page: number, size: number, dui : string = '') : Promise<Doctor[]>  => {

    try {

        const {data} = await consultorioApi.get<DoctorListAPIResponse>(`/doctores?page=${page}&size=${size}&dui=${dui}`);

        return data.content.map( apiResponse => DoctorMapper.doctorApiResponseToEntity(apiResponse));

    } catch (error) {
        console.error(error);
        throw new Error (`Error fetching Doctores api /doctores?page=${page}&size=${size}&dui=${dui}`);

    }

}

export const getDoctorByIdAction = async (id: string) : Promise<Doctor>  => {

    if (id === 'create') return emptyDoctor;

    try {

        const {data} = await consultorioApi.get<DoctorAPIResponse>(`/doctores/${id}`);

        let temp = DoctorMapper.doctorApiResponseToEntity(data);
        temp.correo='Edicion@gmail.com';

        return temp;

    } catch (error) {
        console.error(error);
        throw new Error (`Error fetching doctores api /doctores/${id}`);

    }

}

export const createOrUpdateDoctorAction = async (doctor : Doctor, doctorId : string) : Promise<ActionAPIResponse> =>{

    if (doctorId && doctorId !== 'create'){
        doctor.doctorId = Number(doctorId);
        return update(doctor);
    }

    return create(doctor);
}

const update = async (doctor : Doctor) : Promise<ActionAPIResponse> =>  {
    try {
        
        const { data} = await consultorioApi.put<ActionAPIResponse>(`/doctores/update/${doctor.doctorId}`, {
            ...doctor,
            dui: DuiUtil.unFormatterDui(doctor.dui)
        });

        return data;

    } catch (error) {
        console.error(error);
        throw new Error (`Error PUT api /doctores/update/${doctor.doctorId}`);
    }
}

const create = async (doctor : Doctor) : Promise<ActionAPIResponse> => {

    try {
        const {data} = await consultorioApi.post<ActionAPIResponse>(`/doctores/create`, {
            ...doctor,
            dui: DuiUtil.unFormatterDui(doctor.dui)
        });

        return data;

    } catch (error) {
        console.error(error);
        throw new Error (`Error POST api /doctores/create`);
    }
}