import { useEffect, useState } from 'react'

import type { Cita } from '../../domain/entities/Cita';
import { getCitasPendientesAction } from '../../actions/get-citas';

let popularPageNumber = 0;

export const useCitasPendientes = () => {

    const sizePage = 10;
  
    const [isLoading, setIsLoading] = useState(true);
    const [citasPendientes, setCitasPendientes] = useState<Cita[]>([]);
    const [fecha, setFecha] = useState<Date>();

    useEffect(() => {

        initialLoad();

    }, []);


    const initialLoad = async () => {

        popularPageNumber = 0;

        const data = await getCitasPendientesAction(popularPageNumber, sizePage, fecha);

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
            const data = await getCitasPendientesAction(popularPageNumber, sizePage, fechaFilter);
            setCitasPendientes(data);

        },
        doctoresNextPage: async () =>{
            popularPageNumber++;

            const data = await getCitasPendientesAction(popularPageNumber, sizePage, fecha);

            setCitasPendientes( prev => [...prev, ...data] );

            
        }

    }
}
