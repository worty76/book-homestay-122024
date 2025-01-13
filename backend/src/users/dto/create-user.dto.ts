import { IsArray, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateIf } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { RoleUserEnum } from "src/util/enum/user-enum";

export class CreateUserDto {
    @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty({ example: 1234567890, description: 'The phone number of the user' })
    @IsNumber()
    phone: number;

    @ApiProperty({ example: 'john@example.com', description: 'The email of the user' })
    @IsString()
    @IsEmail()
    email: String;

    @ApiProperty({ example: 'password123', description: 'The password of the user' })
    @IsString()
    password: String;
    
    @ValidateIf((o)=>o.Role === RoleUserEnum.USER)
    @IsOptional()
    @IsArray()
    userRole: any[]
}
