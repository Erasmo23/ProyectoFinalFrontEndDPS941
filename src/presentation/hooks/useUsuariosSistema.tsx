import { useEffect, useState } from "react";
import { changeEstadoUsuarioSistemaAction, getUsuariosSistemaAction } from "../../actions/get-usuariosSistema";



export const useUsuariosSistema = () => {
  
    const [isLoading, setIsLoading] = useState(true);
    const [usuariosSistema, setUsuariosSistema] = useState<UsuarioSistema[]>([]);
    

    useEffect(() => {

        initialLoad('');

    }, []);


    const initialLoad = async (correo : string) => {

        const data = await getUsuariosSistemaAction(correo);

        setUsuariosSistema(data);
        
        setIsLoading(false);

    }

    const reloadData = async (correo : string) => {
        await initialLoad(correo);
    }

    const changeEstado = async (id: number)  =>{
        const data = await changeEstadoUsuarioSistemaAction(id);
        return data;
    }


    return {

        isLoading,
        usuariosSistema,

        //method's
        reloadData,
        changeEstado

        /*popularNextPage: async () =>{
            popularPageNumber++;

            const popularMovies = await UseCases.moviesPopularUseCase(movieDBFetcher, {
                page: popularPageNumber
            } );
            
        }*/

    }
}
