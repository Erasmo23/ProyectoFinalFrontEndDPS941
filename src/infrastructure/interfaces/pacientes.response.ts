export interface PacienteListAPIResponse {
    content:          PacienteApiResponse[];
    pageable:         Pageable;
    last:             boolean;
    totalElements:    number;
    totalPages:       number;
    size:             number;
    number:           number;
    sort:             Sort;
    first:            boolean;
    numberOfElements: number;
    empty:            boolean;
}

export interface PacienteApiResponse {
    pacienteId:      number;
    usuarioId:       number;
    dui:             string;
    nombres:         string;
    apellidos:       string;
    fechaNacimiento: string;
    genero:          string;
    tipoSangre:      string;
    peso:            number;
    altura:          number;
    telefono:        string;
    direccion:       string;
}

export interface Pageable {
    pageNumber: number;
    pageSize:   number;
    sort:       Sort;
    offset:     number;
    unpaged:    boolean;
    paged:      boolean;
}

export interface Sort {
    empty:    boolean;
    sorted:   boolean;
    unsorted: boolean;
}
