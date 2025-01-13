import { ApiProperty } from '@nestjs/swagger';

export class homestay {
     @ApiProperty({ example: 'Sunset Villa', description: 'The name of the homestay' })
        name: string;
    
        @ApiProperty({ example: '123 Beach Road, Malibu, CA', description: 'The location of the homestay' })
        location: string;
    
        @ApiProperty({ example: 'A beautiful villa overlooking the beach.', description: 'A detailed description of the homestay' })
        description: string;
    
        @ApiProperty({ example: 199.99, description: 'The price per night for staying at the homestay' })
        price_per_night: number;
    
        @ApiProperty({ example: 10, description: 'The number of rooms available at the homestay' })
        available_rooms: number;
    
        @ApiProperty({
            example: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
            description: 'A list of image URLs for the homestay',
            type: [String],
        })
        images: string[];
}