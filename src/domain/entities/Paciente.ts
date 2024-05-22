export interface Paciente {
    pacienteId:      number;
    usuarioId:       number;
    dui:             string;
    nombres:         string;
    apellidos:       string;
    fechaNacimiento: Date;
    genero ?:          string;
    tipoSangre ?:      string;
    peso ?:            number;
    altura ?:          number;
    telefono ?:        string;
    direccion ?:       string;
}