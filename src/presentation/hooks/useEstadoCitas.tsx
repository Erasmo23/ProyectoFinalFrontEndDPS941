import { useEffect, useState } from 'react';
import type { EstadoCitasResponse } from '../../infrastructure/interfaces/catalogos.responses';
import { getEstadosCitasAction } from '../../actions/get-estados-citas';

export const useEstadoCitas = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [estadosCitas, setEstadosCitas] = useState<EstadoCitasResponse[]>([]);

    useEffect(() => {

        initialLoad();

    }, []);


    const initialLoad = async () => {

        const data = await getEstadosCitasAction();

        setEstadosCitas(data);

        setIsLoading(false);

    }


    return {
        isLoading,
        estadosCitas
    }
}