import { Injectable } from "@nestjs/common";
import { MulterOptionsFactory } from "@nestjs/platform-express";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { ConfigService } from "src/Config";

@Injectable()
export class FilesService /* implements MulterOptionsFactory */
{
    /* constructor(private readonly configService: ConfigService) {}
    createMulterOptions(): MulterOptions | Promise<MulterOptions> 
    {
        throw new Error("Method not implemented.");
    } */
}
