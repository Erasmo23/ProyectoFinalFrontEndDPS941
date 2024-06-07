export interface Cita {
    citaId:            number;
    paciente:          string;
    doctor:            string;
    consultorio:       string;
    fechacita:         string;
    fechaReprogramada ?: string;
}