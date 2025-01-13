import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, UsePipes, ValidationPipe } from '@nestjs/common';
import { homestayService } from './homestay.service';
import { CreatehomestayDto } from './dto/create-homestay.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {  Types } from 'mongoose';
import { UpdatehomestayDto } from './dto/update-homestay.dto';

@ApiTags('api/homestay')
@Controller('api/homestay')
export class homestayController {
  constructor(private readonly homestayService: homestayService) {}

  @Get()
  @ApiOperation({ summary: 'Get all homestay' })
  @ApiResponse({ status: 200, description: 'Return all homestay.', type: [CreatehomestayDto] })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  gethomestay() {
    return this.homestayService.gethomestay();
  }
  //homestay/:id
  @Get(':id')
  @ApiOperation({ summary: 'Get by ID homestay' })
  @ApiResponse({ status: 200, description: 'Return one homestay.', type: [CreatehomestayDto] })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async gethomestayById(@Param('id') id: string){
      const isValid = Types.ObjectId.isValid(id)
      if(!isValid) throw new HttpException('isValid not found', 404)
      const findhomestay = await this.homestayService.gethomestayById(id);
      if (!findhomestay) throw new HttpException('homestay not found', 404)
      return findhomestay
    }

  @Post()
  @ApiOperation({ summary: 'Create a new homestay' })
  @ApiResponse({ status: 201, description: 'The homestay has been successfully created.', type: CreatehomestayDto })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createhomestayDto: CreatehomestayDto) {
    console.log(createhomestayDto)
    return this.homestayService.Createhomestay(createhomestayDto);
  }
  @Patch(':id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'update a new homestay' })
  @ApiResponse({ status: 201, description: 'update homestay successfully', type: UpdatehomestayDto })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async updatehomestay(@Param('id') id: string, @Body() updatehomestayDto: UpdatehomestayDto) {
    console.log(updatehomestayDto)
    const isValid = Types.ObjectId.isValid(id);
    if(!isValid) throw new HttpException('Invalid ID format', 404);
    
    const updatedhomestay = await this.homestayService.updatehomestay(id, updatehomestayDto);
    if (!updatedhomestay) throw new HttpException('homestay not found', 404);
    
    return updatedhomestay;
  }
  @Delete(':id')
  @ApiOperation({ summary: 'delete a new homestay' })
  @ApiResponse({ status: 201, description: 'Delete homestay successfully'})
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async deletehomestay(@Param('id') id: string) {
    const isValid = Types.ObjectId.isValid(id);
    if(!isValid) throw new HttpException('Invalid ID format', 404);
    const deletedhomestay = await this.homestayService.deletehomestay(id);
    if (!deletedhomestay) throw new HttpException('homestay not found', 404);
    return deletedhomestay;
  }
}

