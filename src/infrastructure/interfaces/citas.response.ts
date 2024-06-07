export interface CitaListAPIResponse {
    content:          CitaAPIResponse[];
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

export interface CitaAPIResponse {
    citaId:            number;
    paciente:          string;
    doctor:            string;
    consultorio:       string;
    fechacita:         string;
    fechaReprogramada: string;
}

export interface RegistroCitaAPIResponse {
    citaId:            number;
    pacienteId:          number;
    doctorId:            number;
    consultorioId:       number;
    fechaCita: string;
}

export interface Pageable {
    pageNumber: number;
    pageSize:   number;
    sort:       Sort;
    offset:     number;
    paged:      boolean;
    unpaged:    boolean;
}

export interface Sort {
    empty:    boolean;
    sorted:   boolean;
    unsorted: boolean;
}

export interface CitaFullDataAPIResponse {
    citaId:                  number;
    paciente:                string;
    doctor:                  string;
    consultorio:             string;
    fechacita:               string;
    fechaFin:                string;
    fechaReprogramada:       string;
    estado:                  string;
    origen:                  string;
    tratamiento:             string;
    medicinas:               string;
    comentariosAdiccionales: string;
}
