import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { User } from './schemas/User.schemars';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(
      @InjectModel(User.name) private userModel:Model<User>){}
      CreateUser(CreateUserDto: CreateUserDto){
        const newUser = new this.userModel(CreateUserDto)
        return newUser.save()
      }
      getUser(){
        return this.userModel.find();
      }
      getUserById(id: string) {
        return this.userModel.findById(id)
      }
      updateUser(id: string, updateUserDto: UpdateUserDto) {
        const updatedUser = this.userModel.findByIdAndUpdate(
            id,
            updateUserDto,
            { new: true }
        );
        return updatedUser;
      }
      deleteUser(id: string) {
        return this.userModel.findByIdAndDelete(id);
      }
}
