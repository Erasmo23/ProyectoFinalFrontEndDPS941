import { useEffect, useState } from 'react'

import type { Paciente } from '../../domain/entities/Paciente';
import { getPacientesAction } from '../../actions/get-pacientes';


let popularPageNumber = 0;

export const usePacientes = () => {

    const sizePage = 10;
  
    const [isLoading, setIsLoading] = useState(true);
    const [pacientes, setPacientes] = useState<Paciente[]>([]);
    const [dui, setDui] = useState('');

    useEffect(() => {

        initialLoad();

    }, []);


    const initialLoad = async () => {

        popularPageNumber = 0;

        const data = await getPacientesAction(popularPageNumber, sizePage, dui);

        setPacientes(data);
        
        setIsLoading(false);

    }

    return {

        isLoading,
        pacientes,

        //method's
        searchByDui: async (term: string) =>{
            popularPageNumber=0;
            setDui(term);
            const data = await getPacientesAction(popularPageNumber, sizePage, term);
            setPacientes( data );

        },
        pacientesNextPage: async () =>{
            popularPageNumber++;

            const data = await getPacientesAction(popularPageNumber, sizePage, dui);

            setPacientes( prev => [...prev, ...data] );

            
        }

    }
}
