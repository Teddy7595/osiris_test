import { Request, Body, Controller, Delete, Get, Param, Post, Put, Response } from '@nestjs/common';
import { responseInterface } from 'src/Response/interfaces/responseHandler.interface';
import { ProductsService } from '../services/index.services';
import { ProductDto, UpdateProductDto } from '../models/dto/dto.index';

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
    
    @Get()
    async getProducts(@Response() res:any, @Request() req:any):Promise<responseInterface>
    {
        this._Response = await this._productServices.getAll(req.page); 
        return res.status(this._Response.status).json(this._Response);
    }

    @Get(':id')
    async getOne(@Param('id') id:string, @Response() res:any):Promise<responseInterface>
    {
        this._Response = await this._productServices.getOne(id); 
        return res.status(this._Response.status).json(this._Response);
    }

    @Post()
    async setProduct(@Body() product:ProductDto, @Response() res:any):Promise<responseInterface>
    {
        console.log(product);
        this._Response = await this._productServices.setProduct(product);
        return res.status(this._Response.status).json(this._Response);
    }

    @Put(':id')
    async modifyProduct(@Param('id') id:string, @Body() product:UpdateProductDto, @Response() res:any):Promise<responseInterface>
    {
        this._Response = await this._productServices.modifyProduct(id, product);
        return res.status(this._Response.status).json(this._Response);
    }

    @Delete(':id')
    async deleteProduct(@Param('id') id:string, @Response() res:any):Promise<responseInterface>
    {
        this._Response = await this._productServices.delete(id);
        return res.status(this._Response.status).json(this._Response);
    }
}
