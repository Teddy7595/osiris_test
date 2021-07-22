import { Controller, Get, Param, Response } from '@nestjs/common';
import { responseInterface } from 'src/Response/interfaces/responseHandler.interface';
import { ProductsService } from '../services/index.services';

@Controller('products')
export class ProductsController 
{
    private _Response: responseInterface;

    constructor
    (
        private readonly _productServices:ProductsService
    ){}
    @Get('hello')
    async hello() { return "hello this is products route by teddy " + this._productServices.sayHello(); }

    @Get('get/:id')
    async getOne(@Param('id') id:string, @Response() res:any):Promise<responseInterface>
    {
        this._Response = await this._productServices.getOne(id); 
        return res.status(this._Response.status).json(this._Response);
    }
}
