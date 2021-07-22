import { MongooseModule } from "@nestjs/mongoose";

import { History, HistorySchema } from './schemas/historySchema';

import { Products, ProductsSchema  } from "./schemas/productSchema";

export const _PRODUCTSCHEMA = MongooseModule.forFeature([
  {
    name: Products.name,
    schema: ProductsSchema,
  },
]);

export const _HISTORYSCHEMA = MongooseModule.forFeature([
  {
    name: History.name,
    schema: HistorySchema
  }
])
 

