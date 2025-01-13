import { IsDecimal, IsInt, IsNotEmpty, IsOptional, IsString, IsUrl, IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from '@nestjs/swagger';

export class CreatehomestayDto {
    @ApiProperty({ example: 'Sunset Villa', description: 'The name of the homestay' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ example: '123 Beach Road, Malibu, CA', description: 'The location of the homestay' })
    @IsNotEmpty()
    @IsString()
    location: string;

    @ApiProperty({ example: 'A beautiful villa overlooking the beach.', description: 'A detailed description of the homestay' })
    @IsOptional()
    @IsString()
    description: string;

    @ApiProperty({ example: 199.99, description: 'The price per night for staying at the homestay' })
    @IsNotEmpty()
    @IsDecimal({ decimal_digits: '2' })
    price_per_night: number;

    @ApiProperty({ example: 10, description: 'The number of rooms available at the homestay' })
    @IsNotEmpty()
    @IsInt()
    available_rooms: number;

    @ApiProperty({
        example: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
        description: 'A list of image URLs for the homestay',
        type: [String],
    })
    @IsOptional()
    @IsArray()
    images: string[];
}
