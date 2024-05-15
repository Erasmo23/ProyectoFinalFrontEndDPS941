import { API_URL } from "@env";
import axios from "axios";
import { StorageAdapter } from "../adapters/storage-adapter";


export const API_CONSULTORIO_URL = API_URL;

const consultorioApi = axios.create({
    baseURL: API_CONSULTORIO_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

//interceptor para enviar el token
consultorioApi.interceptors.request.use(
    async (config) => {

        const token = await StorageAdapter.getItem('tokenSecurity');
        
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    }
);

export {
    consultorioApi
}