import { consultorioApi } from "../config/api/consultorioApi";
import { UsuarioSistema } from "../domain/entities/usuariosSistema";
import type { ActionAPIResponse } from "../infrastructure/interfaces/catalogos.responses";
import type { UsuarioAPIResponse } from "../infrastructure/interfaces/usuarios.response";
import { UsuarioMapper } from "../infrastructure/mappers/usuario.mapper";



export const getUsuariosSistemaAction = async (correo: string) : Promise<UsuarioSistema []>  => {
    
    try {
        const {data} = await consultorioApi.get<UsuarioAPIResponse[]>(`/usuarios/findByLikeCorreo?correo=${correo}`);
        return data.map( apiResponse => UsuarioMapper.UsuarioAPIResponseToEntity(apiResponse));

    } catch (error) {
        console.error(error);
        throw new Error (`Error fetching api: /usuarios/findByLikeCorreo?correo=${correo}`);

    }

}

export const changeEstadoUsuarioSistemaAction = async ( id: number) : Promise<ActionAPIResponse>  => {

    try {
        const {data} = await consultorioApi.put<ActionAPIResponse>(`/usuarios/changeEstadoActivo/${id}`);

        return data;

    } catch (error) {
        console.error(error);
        throw new Error (`Error fetching api /usuarios/changeEstadoActivo/${id}`);

    }

}


export const createUsuarioSistemaAction = async ( correo: string, idPaciente ?:number ) : Promise<ActionAPIResponse> =>{

    try {
        const {data} = await consultorioApi.post<ActionAPIResponse>(`/usuarios/create`,{
            correo,idPaciente
        });

        return data;

    } catch (error) {
        console.error(error);
        throw new Error (`Error fetching api /usuarios/create`);

    }
}

export const changePasswordUsuarioAction = async ( correo: string, password: string, passwordNew: string ) : Promise<ActionAPIResponse> =>{

    try {
        const {data} = await consultorioApi.post<ActionAPIResponse>(`/usuarios/changePassword`,{
            correo,password,passwordNew
        });

        return data;

    } catch (error) {
        console.error(error);
        throw new Error (`Error fetching api /usuarios/changePassword`);

    }
}