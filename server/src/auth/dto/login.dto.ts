import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Elektron pochta manzili to‘g‘ri formatda bo‘lishi kerak' })
  email: string;

  @IsNotEmpty({ message: 'Parol kiritilishi shart' })
  @IsString()
  password: string;
}
