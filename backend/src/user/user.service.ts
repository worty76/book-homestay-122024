import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { User } from './schemas/User.schemars';

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
}
