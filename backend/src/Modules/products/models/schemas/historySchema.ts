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


@Schema()
export class History extends Document {

  @Prop({
    required: true,
    default: null,
  })
  userId: string;

  @Prop({
    required: true,
    default: null,
  })
  productId: string;

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

export const HistorySchema = SchemaFactory.createForClass(History)
  .plugin(uniqueValidator, {
    message: "El {PATH} {VALUE} ya está registrado en sistema",
  })
.plugin(mongoosePaginate)
.plugin(aggregatePaginate)
.plugin(castAggregation)
.plugin(mongoose_delete, { overrideMethods: 'all' });
