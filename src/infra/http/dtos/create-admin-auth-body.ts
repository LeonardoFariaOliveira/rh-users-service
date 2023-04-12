import { Length } from 'class-validator';

//This class validate the body as a middleware
export class CreateAdminAuthBody {
  @Length(9, 9, {
    message: 'Acesso inválido',
  })
  user: string;

  @Length(9, 9, {
    message: 'Senha inválida',
  })
  password: string;
}
