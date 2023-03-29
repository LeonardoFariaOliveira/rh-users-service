import { Length } from 'class-validator';

//This class validate the body as a middleware
export class CreateAdminAuthBody {
  @Length(9)
  user: string;

  @Length(9)
  password: string;
}
