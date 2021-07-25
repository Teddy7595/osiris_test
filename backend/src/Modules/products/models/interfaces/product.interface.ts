export interface productInterface
{
    _id       ?: string;
    name      ?: string;
    price     ?: number;
    stock     ?: number;
    photo     ?: object;
    updatedAt ?: string[];

}//para manejo de tipos de datos para funciones de manejo de productos

export interface requiredProductsInterface
{
    list    ?: {'prod_id':string, 'qnty':number}[];   //lista de pedidos
    user_id ?: string; //id del usuario

}//para manejo de solicitudes de compras

export interface verifiedProductsInterface
{
    prod_id ?: string; 
    qnty    ?: number;
    reason  ?: string; //por si ocurre algún problema con un producto en específico
    ok      ?: boolean;

}//para manejo de solicitudes de disponibilidad de productos

export interface salesItemInterface
{
    name    :string; 
    qnty    :number; 
    price   :number; 
    sbtotal :number;

}//para manejo de item individual de compra, esto será lo que verá el usuario al hacer la compra

export interface salesCheckInterface
{
    list      ?: salesItemInterface[];
    errors    ?: {'prod_id':string, 'codStatus':number, 'reason':string}[];
    total     ?: number;
    user_id   ?: string;
    createdAt ?: string[];
}//para manejo de facturas y similares

export interface historyPurchaseInterface
{
    userId      : string;
    productsId  : string;
    price       : number;
    qnty        : number;
    subttl      : number;
}//para manejo del modelo de historial de compras