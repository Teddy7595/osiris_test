import { Module } from '@nestjs/common';
//controladores
import {ProductsController} from './controllers/controllers.index'

//servicios
import {ProductsService} from './services/index.services'

//esquemas
import {ProductsModelsModule} from './models/productsModels.module' 

@Module({
    imports:[ProductsModelsModule],
    controllers:[ProductsController],
    providers:[ProductsService],
    exports:[ProductsService]
})
export class ProductsModule {}
