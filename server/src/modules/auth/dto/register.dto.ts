import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty(
    {
      description: 'Your Email'
    }
  )
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty(
    {
      description: 'Min length is 6 word'
    }
  )
  password: string;
}
