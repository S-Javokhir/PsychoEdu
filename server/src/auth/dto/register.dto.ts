import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional, IsEnum } from 'class-validator';
import { UserRole } from '@prisma/client';

export class RegisterDto {
  @IsNotEmpty({ message: 'F.I.SH (To‘liq ism) kiritilishi shart' })
  @IsString()
  fullName: string;

  @IsEmail({}, { message: 'Elektron pochta manzili to‘g‘ri formatda bo‘lishi kerak' })
  email: string;

  @IsNotEmpty({ message: 'Parol kiritilishi shart' })
  @MinLength(6, { message: 'Parol kamida 6 ta belgidan iborat bo‘lishi kerak' })
  password: string;

  @IsOptional()
  @IsEnum(UserRole, { message: 'Mavjud bo‘lmagan rol tanlandi' })
  role?: UserRole;

  @IsOptional()
  @IsString()
  facultyOrGroup?: string;
}
