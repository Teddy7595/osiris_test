import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { responseInterface, _argsFind } from 'src/Response/interfaces/interfaces.index';

import { requiredProductsInterface, verifiedProductsInterface } from '../models/interfaces/product.interface';

import { ProcessDataService, DateProcessService } from "src/Classes/classes.index";

import { Products } from '../models/schemas/productSchema';

@Injectable()
export class PurchaseService 
{
    private _Response:responseInterface; //variable de respuesta final del servicio

    constructor
    (
        @InjectModel(Products.name) private ProductsModel: Model<Products>,
        private _processData: ProcessDataService,
        private _dateProcessService: DateProcessService
    ){}

    async generatePurchase(order:requiredProductsInterface):Promise<responseInterface>
    {
        

        return this._Response
    }

    async verifyOrder(order:requiredProductsInterface):Promise<responseInterface>
    {
        let list:Array<verifiedProductsInterface> = Array(); //inicializo la variable
        let _response:responseInterface = {'ok':true, 'status': 200, 'data':[]};
        let _args: _argsFind;

        this._Response = _response;

        //por esta ocasión aplicaré "a lo vieja escuela"
        for (let i =0; i < order.list.length; ++i)
        {
            //genero un parámetro de busqueda por cada iteración
            _args = { 'findObject': { '_id': order.list[i].prod_id}}
            _response = await this.findOneProduct(_args);

            //después de buscar, confirmo que la busqueda sea exitosa y que exista stock suficinte 
            (_response.ok && _response.data.stock > order.list[i].count)? 
                list.push({'prod_id':_args.findObject._id, 'ok': true, 'reason': 'Disponible'}):
                list.push({'prod_id':_args.findObject._id, 'ok': false, 'reason': _response.message || "No hay suficiente stock"});

        }

        this._Response.data = list;
        list = null; //"quemo" la variable para evitar posibles conflictos con nuevas entradas
        
        return this._Response;
    }

    //funciòn para búsqueda de productos
    private async findOneProduct(_args:_argsFind):Promise<responseInterface>
    {   
        let _response:responseInterface;

        await this._processData._findOneDB(this.ProductsModel, _args).then((r: responseInterface) => 
        {
            _response = r; 
            
        }, (err: responseInterface) => 
        {

            _response = err; 
            _response.data = [];
            _response.ok = false;
            _response.message = err.message;

        });

        return _response;
    }

}
