import { consultorioApi } from "../config/api/consultorioApi";
import type { Consultorio } from "../domain/entities/consultorio";
import type { ActionAPIResponse, CatalogoAPIResponse,  } from "../infrastructure/interfaces/catalogos.responses";
import { ConsultorioMapper } from "../infrastructure/mappers/consultorio.mapper";

export const getConsultoriosAction = async () : Promise<Consultorio []>  => {

    try {
        const {data} = await consultorioApi.get<CatalogoAPIResponse[]>('/consultorios/findall');
        return data.map( apiResponse => ConsultorioMapper.catalogoAPIResponseToEntity(apiResponse));

    } catch (error) {
        console.error(error);
        throw new Error ('Error fetching especialidades api /consultorios/findall');

    }

}

export const deleteConsultorioAction = async ( id: number) : Promise<ActionAPIResponse>  => {

    try {
        const {data} = await consultorioApi.delete<ActionAPIResponse>(`/consultorios/delete/${id}`);

        return data;

    } catch (error) {
        console.error(error);
        throw new Error (`Error fetching especialidades api /consultorios/delete/${id}`);

    }

}

export const getOneConsultorioAction = async (id: number) : Promise<Consultorio> => {
    try {
        const {data} = await consultorioApi.get<CatalogoAPIResponse>(`/consultorios/findbycode/${id}`);
        return ConsultorioMapper.catalogoAPIResponseToEntity(data);

    } catch (error) {
        console.error(error);
        throw new Error (`Error fetching especialidades api /consultorios/findbycode/${id}`);

    }
}

export const saveOrEditConsultorioAction = async (form : Consultorio, isCreated : boolean  ) : Promise<ActionAPIResponse> => {

    let mappingAction = '' ;

    if (isCreated){
        mappingAction = '/consultorios/save';
    }else{
        mappingAction ='/consultorios/update';
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