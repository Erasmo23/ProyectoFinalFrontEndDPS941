import { consultorioApi } from "../../config/api/consultorioApi";
import type { User } from "../../domain/entities/user";
import type { AuthResponse } from "../../infrastructure/interfaces/auth.responses";
import { ActionAPIResponse } from "../../infrastructure/interfaces/catalogos.responses";

const returnUserToken = (data: AuthResponse) => {

    const user: User = {
        correo: data.correo,
        codigoRol: data.codigoRol,
        activo: data.active,
        needResetPassword: data.configCompletada
    }

    return {
        user: user,
        token: data.token
    }

}

export const authLoginAction = async (email: string, password: string) => {

    try {

        const { data } = await consultorioApi.post<AuthResponse>('/auth/login', {
            email,
            password,
        });

        return returnUserToken(data);


    } catch (error) {
        console.log(error);
        return null;
    }

}

export const authCheckStatusAction = async () => {

    try {

        const { data } = await consultorioApi.post<AuthResponse>('/check/token');
        return returnUserToken(data);


    } catch (error) {
        console.log(error);
        return null;
    }
}


export const resetPasswordAction = async (correo : string) : Promise<ActionAPIResponse> => {

    try {
        const {data} =  await consultorioApi.put<ActionAPIResponse>(`/auth/resetPassword/${correo}`);
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error fetching api /auth/resetPassword/${correo}`);
    }
}
