import { Injectable, ConflictException } from '@nestjs/common';
import { CreatehomestayDto } from './dto/create-homestay.dto';
import { InjectModel} from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Homestay } from './schemas/homestay.schemars';
import { UpdatehomestayDto } from './dto/update-homestay.dto';

@Injectable()
export class homestayService {
    constructor(
      @InjectModel(Homestay.name) private homestayModel:Model<Homestay>){}
      async Createhomestay(CreatehomestayDto: CreatehomestayDto){
        console.log(CreatehomestayDto)
        try {
            const newhomestay = new this.homestayModel({
                ...CreatehomestayDto,
            });
            return await newhomestay.save();
        } catch (error) {
            throw error;
        }
      }
      gethomestay(){
        return this.homestayModel.find();
      }
      gethomestayById(id: string) {
        return this.homestayModel.findById(id)
      }
      async updatehomestay(id: string, updatehomestayDto: UpdatehomestayDto) {
            const updatedhomestay = await this.homestayModel.findByIdAndUpdate(
                id,
                updatehomestayDto,
                { new: true }
            );
            return updatedhomestay;
        } catch (error) {
            if (error.code === 11000) {
                const field = Object.keys(error.keyPattern)[0];
                throw new ConflictException(`A homestay with this ${field} already exists`);
            }
            throw error;
      }
      deletehomestay(id: string) {
        return this.homestayModel.findByIdAndDelete(id);
      }
}
