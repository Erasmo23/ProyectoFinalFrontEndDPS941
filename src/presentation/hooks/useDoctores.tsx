import { useEffect, useState } from 'react'

import type{ Doctor } from '../../domain/entities/Doctor';
import { getDoctoresAction } from '../../actions/get-doctores';

let popularPageNumber = 0;

export const useDoctores = () => {

    const sizePage = 10;
  
    const [isLoading, setIsLoading] = useState(true);
    const [doctores, setDoctores] = useState<Doctor[]>([]);
    const [dui, setDui] = useState('');

    useEffect(() => {

        initialLoad();

    }, []);


    const initialLoad = async () => {

        popularPageNumber = 0;

        const data = await getDoctoresAction(popularPageNumber, sizePage, dui);

        setDoctores(data);
        
        setIsLoading(false);

    }

    return {

        isLoading,
        doctores,

        //method's
        searchByDui: async (term: string) =>{
            popularPageNumber=0;
            setDui(term);
            const data = await getDoctoresAction(popularPageNumber, sizePage, term);
            setDoctores( data );

        },
        doctoresNextPage: async () =>{
            popularPageNumber++;

            const data = await getDoctoresAction(popularPageNumber, sizePage, dui);

            setDoctores( prev => [...prev, ...data] );

            
        }

    }
}
