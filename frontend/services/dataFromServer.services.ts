import { responseInterface } from "./interfaces/response.interface";

export class DataFromServerService
{
    private _Response:responseInterface;
    private URL:string;
    constructor(url:string){this.URL = url;}

    async getDataById(id:string):Promise<responseInterface>
    {
        await fetch(`${this.URL}/${id}`).then((r)=>
        {
            this._Response = r;
            return;
        });
        return this._Response;
    }

    async getDataWithPaginator(page:number):Promise<responseInterface>
    {
        await fetch(`${this.URL}/?paginate=${page}`).then((r)=>
        {
            this._Response = r;
            console.log(this._Response.data)
            return;
        });
        return this._Response;
    }
}