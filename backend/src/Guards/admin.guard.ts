import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate 
{
  private _Response:boolean = true;

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> 
  {
    const request = context.switchToHttp().getRequest();

    const { user } = request;

    (user.email.includes('@admin.com'))? this._Response = true : this._Response = false;

    return this._Response;
  }
}
