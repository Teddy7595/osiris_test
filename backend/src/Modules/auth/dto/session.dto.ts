import { IsNotEmpty, IsString, IsEmail, IsArray } from 'class-validator';

export class sessionDTO {


    @IsNotEmpty()
    @IsString()
    _id: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    last_name: string;

    @IsNotEmpty()
    @IsString()
    dir_domicilio: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    token: string;

    @IsNotEmpty()
    @IsArray()
    updatedAt: string[];

    @IsNotEmpty()
    @IsArray()
    createdAt: string[];



}
