import { IsNotEmpty, IsString, IsArray, IsNumber } from "class-validator";

export class ProdcutDto {

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

export class updateProductDto {

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