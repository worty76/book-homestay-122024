import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class review {
    @ApiProperty({ example: '123', description: 'The ID of the user who created the review (foreign key)' })
    user_id: ObjectId;

    @ApiProperty({ example: '456', description: 'The ID of the homestay being reviewed (foreign key)' })
    homestay_id: ObjectId;

    @ApiProperty({ example: 4.5, description: 'The rating given in the review, between 1 and 5' })
    rating: number;

    @ApiProperty({ example: 'A beautiful villa overlooking the beach.', description: 'A detailed comment about the homestay' })
    comment: string;
}