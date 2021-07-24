import { Injectable } from '@nestjs/common';

import { ProductsService } from './products.service';

import { responseInterface, _argsFind } from 'src/Response/interfaces/interfaces.index';

import { 
    productInterface, 
    requiredProductsInterface, 
    salesCheckInterface, 
    salesItemInterface, 
    verifiedProductsInterface 
} from '../models/interfaces/product.interface';

import { ProcessDataService, DateProcessService } from "src/Classes/classes.index";

@Injectable()
export class PurchaseService 
{
    private _Response:responseInterface; //variable de respuesta final del servicio
    private _SalesCheck:salesCheckInterface; //variable de factura para respuesta final

    constructor
    (
        private _dateProcessService: DateProcessService,
        private readonly _productService:ProductsService
    ){}

    /** confirmo la compra y genero la dinamica de modificación de stock */
    async generatePurchase(order:requiredProductsInterface):Promise<responseInterface>
    {
        //verifico nuevamente que todo esté en orden antes de manipular el schema de productos
        let _response:responseInterface = await this.verifyOrder({'list': order.list });
        this._Response = _response;

        //si no hay nada que comprar o algun error en particular
        if (!this._Response.ok) return this._Response; 

        //inicializo la variable de "factura"
        this._SalesCheck           = {};
        this._SalesCheck.list      = [];
        this._SalesCheck.total     = 0;
        this._SalesCheck.errors    = [];
        this._SalesCheck.user_id   = order.user_id;
        this._SalesCheck.createdAt = this._dateProcessService.setDate();

        //no quiero anidar foreachs y cllbacks 
        for (const i in _response.data)
        {
            //cofirmo entonces el procedimiento de mover inventario
            await this.confirmPurchase({'prod_id': _response.data[i].prod_id, 'qnty':  _response.data[i].qnty }) 
        }

        //después de hacer toda la dinámica de compra, retorno el resultado final
        this._Response.data = this._SalesCheck;

        return this._Response
    }

    /** verifico que exista los productos y su stock */
    async verifyOrder(order:requiredProductsInterface):Promise<responseInterface>
    {
        let list:verifiedProductsInterface[] = [];
        let _response:responseInterface = {'ok':true, 'status': 200, 'data':[]};

        this._Response = _response;

        //organizo las id para mergear las cantidades en caso de productos repetidos
        await order.list.sort((a, b) => 
        { 
            if(a.prod_id > b.prod_id){ return 1;}
            if(a.prod_id < b.prod_id){ return -1;}

            return 0;
        });

        //ahora "mergearé" los ítems repetidos
        //agrupar los posibles objetos de compras repetidos en el "carrito"
        await this.mergeSameItems(order)

        //no quiero anidar foreachs y cllbacks 
        for (const i in order.list)
        {
            //genero un parámetro de busqueda por cada iteración
            _response = await this.findOneProduct(order.list[i].prod_id);

            //después de buscar, confirmo que la busqueda sea exitosa y que exista stock suficinte 
            (_response.ok && _response.data.stock > order.list[i].qnty)? 
                list.push({'prod_id':order.list[i].prod_id, 'qnty':order.list[i].qnty ,'ok': true, 'reason': 'Producto disponible'}) :
                list.push({'prod_id':order.list[i].prod_id, 'ok': false, 'reason': _response.message || "No hay suficiente stock"});

        }

        this._Response.data = list;
        return this._Response;
    }

    ///////////////////////////////////////////////////////////
    //              METODOS DE USO GENERAL                   //
    ///////////////////////////////////////////////////////////

    //reuso los servicios ya planteados para manipulacion del schema de productos
    //funciòn para búsqueda de productos
    private async findOneProduct(id:string):Promise<responseInterface>
    {   
        let _response:responseInterface;

        _response = await this._productService.getOne(id);

        return _response;
    }

    //funcion para modificar un producto, sobre su stock en este contexto
    private async modifyOneProduct(product:productInterface):Promise<responseInterface>
    {
        let _response:responseInterface;

        _response = await this._productService.modifyProduct(product._id, product);

        return _response;
    }

    //función para hacer la dinámica de consumo de stock
    private async confirmPurchase(chkItem:verifiedProductsInterface):Promise<responseInterface> 
    {
        let _response:responseInterface = await this.findOneProduct(chkItem.prod_id);
        let item:salesItemInterface     = {'name': " ", 'qnty': 0, 'price': 0, 'sbtotal': 0};
        let product:productInterface    = {};

        //mantengo mi verificación acerca del producto 
        if (_response.ok)
        {
            product = _response.data;

            //hago la modificación de stock y calculo de subtotales
            product.stock -= chkItem.qnty;
            item.name     = product.name;
            item.qnty     = chkItem.qnty;
            item.price    = product.price;
            item.sbtotal  = product.price * chkItem.qnty;

            //llamo al manejador de productos para modificar el stock
            _response = await this._productService.modifyProduct(product._id, product);

            //todo en orden? se añade a "la bolsa de prductos comprados", sino se genera un reporte de error
            if (_response.ok) 
            {
                this._SalesCheck.list.push(item); 
                this._SalesCheck.total += item.sbtotal; 

            }else this.errorInSales(_response, {'prod_id': product._id });
            
        }else
        {
            this.errorInSales(_response, {'prod_id': product._id });
        }

        return _response; 
    }

    //funcion para llenar el listado de errores del sistema durante la compra
    private errorInSales(err:responseInterface, order:verifiedProductsInterface)
    {
        this._SalesCheck.errors.push({
            'codStatus': err.status,
            'reason'   : err.message,
            'prod_id'  : order.prod_id
        });

        return;
    }

    /** función para unir ítem iguales en la lista de solicitud de compra */
    private async mergeSameItems(order:requiredProductsInterface)
    {
        //por si solo me llega un item del "carrito"
        if (order.list.length <= 1) return;

        let merged:any[] = [];

        await order.list.forEach((item, index) => 
        {
            for(const i in order.list)
            {
                if(order.list[i +1] && order.list[i +1].prod_id === item.prod_id )
                {
                    item.qnty += order.list[i +1].qnty;
                    item = order.list.shift();
                }
            }
            console.log(item);
            order.list.splice(index, 1);
        });

        
    }

}
