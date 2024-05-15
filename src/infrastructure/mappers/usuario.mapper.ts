import { UsuarioAPIResponse } from "../interfaces/usuarios.response";

export abstract class UsuarioMapper {

    static UsuarioAPIResponseToEntity (apiResponse : UsuarioAPIResponse ) : UsuarioSistema {
        return {
            ...apiResponse , resetPassword: apiResponse.configCompletada
        }
    }

}