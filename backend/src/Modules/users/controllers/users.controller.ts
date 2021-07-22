import {
  Controller,
  Get,
  Body,
  Post,
  Request,
  UploadedFile,
  UploadedFiles,
  Response,
  Param,
  Put,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from "@nestjs/common";

import { Users } from '../models/schemas/userSchema';

import {
  FileInterceptor,
  FileFieldsInterceptor,
  AnyFilesInterceptor,
} from "@nestjs/platform-express";

import { responseInterface } from "src/Response/interfaces/interfaces.index";

import { UsersService } from "../services/services.index";
import { updateUserDto } from "../models/dto/user.dto";
import {AuthGuard} from "@nestjs/passport";

@Controller("users")
export class UsersController {
  _Response: responseInterface;

  constructor(private _userService: UsersService) {}

  @Get("hello")
  async hello(){ return "hello this is route users by teddy" }

  //@UseGuards(AuthGuard('jwt'))
  @Get(":id")
  async getOneUser( @Param("id") id: string, @Response() res: any ): Promise<responseInterface>
  {
    this._Response = await this._userService.getOne(id);

    return res.status(this._Response.status).json(this._Response);
  }

  //@UseGuards(AuthGuard('jwt'))
  @Get()
  async getUsers(@Response() res: any, @Request() req: any ): Promise<responseInterface>
  {

    this._Response = await this._userService.getAll(req.page);

    return res.status(this._Response.status).json(this._Response);
  }

  //@UseGuards(AuthGuard('jwt'))
  @Post()
  async setUsers(@Body() body:Users, @Response() res:any ): Promise<responseInterface>
  {
    this._Response = await this._userService.saveUser(body);

    return res.status(this._Response.status).json(this._Response);
  }

  //@UseGuards(AuthGuard('jwt'))
  @Put(':id')
  @UsePipes(ValidationPipe)
  async modifyUsers(@Body() user: updateUserDto, @Param('id') id:string, @Response() res:any)
  {
    this._Response = await this._userService.updateUsers(user, id);

    return res.status(this._Response.status).json(this._Response);
  }

  //@UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteUsers(@Param('id') id:string, @Response() res:any)
  {
    this._Response = await this._userService.deleteUsers(id);

    return res.status(this._Response.status).json(this._Response);
  }
}