import { useEffect, useState } from "react";
import type { Consultorio } from "../../domain/entities/consultorio";
import { deleteConsultorioAction, getConsultoriosAction } from "../../actions/get-consultorios";


export const useConsultorio = () => {
  
    const [isLoading, setIsLoading] = useState(true);
    const [consultorios, setConsultorios] = useState<Consultorio[]>([]);

    useEffect(() => {

        initialLoad();

    }, []);


    const initialLoad = async () => {

        const data = await getConsultoriosAction();

        setConsultorios(data);
        
        setIsLoading(false);

    }

    const reloadData = async () => {
        await initialLoad();
    }

    const deleteOne = async (id: number)  =>{
        const data = await deleteConsultorioAction(id);
        return data;
    }


    return {

        isLoading,
        consultorios,

        //method's
        reloadData,
        deleteOne

        
        /*popularNextPage: async () =>{
            popularPageNumber++;

            const popularMovies = await UseCases.moviesPopularUseCase(movieDBFetcher, {
                page: popularPageNumber
            } );
            
        }*/

    }
}