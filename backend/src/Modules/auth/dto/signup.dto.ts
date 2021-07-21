import { IsNotEmpty, IsString } from 'class-validator';

export class SignupDto {


  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsString()
  dir_domicilio: string;

  @IsNotEmpty()
  @IsString()
  email: string;
  
  @IsNotEmpty()
  @IsString()
  pass: string;


}
