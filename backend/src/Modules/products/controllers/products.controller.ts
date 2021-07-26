import { Request, Body, Controller, Delete, Get, Param, Post, Put, Response, UseInterceptors, UploadedFiles, UseGuards } from '@nestjs/common';
import { responseInterface } from 'src/Response/interfaces/responseHandler.interface';
import { ProductsService, PurchaseService } from '../services/index.services';
import { ProductDto, UpdateProductDto, requiredProductsDto} from '../models/dto/dto.index';
import { AnyFilesInterceptor } from '@nestjs/platform-express/multer';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/Guards/admin.guard';

@Controller('products')
export class ProductsController 
{
    private _Response: responseInterface;

    constructor
    (
        private readonly _productServices:ProductsService,
        private readonly _purchaseService:PurchaseService
    ){}
    @Get('hello')
    async hello() { return "hello this is products route by teddy " + this._productServices.sayHello(); }
    

    @Get()
    async getProducts(@Response() res:any, @Request() req:any):Promise<responseInterface>
    {
        this._Response = await this._productServices.getAll(req.page); 
        console.log(this._Response)
        return res.status(this._Response.status).json(this._Response);
    }

    @Get(':id')
    async getOne(@Param('id') id:string, @Response() res:any):Promise<responseInterface>
    {
        this._Response = await this._productServices.getOne(id); 
        return res.status(this._Response.status).json(this._Response);
    }

    @Get('purchase/history/:id')
    async getHistorySales(@Param('id') id:string, @Request() req:any, @Response() res:any):Promise<responseInterface>
    {
        this._Response = await this._purchaseService.getAllHistoryById(id, req.page); 
        return res.status(this._Response.status).json(this._Response);
    }

    @UseGuards(AuthGuard('jwt'), AdminGuard)
    @Post()
    async setProduct(@Body() product:ProductDto, @Response() res:any):Promise<responseInterface>
    {
        console.log(product);
        this._Response = await this._productServices.setProduct(product);
        return res.status(this._Response.status).json(this._Response);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/verify')
    async verifyProducts(@Body() product:requiredProductsDto, @Response() res:any):Promise<responseInterface>
    {
        this._Response = await this._purchaseService.verifyOrder(product);
        return res.status(this._Response.status).json(this._Response);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/purchase')
    async purchaseProducts(@Body() product:requiredProductsDto, @Response() res:any):Promise<responseInterface>
    {
        this._Response = await this._purchaseService.generatePurchase(product);
        return res.status(this._Response.status).json(this._Response);
    }

    @UseGuards(AuthGuard('jwt'), AdminGuard)
    @Put(':id')
    async modifyProduct(@Param('id') id:string, @Body() product:UpdateProductDto, @Response() res:any):Promise<responseInterface>
    {
        this._Response = await this._productServices.modifyProduct(id, product);
        return res.status(this._Response.status).json(this._Response);
    }

    @UseGuards(AuthGuard('jwt'), AdminGuard)
    @Delete(':id')
    async deleteProduct(@Param('id') id:string, @Response() res:any):Promise<responseInterface>
    {
        this._Response = await this._productServices.delete(id);
        return res.status(this._Response.status).json(this._Response);
    }
    

    @Post("upload/:id")
    @UseInterceptors(AnyFilesInterceptor()) uploadFile(@UploadedFiles() files, @Request() req: any, @Response() res: any) 
    {
        console.log(files[0]);

        /**TODO
         * 
         * TOMAR EL ARCHIVO Y CONVERTIRLO EN IMAGEN
         * EN BASE AL ID DEL PRODUCTO ASIGNARLE LA CONSTANTE PRD_[SEGUIDO DEL ID DEL PRODUCTO]
         * GUARDARLO EN CARPETA PUBLICA
         * RETORNAR EL RESULTADO DONDE SE LE DA LA RUTA DE IMAGEN AL USUARIO PARA QUE SE LA ASIGNE 
         * AL PRODUCTO O EN EL CASO DEL PERFIL DE USUARIO ESTE UEDA AÑADIRLO EN LA FOTO DE PERFIL
         */
        res.end();
    }
}
