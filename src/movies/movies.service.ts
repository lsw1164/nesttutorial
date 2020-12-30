import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  validateId(id: number) {
    const movie = this.movies.find((movie) => movie.id === id);
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }
  }

  getOne(id: number): Movie {
    this.validateId(id);
    return this.movies.find((movie) => movie.id === id);
  }

  deleteOne(id: number): void {
    this.validateId(id);
    this.movies = this.movies.filter((movie) => movie.id !== id);
  }

  createOne(movieData: CreateMovieDto) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }

  update(id: number, updateData: UpdateMovieDto) {
    this.validateId(id);
    this.movies = this.movies.map((movie) =>
      movie.id === id ? { ...movie, ...updateData } : movie,
    );
    return this.movies;
  }
}
