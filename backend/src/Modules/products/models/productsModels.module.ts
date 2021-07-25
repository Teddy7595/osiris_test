import { Module } from '@nestjs/common';
import { _HISTORYSCHEMA, _PRODUCTSCHEMA } from './schemas.index';

@Module({

    imports: [_PRODUCTSCHEMA, _HISTORYSCHEMA],
    exports: [_PRODUCTSCHEMA, _HISTORYSCHEMA]
})
export class ProductsModelsModule {}
