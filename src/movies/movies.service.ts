import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  validateId(id: string) {
    const movie = this.movies.find((movie) => movie.id === parseInt(id));
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }
  }

  getOne(id: string): Movie {
    this.validateId(id);
    return this.movies.find((movie) => movie.id === parseInt(id));
  }

  deleteOne(id: string): void {
    this.validateId(id);
    this.movies = this.movies.filter((movie) => movie.id !== parseInt(id));
  }

  createOne(movieData) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }

  update(id: string, updateData) {
    this.validateId(id);
    this.movies = this.movies.map((movie) =>
      movie.id === parseInt(id) ? { ...movie, ...updateData } : movie,
    );
    return this.movies;
  }
}
