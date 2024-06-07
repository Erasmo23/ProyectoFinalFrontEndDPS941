import { Item } from "react-native-picker-select";
import { consultorioApi } from "../config/api/consultorioApi";
import type { Especialidad } from "../domain/entities/especialidad";
import type { ActionAPIResponse, CatalogoAPIResponse } from "../infrastructure/interfaces/catalogos.responses";
import { EspecialidadMapper } from "../infrastructure/mappers/especialidades.mapper";


export const getEspecialidadesAction = async () : Promise<Especialidad []>  => {

    try {
        const {data} = await consultorioApi.get<CatalogoAPIResponse[]>('/especialidades/findall');
        return data.map( apiResponse => EspecialidadMapper.especialidadesAPIResponseToEntity(apiResponse));

    } catch (error) {
        console.error(error);
        throw new Error ('Error fetching especialidades api /especialidades/findall');

    }

}

export const deleteEspecialidadAction = async ( id: number) : Promise<ActionAPIResponse>  => {

    try {
        const {data} = await consultorioApi.delete<ActionAPIResponse>(`/especialidades/delete/${id}`);

        return data;

    } catch (error) {
        console.error(error);
        throw new Error (`Error fetching especialidades api /especialidades/delete/${id}`);
    }

}

export const getOneEspecialidadAction = async (id: number) : Promise<Especialidad> => {
    try {
        const {data} = await consultorioApi.get<CatalogoAPIResponse>(`/especialidades/findbycode/${id}`);
        return EspecialidadMapper.especialidadesAPIResponseToEntity(data);

    } catch (error) {
        console.error(error);
        throw new Error (`Error fetching especialidades api /especialidades/findbycode/${id}`);

    }
}

export const saveOrEditEspecialidadAction = async (form : Especialidad, isCreated : boolean  ) : Promise<ActionAPIResponse> => {

    let mappingAction = '' ;

    if (isCreated){
        mappingAction = '/especialidades/save';
    }else{
        mappingAction ='/especialidades/update';
    }

    try {
        const {data} = await consultorioApi.post<ActionAPIResponse>(mappingAction, {
            id: form.id,
            codigo: form.codigo,
            descripcion : form.descripcion
        });

        return data;

    } catch (error) {
        console.error(error);
        throw new Error (`Error fetching especialidades api ${mappingAction}`);
    }

}


export const getSelectEspecialidadesAction = async () : Promise<Item []>  => {

    try {
        const {data} = await consultorioApi.get<CatalogoAPIResponse[]>('/especialidades/findall');
        return data.map( apiResponse => EspecialidadMapper.especialidadesAPIResponseToSelectOption(apiResponse));

    } catch (error) {
        console.error(error);
        throw new Error ('Error fetching especialidades api /especialidades/findall');

    }

}