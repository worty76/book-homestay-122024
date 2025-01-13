import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { CreatereviewDto } from './dto/create-review.dto';
import { InjectModel} from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { review } from './schemas/review.schemars';
import { UpdatereviewDto } from './dto/update-review.dto';

@Injectable()
export class reviewService {
    constructor(
      @InjectModel(review.name) private reviewModel:Model<review>){}
      async Createreview(CreatereviewDto: CreatereviewDto){
        console.log(CreatereviewDto)
        try {
            const newreview = new this.reviewModel({
                ...CreatereviewDto,
            });
            return await newreview.save();
        } catch (error) {
            throw error;
        }
      }
      getreview(){
        return this.reviewModel.find();
      }
      getreviewById(id: string) {
        return this.reviewModel.findById(id)
      }
      async updatereview(id: string, updatereviewDto: UpdatereviewDto) {
        try {
            const updatedreview = await this.reviewModel.findByIdAndUpdate(
                id,
                updatereviewDto,
                { new: true }
            );
    
            if (!updatedreview) {
                throw new NotFoundException(`Review with id ${id} not found`);
            }
    
            return updatedreview;
        } catch (error) {
            if (error.code === 11000) {
                const field = Object.keys(error.keyPattern)[0];
                throw new ConflictException(`A review with this ${field} already exists`);
            }
    
            throw error;
        }
    }    
      deletereview(id: string) {
        return this.reviewModel.findByIdAndDelete(id);
      }
}
