import { useEffect, useState } from 'react';

export const useDebouncedValueDate = (input: Date | undefined, timeInMS: number = 1000) => {

    const [debouncedValue, setDebouncedValue] = useState(input);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const timeout = setTimeout(() => {
            setLoading(false);
            setDebouncedValue(input);
        }, timeInMS);

        return () => {
            setLoading(true);
            clearTimeout(timeout);
        }
    }, [input])

    return {
        debouncedValue,
        loading
    };
}