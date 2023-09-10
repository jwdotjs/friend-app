import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserCreateDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;
}

export class UserUpdateDto {
  @IsEmail()
  email?: string;

  @IsString()
  firstName?: string;

  @IsString()
  lastName?: string;
}
