import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// servicios de response handler y process data
import { responseInterface, _argsFind } from "src/Response/interfaces/interfaces.index";

import { ProcessDataService, DateProcessService } from "src/Classes/classes.index";

import { _configPaginator, _dataPaginator, _argsPagination, _argsUpdate} from 'src/Response/interfaces/interfaces.index';

import { Products } from '../models/schemas/productSchema';
import { productInterface } from '../models/interfaces/product.interface';

@Injectable()
export class ProductsService 
{
    private _Response:responseInterface;

    constructor
    (

        @InjectModel(Products.name) private ProductsModel: Model<Products>,
        private _processData: ProcessDataService,
        private _dateProcessService: DateProcessService

    ){}

    sayHello()
    {
        return "Hello from services products";
    }

    async getAll(page:number):Promise<responseInterface>
    {

        const parameters: _dataPaginator = 
        { // <- paginate parameters
            page: page || _configPaginator.page,
            limit: 12 || _configPaginator.limit,
            customLabels: _configPaginator.customLabels,
            sort: { _id: -1 }
        }

        const args: _argsPagination = 
        {

        findObject: {},
        options: parameters

        }

        await this._processData._findDB(this.ProductsModel, args).then((r:responseInterface) => 
        {
            this._Response = r;

        }, (err:responseInterface) => 
            {
            this._Response = err;
            this._Response.message = "No existe datos al respescto"
        });

        return this._Response;
    }

    async getOne(id:string):Promise<responseInterface>
    {
        const _args =
        {
            findObject: 
            {
                _id: id,
            }
        }

        await this._processData._findOneDB(this.ProductsModel, _args).then((r:responseInterface)=>
        {
            this._Response = r;

        }, (err:responseInterface)=>
        {
            this._Response = err;
            this._Response.message = err.message || 'Producto inexistente'
        });

        return this._Response;
    }

    async setProduct(product:productInterface):Promise<responseInterface>
    {
        const data = new this.ProductsModel(product);

        await this._processData._saveDB(data).then((r:responseInterface)=>
        {

            this._Response = r;

        }, (err:responseInterface) =>
        {

            this._Response = err;
            this._Response.message = err.message;

        });

        return this._Response;
    }

    async modifyProduct(id:string, product:productInterface):Promise<responseInterface>
    {
        //creamos un objetos con los datos a actualizar con la interface
        const data:productInterface = product;
        data.updatedAt = this._dateProcessService.setDate();

        // se crea el objeto de argumentos con el id de busqueda en especifico y la data a reemplazar en set
        const args: _argsUpdate = 
        {
            findObject: 
            {
                _id: id,
            },
            set: 
            {
                $set: data
            }
        }

        await this._processData._updateDB(this.ProductsModel, args).then((r:responseInterface) => 
        {
                
            this._Response = r;

        }, (err: responseInterface) => 
        {
            
            this._Response = err;
            this._Response.message = err.message || 'No se pudo actualizar la información';

        });

        return this._Response;
    }

    async delete(id:string):Promise<responseInterface> 
    {
        return this._Response;
    }
}
