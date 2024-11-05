import { IsNotEmpty, IsString, IsArray, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
    @ApiProperty({ description: 'The post title' })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({ description: 'The post content' })
    @IsNotEmpty()
    @IsString()
    content: string;

    @ApiProperty({ description: 'Post tags', required: false })
    @IsOptional()
    @IsArray()
    tags?: string[];

    @ApiProperty({ description: 'Avatar URLs', required: false })
    @IsOptional()
    @IsArray()
    avatars?: string[];
}