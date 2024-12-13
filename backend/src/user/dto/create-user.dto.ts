import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    username: string;
    @IsNumber()
    phone: number;
    @IsString()
    @IsEmail()
    email: String;
    @IsString()
    password: String;
}
