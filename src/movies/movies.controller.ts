import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'This will return all movies';
  }

  @Get('search')
  search(@Query('year') searchingYear: string) {
    return `We are searching for a movie after ${searchingYear}`;
  }

  @Get('/:id')
  getOne(@Param('id') id: string) {
    return `This will return a movie with ${id}`;
  }

  @Post()
  create(@Body() movieData) {
    return movieData;
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return `This will delete a movie with ${id}`;
  }

  @Patch('/:id')
  patch(@Param('id') id: string, @Body() updateData) {
    return {
      id,
      ...updateData,
    };
  }
}
