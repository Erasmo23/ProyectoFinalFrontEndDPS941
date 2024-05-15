import { consultorioApi } from "../../config/api/consultorioApi";
import type { User } from "../../domain/entities/user";
import type { AuthResponse } from "../../infrastructure/interfaces/auth.responses";

const returnUserToken = (data: AuthResponse) => {

    const user: User = {
        correo: data.correo,
        codigoRol: data.codigoRol
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