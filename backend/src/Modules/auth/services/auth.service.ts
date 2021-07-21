import {
  Injectable
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { SignupDto, SigninDto, sessionDTO } from '../dto';


import { compare, compareSync } from 'bcryptjs';
import { IJwtPayload } from '../jwt-payload.interface';

import { InjectModel } from '@nestjs/mongoose';
import { Users } from 'src/Modules/users/models/schemas/userSchema';
import { Model } from "mongoose";

import { genSalt, hash } from 'bcryptjs';
import { responseInterface, _argsFind, _argsUpdate } from 'src/Response/interfaces/interfaces.index';
import { DateProcessService, ProcessDataService } from 'src/Classes/classes.index';
import { UserDto } from 'src/Modules/users/models/dto/user.dto';




@Injectable()
export class AuthService {

  _Response: responseInterface;

  constructor(
    @InjectModel(Users.name) private UsersModel: Model<Users>,
    private readonly _jwtService: JwtService,
    private _processData: ProcessDataService,
    private _dateProcessService: DateProcessService
  ) {}

  async signup(signupDto: SignupDto): Promise<responseInterface>
  {

    const { email, pass, name  } = signupDto;

    const user = new this.UsersModel(signupDto);
    const salt = await genSalt(15);
    user.pass = await hash(pass, salt);

    await this._processData._saveDB(user).then((r: responseInterface) =>
    {
      this._Response = r;
      this._Response.message = 'Usuario registrado'
    }, (err: responseInterface) => {

      this._Response = err;

      if( (err.err.errors) && err.err.errors.email.kind == 'unique'){

        this._Response.message = err.err.errors.email.properties.message;

      }


    });
    return this._Response;

  }

  async signin(signinDto: SigninDto): Promise<responseInterface>
  {
    const { email, pass } = signinDto;

    const args: _argsFind = 
    {
      findObject: 
      {
        email: email
      }
    }
    await this._processData._findOneDB(this.UsersModel, args).then(async (r: responseInterface) =>
    {
      this._Response = r;

      if (!compareSync(pass, r.data.pass))
      {

        this._Response = {
          ok: false,
          status: 400,
          message: 'Contraseña incorrecta'
        };

      } else
      {

        const payload: IJwtPayload = {
          _id: r.data._id,
          email: r.data.email,
          status: r.data.status,
        };


        console.log('payload', payload);

        const token = await this._jwtService.sign(payload);
        const userData: sessionDTO = 
        {
          _id: r.data._id,
          name: r.data.name,
          last_name: r.data.last_name,
          dir_domicilio: r.data.dir_domicilio,
          email: r.data.email,
          token: token,
          createdAt: r.data.createdAt,
          updatedAt: r.data.updatedAt
        }
        this._Response.data = userData;

        this._Response.message = `Te damos la bienvenida, ${r.data.name}`;

        await this.updateLastSession(r.data._id).then();

        let x = 
        {
          _idUser: userData._id,
          name: userData.name,
          last_name: userData.last_name,
        }

      }

    }, (err: responseInterface) =>
    {
      this._Response = err;
      this._Response.message = (err.status != 500)?`Usuario o contraseña inválidos`: 'Algo ha salido mal, intente más tarde';
    })

    // console.log('prueba', this._Response);


    return this._Response;

  }



  updateLastSession(id: string){

    return new Promise( async (resolve, reject) =>{


      const data = {
        last_session: this._dateProcessService.setDate()
      }

      const args: _argsUpdate = {
        findObject: {
          _id: id,
        },
        set: {
          $set: data
        },
        populate: {
          path: 'rol',
          select: 'alias'
        }
      }

      await this._processData._updateDB(this.UsersModel, args).then( async r => {


        // console.log('sesion actualizada en fecha', data);
        resolve(true);

      }, err => {
        console.log( 'hay error', err );
        reject(false);
      });

    });

  }


}




