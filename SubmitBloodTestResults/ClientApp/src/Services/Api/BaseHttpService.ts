import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import Config from '../../Configurations';
import { ApiResponse } from '../../Models/ApiResponse';
import { IHttpService } from './IHttpService';

export default class BaseHttpService implements IHttpService {
    private _service: AxiosInstance;
    private _headers: any;

    constructor() {
        this._service = axios.create({ baseURL: Config.api });
        this._service.interceptors.response.use(this.handleSuccess, this.handleError);
        console.log('ctor',Config.api )
        this._headers = {'Content-Type':'application/json'};
    }

    async get<T>(path: string): Promise<ApiResponse<T>> {
        var path = 'http://192.168.1.166:44351/api/TestResults/get-blood-tests'
        console.log('get',path)
        const response = await this.sendRequest<T>('GET', path, undefined);
        console.log('reaponse get',response)

        return <ApiResponse<T>>response;

    }
    private handleSuccess = (response:AxiosResponse<any>) => {
        return response.data;
    }

    async post<T>(path: string, body: object): Promise<ApiResponse<T>> {
        var path = 'http://10.0.0.14:44351/api/TestResults/get-blood-tests'

        console.log('post',body,path)
        const response = await this.sendRequest<T>('POST', path, body);
        console.log('reaponse post',response)
        return <ApiResponse<T>>response;
    }

    private handleError = (error:any) => {
        let errorMessage;
        console.log('handle error',error)
        if (error?.response?.data) {
            Promise.resolve(error.response.data);
        }
        else {
            if (!error?.response) {
                errorMessage = 'error';
            }
            else {
                // switch (error.response.status) {
                //     case 401:
                //     case 403:
                //         errorMessage = 'unauthorized';
                //         break;
                //     default:
                //         errorMessage = 'error';
                // }
            }
            const errorResponse: ApiResponse<any> = {
                status: 400,
                data: null,
                errors:errorMessage
            };
    console.log('handle error',errorResponse)
            return Promise.resolve(errorResponse);
        }
    }
 
    private async sendRequest<T>(method: 'GET' | 'POST', path: string, payload?: object): Promise<any> {
        console.log('send req',path, method);
        const configs = this.getConfigurations(method, path, payload);
        
        try
        {
            console.log('send  configs' ,configs);
            const test =  await this._service.request<ApiResponse<T>>(configs);
            console.log('test' ,test);
        }
        catch(ex){
            console.log(ex)
        }
        
        return test;
    }
    private getConfigurations(method: 'GET' | 'POST', path: string, payload?: object): AxiosRequestConfig {
        return  {
            method: method,
            url: path,
            responseType: 'json',
            data: payload,
            headers: this._headers
        };
    }
}
