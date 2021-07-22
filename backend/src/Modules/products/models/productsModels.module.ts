import { Module } from '@nestjs/common';
import { _PRODUCTSCHEMA } from './schemas.index';

@Module({

    imports: [_PRODUCTSCHEMA],
    exports: [_PRODUCTSCHEMA]
})
export class ProductsModelsModule {}
