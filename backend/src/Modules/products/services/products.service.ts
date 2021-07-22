import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// servicios de response handler y process data
import { responseInterface, _argsFind } from "src/Response/interfaces/interfaces.index";

import { ProcessDataService, DateProcessService } from "src/Classes/classes.index";

import { _configPaginator, _dataPaginator, _argsPagination, _argsUpdate} from 'src/Response/interfaces/interfaces.index';

import { Products } from '../models/schemas/productSchema';

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
}
