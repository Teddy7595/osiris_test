import { responseInterface } from "./interfaces/response.interface";

export class DataFromServerService
{
    private _Response:responseInterface;
    constructor(){}

    async getDataById(url:string, id:string):Promise<responseInterface>
    {
        this._Response = await fetch(`${url}/${id}`);
        return this._Response;
    }

    async getDataWithPaginator(url:string, page:number):Promise<responseInterface>
    {
        this._Response = await fetch(`${url}/?paginate=${page}`);
        return this._Response;
    }
}