import axios, { AxiosInstance } from 'axios';
import { AuthType } from './models/authType';

export class BatchConsuming {

    axiosInstance: AxiosInstance;

    constructor(url: string, headers: any) {
        this.axiosInstance = axios.create({
            headers,
            baseURL: url
        });
    }

    executeAsync = (batchSize: number, payload: any[]): Promise<any[]> => {
        const iterations: number = Math.ceil(payload.length / batchSize);
        return new Promise<any[]>(async (resolve, reject) => {
            let result: any[] = [];
            try {
                for (let i = 0; i < iterations; i++) {
                    let tasks = payload.slice(i * batchSize, (i * batchSize) + batchSize).map((tsk) => this.consumeServiceAsync(tsk));
                    result.push(await Promise.all(tasks));
                }
                resolve(result)
            }
            catch (ex) {
                reject(ex)
            }

        })
    }


    consumeServiceAsync = async (payload: any) => {
        try {
            const response = await this.axiosInstance.post('', payload);
            return response.data;

        }
        catch (ex) {
            throw (ex)
        }
    }



}

