import { responseInterface } from "./interfaces/response.interface";
import axios from 'axios';

export class DataFromServerService
{
    private _Response:responseInterface;
    private URL:string;
    constructor(url:string){this.URL = url;}

    async getDataById(id:string):Promise<responseInterface>
    {
        this._Response = await (await axios.get(`${this.URL}/${id}`)).data;
        return this._Response;
    }

    async getDataWithPaginator(page:number):Promise<responseInterface>
    {
        this._Response = await (await axios.get(`${this.URL}/?paginate=${page}`)).data;
        return this._Response;
    }

    async sendData(pakg:any):Promise<responseInterface>
    {
        this._Response = await (await axios.post(`${this.URL}`, pakg)).data;
        return this._Response;
    }
}