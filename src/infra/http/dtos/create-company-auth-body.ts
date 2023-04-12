import { IsEmail, Length } from 'class-validator';

//This class validate the body as a middleware
export class CreateCompanyAuthBody {
  @IsEmail()
  @Length(15, 120, {
    message: 'Email inválido',
  })
  email: string;

  @Length(8, 15, {
    message: 'Senha inválida',
  })
  password: string;
}
