import { ApiProperty } from '@nestjs/swagger';

export class User {
    @ApiProperty({ example: 'hac Doe', description: 'The name of the user' })
    username: string;

    @ApiProperty({ example: 1234567890, description: 'The phone number of the user' })
    phone: number;

    @ApiProperty({ example: 'john@example.com', description: 'The email of the user' })
    email: string;

    @ApiProperty({ example: 'password123', description: 'The password of the user' })
    password: string;
}