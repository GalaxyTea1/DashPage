import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class InfoDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  token: string;
}
