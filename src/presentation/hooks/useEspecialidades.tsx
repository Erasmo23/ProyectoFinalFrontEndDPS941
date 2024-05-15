import { useEffect, useState } from 'react'
import type { Especialidad } from '../../domain/entities/especialidad';
import { deleteEspecialidadAction, getEspecialidadesAction } from '../../actions/get-especialidades';



let popularPageNumber = 1;

export const useEspecialidades = () => {
  
    const [isLoading, setIsLoading] = useState(true);
    const [especialidades, setEspecialidades] = useState<Especialidad[]>([]);

    useEffect(() => {

        initialLoad();

    }, []);


    const initialLoad = async () => {

        const dataEspecialidades = await getEspecialidadesAction();

        setEspecialidades(dataEspecialidades);
        
        setIsLoading(false);

    }

    const reloadData = async () => {
        await initialLoad();
    }

    const deleteOne = async (id: number)  =>{
        const data = await deleteEspecialidadAction(id);
        return data;
    }


    return {

        isLoading,
        especialidades,

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
