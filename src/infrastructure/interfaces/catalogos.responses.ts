export interface CatalogoAPIResponse {
    id:              number;
    codigo:          string;
    descripcion:     string;
    fechaDeRegistro: Date;
}


export interface EstadoCitasResponse {
    codigo:      string;
    descripcion: string;
}

//Es la respuesta a cuando se esta creando, actualizando o eliminando un registro
export interface ActionAPIResponse {
    code:     string;
    messages: string;
}
