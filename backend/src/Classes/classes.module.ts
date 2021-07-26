import { Global, Module } from "@nestjs/common";
import {
  DateProcessService,
  ProcessDataService,
  SetStatusMessageService
} from "./classes.index";

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [DateProcessService, ProcessDataService, SetStatusMessageService],
  exports: [DateProcessService, ProcessDataService, SetStatusMessageService],
})
export class ClassesModule {}
