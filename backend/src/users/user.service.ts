import { Injectable, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel} from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/User.schemars';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
      @InjectModel(User.name) private userModel:Model<User>){}
      async CreateUser(CreateUserDto: CreateUserDto){
        try {
            const hashedPassword = await bcrypt.hash(String(CreateUserDto.password), 10);
            const newUser = new this.userModel({
                ...CreateUserDto,
                password: hashedPassword,
            });
            return await newUser.save();
        } catch (error) {
            if (error.code === 11000) {
                // Extract the duplicate field from the error message
                const field = Object.keys(error.keyPattern)[0];
                throw new ConflictException(`A user with this ${field} already exists`);
            }
            throw error;
        }
      }
      getUser(){
        return this.userModel.find();
      }
      getUserById(id: string) {
        return this.userModel.findById(id)
      }
      async updateUser(id: string, updateUserDto: UpdateUserDto) {
        try {
            if (updateUserDto.password) {
                updateUserDto.password = await bcrypt.hash(String(updateUserDto.password), 10);
            }
            
            const updatedUser = await this.userModel.findByIdAndUpdate(
                id,
                updateUserDto,
                { new: true }
            );
            return updatedUser;
        } catch (error) {
            if (error.code === 11000) {
                const field = Object.keys(error.keyPattern)[0];
                throw new ConflictException(`A user with this ${field} already exists`);
            }
            throw error;
        }
      }
      deleteUser(id: string) {
        return this.userModel.findByIdAndDelete(id);
      }
}
