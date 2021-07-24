import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Users } from "../models/schemas/userSchema";

// servicios de response handler y process data
import { responseInterface, _argsFind } from "src/Response/interfaces/interfaces.index";

import { ProcessDataService, DateProcessService } from "src/Classes/classes.index";

import { _configPaginator, _dataPaginator, _argsPagination, _argsUpdate} from 'src/Response/interfaces/interfaces.index';
import { updateUserDto } from "../models/dto/user.dto";
import { sessionDTO } from "src/Modules/auth/dto";

@Injectable()
export class UsersService
{

  private _Response: responseInterface;

  constructor
  (

    @InjectModel(Users.name) private UsersModel: Model<Users>,
    private _processData: ProcessDataService,
    private _dateProcessService: DateProcessService

  ){}


  async getAll(page:number): Promise<responseInterface> 
  {

    const parameters: _dataPaginator = 
    { // <- paginate parameters

      page: page || _configPaginator.page,
      limit: 12 || _configPaginator.limit,
      customLabels: _configPaginator.customLabels,
      sort: { _id: -1 }
    }

    const args: _argsPagination = 
    {

      findObject: {},
      options: parameters

    }

    await this._processData._findDB(this.UsersModel, args).then(r => 
    {
      this._Response = r;

    }, err => 
    {
      this._Response = err;
      this._Response.message = "No existe datos al respescto"
    });

    return this._Response;

  }

  async getOne(id: string): Promise<responseInterface> 
  {

    const args: _argsFind = 
    {
      findObject: 
      {
        _id: id,
      }
    }

    await this._processData._findOneDB(this.UsersModel, args).then((r: responseInterface) => 
    {
      this._Response = r;

    }, (err: responseInterface) => 
    {
      this._Response = err;
      this._Response.message = err.message || 'Usuario inexistente'
    });

    return this._Response;
  }

  async saveUser(user:Users): Promise<responseInterface>
  {
    const data = new this.UsersModel(user);

    await this._processData._saveDB(data).then(r =>
    {
      this._Response = r;
    }, err =>
    {
      this._Response = err;
    });

    return this._Response;
  }

  async updateUsers(user:updateUserDto, id:string): Promise<responseInterface>
  {
    
    // se crea un objeto con los nuevos valores
    const data: updateUserDto = 
    {

      name: user.name,
      last_name: user.last_name,
      dir_domicilio:user.dir_domicilio,
      email: user.email,
      pass: user.pass,
      updatedAt: this._dateProcessService.setDate(),
    }

    // se crea el objeto de argumentos con el id de busqueda en especifico y la data a reemplazar en set
    const args: _argsUpdate = 
    {
      findObject: 
      {
        _id: id,
      },
      set: 
      {
        $set: data
      }
    }

    await this._processData._updateDB(this.UsersModel, args).then( async (r: responseInterface) => 
    {

      const userData: sessionDTO = 
      {
          _id: r.data._id,
          name: r.data.name,
          last_name: r.data.last_name,
          dir_domicilio: r.data.dir_domicilio,
          email: r.data.email,
          token: null,
          createdAt: r.data.createdAt,
          updatedAt: r.data.updatedAt
        }

      this._Response = r;
      this._Response.data = userData;
      this._Response.message = 'Información actualizada';


    }, (err: responseInterface) => 
    {

      this._Response = err;
      this._Response.message = err.message || 'No se pudo actualizar la información';
    });

    return this._Response;
  }

  async deleteUsers(id:string):Promise<responseInterface>
  {
    await this._processData._deleteSoftDB(this.UsersModel, id ).then((r: responseInterface)  => 
    {

      this._Response = r;
      this._Response.message = 'Usuario eliminado';

    }, (err:responseInterface) => 
    {
      this._Response = err;
      this._Response.ok = false;
      this._Response.data = [];
      this._Response.err = err.message;
      this._Response.message = err.message || 'No se pudo eliminar al usuario';
    });

    return this._Response;
  }




}

