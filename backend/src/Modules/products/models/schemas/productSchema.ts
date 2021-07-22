import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

import * as Mongoose from "mongoose";
import * as uniqueValidator from "mongoose-unique-validator";
import * as castAggregation  from "mongoose-cast-aggregation";
import * as mongoosePaginate from "mongoose-paginate-v2";
import * as aggregatePaginate from "mongoose-aggregate-paginate-v2";
import * as mongoose_delete from "mongoose-delete";
import { DateProcessService } from "src/Classes/classes.index";


const _dateService = new DateProcessService();

// @Schema()
export class _files extends Document {

    @Prop({
      required: true,
      default: null,
    })
    type: string;
    @Prop({
      required: true,
      default: null,
    })
    file: string;
    @Prop({
      required: true,
      default: null,
    })
    format: string;
    @Prop({
      required: true,
      default: null,
    })
    folder: string;
  
}

@Schema()
export class Products extends Document {

  @Prop({
    type: _files,
    default: null,
  })
  photo: _files;

  @Prop({
    required: true,
    default: null
  })
  name: string;

  @Prop({
    required: true,
    default: null,
  })
  price: number;

  @Prop({
    required: true,
    default: null,
  })
  stock: number;

  @Prop({
    type:   Array,
    required: true,
    default: _dateService.setDate(),
  })
  createdAt: string;

  @Prop({
    type: Array,
    default: null,
  })
  updatedAt: string;
}

export const ProductsSchema = SchemaFactory.createForClass(Products)
  .plugin(uniqueValidator, {
    message: "El {PATH} {VALUE} ya está registrado en sistema",
  })
.plugin(mongoosePaginate)
.plugin(aggregatePaginate)
.plugin(castAggregation)
.plugin(mongoose_delete, { overrideMethods: 'all'});
