export interface productInterface
{
    _id       ?: string;
    name      ?: string;
    price     ?: number;
    stock     ?: number;
    photo     ?: object;
    updatedAt ?: string[];

}//para manejo de tipos de datos en paràmetros de funciones de manejo de productos

export interface requiredProductsInterface
{
    list    ?: Array<{'prod_id':string, 'count':number}>;   //lista de pedidos
    user_id ?: string //id del usuario

}//para manejo de solicitudes de compras

export interface verifiedProductsInterface
{
    prod_id ?: string; 
    reason  ?: string; //por si ocurre algún problema con un producto en específico
    ok      ?: boolean;

}//para manejo de solicitudes de disponibilidad de productos
