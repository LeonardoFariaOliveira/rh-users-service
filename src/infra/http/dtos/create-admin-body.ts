import { Length } from 'class-validator';

//This class validate the body as a middleware
export class CreateAdminBody {
  @Length(3, 70)
  name: string;
}
