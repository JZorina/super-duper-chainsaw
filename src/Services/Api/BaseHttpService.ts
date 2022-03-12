import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import Config from '../../Configurations';
import { ApiResponse } from '../../Models/ApiResponse';
import { IHttpService } from './IHttpService';

export default class BaseHttpService implements IHttpService {
    private _service: AxiosInstance;
    private _headers: any;

    constructor() {
        this._service = axios.create({ baseURL: Config.api });
        this._headers = {};
    }

    async get<T>(path: string, verifyOtp?: boolean): Promise<ApiResponse<T>> {
        const response = await this.sendRequest<T>('GET', path, undefined,);
        return <ApiResponse<T>>response;
    }

    async post<T>(path: string, body: object): Promise<ApiResponse<T>> {
        const response = await this.sendRequest<T>('POST', path, body);
        return <ApiResponse<T>>response;
    }
    private handleSuccess = (response:AxiosResponse<any>) => {
        return response.data;
    }
    private handleError = (error:any) => {
        let errorMessage;
        if (error?.response?.data) {
            Promise.resolve(error.response.data);
        }
        else {
            if (!error?.response) {
                errorMessage = 'error';
            }
            else {
                switch (error.response.status) {
                    case 401:
                    case 403:
                        errorMessage = 'unauthorized';
                        break;
                    default:
                        errorMessage = 'error';
                }
            }
            const errorResponse: ApiResponse<any> = {
                status: errorMessage,
                data: null
            };
    
            return Promise.resolve(errorResponse);
        }
    }
    private handleSimpleError = () => {
        return Promise.resolve(null);
    }
    private async sendRequest<T>(method: 'GET' | 'POST', path: string, payload?: object): Promise<any> {
        const configurations = this.getConfigurations(method, path, payload);
        return await this._service.request<ApiResponse<T>>(this.getConfigurations(method, path, payload));
    }
    private getConfigurations(method: 'GET' | 'POST', path: string, payload?: object): AxiosRequestConfig {
        return {
            method: method,
            url: path,
            responseType: 'json',
            data: payload,
            headers: this._headers
        };
    }
}
