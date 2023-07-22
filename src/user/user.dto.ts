import { IsEmail, IsOptional, IsString } from "class-validator";

export class UserDto {
    @IsEmail()
    email: string

    @IsOptional()
    password: string

    @IsString()
    name: string
    
    @IsString()
    address: string

    @IsString()
    avatarPath: string
}