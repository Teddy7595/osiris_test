import { CanActivate, ExecutionContext, Injectable, Param } from '@nestjs/common';
import { UsersService } from 'src/Modules/users/services/users.service';
import { responseInterface } from 'src/Response/interfaces/interfaces.index';

@Injectable()
export class ReferenceGuard implements CanActivate
{

  private _ResponseRol:responseInterface;
  private _ResponseUsr:responseInterface;
  private _Result:boolean;

  constructor
  (
    private readonly _userService:UsersService,

  ){ this._Result = false; }

  async canActivate( context: ExecutionContext ): Promise<boolean>
  {
    let reference: any = context.switchToHttp().getRequest();

    this._ResponseUsr = await this._userService.getOne(reference.params.ref);

    if(reference.params)
    {

      if(!this._ResponseUsr.ok)
      {

        this._Result = false;

      }else if(this._ResponseUsr.data.email === 'admin@admin.com'){

        console.log('aprobado');
        this._Result = true;
      }

      return this._Result;
    }
  }
}
