import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, UsePipes, ValidationPipe } from '@nestjs/common';
import { reviewService } from './review.service';
import { CreatereviewDto } from './dto/create-review.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {  Types } from 'mongoose';
import { UpdatereviewDto } from './dto/update-review.dto';

@ApiTags('api/review')
@Controller('api/review')
export class reviewController {
  constructor(private readonly reviewService: reviewService) {}

  @Get()
  @ApiOperation({ summary: 'Get all review' })
  @ApiResponse({ status: 200, description: 'Return all review.', type: [CreatereviewDto] })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  getreview() {
    return this.reviewService.getreview();
  }
  //review/:id
  @Get(':id')
  @ApiOperation({ summary: 'Get by ID review' })
  @ApiResponse({ status: 200, description: 'Return one review.', type: [CreatereviewDto] })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async getreviewById(@Param('id') id: string){
      const isValid = Types.ObjectId.isValid(id)
      if(!isValid) throw new HttpException('isValid not found', 404)
      const findreview = await this.reviewService.getreviewById(id);
      if (!findreview) throw new HttpException('review not found', 404)
      return findreview
    }

  @Post()
  @ApiOperation({ summary: 'Create a new review' })
  @ApiResponse({ status: 201, description: 'The review has been successfully created.', type: CreatereviewDto })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createreviewDto: CreatereviewDto) {
    console.log(createreviewDto)
    return this.reviewService.Createreview(createreviewDto);
  }
  @Patch(':id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'update a new review' })
  @ApiResponse({ status: 201, description: 'update review successfully', type: UpdatereviewDto })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async updatereview(@Param('id') id: string, @Body() updatereviewDto: UpdatereviewDto) {
    console.log(updatereviewDto)
    const isValid = Types.ObjectId.isValid(id);
    if(!isValid) throw new HttpException('Invalid ID format', 404);
    
    const updatedreview = await this.reviewService.updatereview(id, updatereviewDto);
    if (!updatedreview) throw new HttpException('review not found', 404);
    
    return updatedreview;
  }
  @Delete(':id')
  @ApiOperation({ summary: 'delete a new review' }) 
  @ApiResponse({ status: 201, description: 'Delete review successfully'})
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async deletereview(@Param('id') id: string) {
    const isValid = Types.ObjectId.isValid(id);
    if(!isValid) throw new HttpException('Invalid ID format', 404);
    const deletedreview = await this.reviewService.deletereview(id);
    if (!deletedreview) throw new HttpException('review not found', 404);
    return deletedreview;
  }
}

