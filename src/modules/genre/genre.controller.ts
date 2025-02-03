import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { GenreService } from './genre.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from './entities/genre.entity';

@ApiTags('Quản lý thể loại sách')
@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Get()
  getAll(): Promise<Genre[]> {
    return this.genreService.findAll();
  }

  @Post()
  createOne(@Body() createGenreDto: CreateGenreDto): Promise<Genre> {
    return this.genreService.createOne(createGenreDto);
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number): Promise<Genre> {
    return this.genreService.findOne(id);
  }

  @Put(':id')
  updateOne(@Param('id', ParseIntPipe) id: number, @Body() updateGenreDto: UpdateGenreDto): Promise<Genre> {
    return this.genreService.updateOne(id, updateGenreDto);
  }

  @Delete(':id')
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.genreService.deleteOne(id);
  }
}
