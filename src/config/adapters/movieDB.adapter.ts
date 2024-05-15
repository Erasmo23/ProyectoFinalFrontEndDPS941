import { API_URL } from "@env";
import { AxiosAdapter } from "./http/axios.adapter";


export const movieDBFetcher = new AxiosAdapter({
    baseUrl: API_URL,
    params: {
        //api_key: '68a830cde9e0b89f57670461f03f0224',
        api_key: '68a830cde9e0b89f57670461f03f0224',
        language: 'es'
    }
});