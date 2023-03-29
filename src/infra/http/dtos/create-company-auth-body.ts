import { IsEmail, Length } from 'class-validator';

//This class validate the body as a middleware
export class CreateCompanyAuthBody {
  @IsEmail()
  @Length(15, 120)
  email: string;

  @Length(8, 15)
  password: string;
}
