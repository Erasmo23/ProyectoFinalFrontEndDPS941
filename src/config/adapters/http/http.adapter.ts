
export abstract class HttpAdapter{

    abstract get<T>(url: string, options ?: Record<string, unknown>) : Promise<T>;
    
    //abstract get (url: string, options: any) : Promise<any>;

}