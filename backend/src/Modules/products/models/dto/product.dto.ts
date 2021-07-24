import { IsNotEmpty, IsString, IsArray, IsNumber } from "class-validator";

export class ProductDto 
{

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsNumber()
    @IsNotEmpty()
    stock: number;

    photo: object;
}

export class UpdateProductDto 
{

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsNumber()
    @IsNotEmpty()
    stock: number;

    photo: object;

    updatedAt: string[];
}

export class requiredProductsDto
{
    @IsArray()
    @IsNotEmpty()
    list: Array<{"prod_id": string, "qnty":number}>;

    @IsString()
    @IsNotEmpty()
    user_id: string;
}