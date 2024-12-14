import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {  Types } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('api/user')
@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get all user' })
  @ApiResponse({ status: 200, description: 'Return all user.', type: [CreateUserDto] })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  getUser() {
    return this.userService.getUser();
  }
  //user/:id
  @Get(':id')
  @ApiOperation({ summary: 'Get by ID user' })
  @ApiResponse({ status: 200, description: 'Return one user.', type: [CreateUserDto] })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async getUserById(@Param('id') id: string){
      const isValid = Types.ObjectId.isValid(id)
      if(!isValid) throw new HttpException('isValid not found', 404)
      const findUser = await this.userService.getUserById(id);
      if (!findUser) throw new HttpException('User not found', 404)
      return findUser
    }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.', type: CreateUserDto })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.CreateUser(createUserDto);
  }
  @Patch(':id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'update a new user' })
  @ApiResponse({ status: 201, description: 'update user successfully', type: UpdateUserDto })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const isValid = Types.ObjectId.isValid(id);
    if(!isValid) throw new HttpException('Invalid ID format', 404);
    
    const updatedUser = await this.userService.updateUser(id, updateUserDto);
    if (!updatedUser) throw new HttpException('User not found', 404);
    
    return updatedUser;
  }
  @Delete(':id')
  @ApiOperation({ summary: 'delete a new user' })
  @ApiResponse({ status: 201, description: 'Delete user successfully'})
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async deleteUser(@Param('id') id: string) {
    const isValid = Types.ObjectId.isValid(id);
    if(!isValid) throw new HttpException('Invalid ID format', 404);
    const deletedUser = await this.userService.deleteUser(id);
    if (!deletedUser) throw new HttpException('User not found', 404);
    return deletedUser;
  }
}