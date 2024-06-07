import { useEffect, useState } from 'react'

import type { Cita } from '../../domain/entities/Cita';
import { getHistorialCitasAction } from '../../actions/get-citas';

let popularPageNumber = 0;

export const useHistorialCitas = () => {

    const sizePage = 10;
  
    const [isLoading, setIsLoading] = useState(true);
    const [citasPendientes, setCitasPendientes] = useState<Cita[]>([]);
    const [fecha, setFecha] = useState<Date>();

    useEffect(() => {

        initialLoad();

    }, []);


    const initialLoad = async () => {

        popularPageNumber = 0;

        const data = await getHistorialCitasAction(popularPageNumber, sizePage, fecha);

        setCitasPendientes(data);
        
        setIsLoading(false);

    }

    return {

        isLoading,
        citasPendientes,

        //method's
        searchByFecha: async (fechaFilter: Date | undefined) =>{
            popularPageNumber=0;
            setFecha(fechaFilter);
            const data = await getHistorialCitasAction(popularPageNumber, sizePage, fechaFilter);
            setCitasPendientes(data);

        },
        citasNextPage: async () =>{
            popularPageNumber++;

            const data = await getHistorialCitasAction(popularPageNumber, sizePage, fecha);

            setCitasPendientes( prev => [...prev, ...data] );

            
        }

    }
}
