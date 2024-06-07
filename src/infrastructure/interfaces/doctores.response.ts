export interface DoctorListAPIResponse {
    content:          DoctorAPIResponse[];
    pageable:         Pageable;
    last:             boolean;
    totalPages:       number;
    totalElements:    number;
    size:             number;
    number:           number;
    sort:             Sort;
    first:            boolean;
    numberOfElements: number;
    empty:            boolean;
}

export interface DoctorAPIResponse {
    doctorId:     number;
    dui:          string;
    especialidad: string;
    especialidadId : number,
    nombres:      string;
    apellidos:    string;
    telefono:     string;
    activo:       boolean;
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
