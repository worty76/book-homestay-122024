import { Module } from '@nestjs/common';
import { reviewService } from './review.service';
import { reviewController } from './review.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { review, reviewSchema} from 'src/reviews/schemas/review.schemars';

@Module({
  imports: [MongooseModule.forFeature([{
    name: review.name,
    schema: reviewSchema,
  }])],
  controllers: [reviewController],
  providers: [reviewService],
})
export class reviewModule {}
