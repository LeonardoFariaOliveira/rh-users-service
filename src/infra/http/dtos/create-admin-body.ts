import {
    IsNotEmpty,
    IsUUID,
    Length,
    IsString,
    IsEmpty,
    IsDate,
    IsBoolean,
    IsEmail,
    IsOptional,
  } from 'class-validator';
  
  export class CreateAdminBody {
    @Length(3, 70)
    name: string;
  }
  