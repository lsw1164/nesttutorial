import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesModule } from './movies.module';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MoviesModule],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array', () => {
      expect(service.getAll()).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return an array', () => {
      service.createOne({ title: 'Test Movie', genres: ['test'], year: 2000 });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it('should throw NotFoundException', () => {
      const id = 999;
      try {
        service.getOne(id);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`Movie with ID ${id} not found`);
      }
    });
  });

  describe('createOne', () => {
    it('deletes a movie', () => {
      const beforeMovieCount = service.getAll().length;
      service.createOne({ title: 'Test Movie', genres: ['test'], year: 2000 });
      const afterMovieCount = service.getAll().length;
      expect(beforeMovieCount + 1).toEqual(afterMovieCount);
    });
  });

  describe('deleteOne', () => {
    it('deletes a movie', () => {
      service.createOne({ title: 'Test Movie', genres: ['test'], year: 2000 });
      const beforeMovieCount = service.getAll().length;
      service.deleteOne(1);
      const afterMovieCount = service.getAll().length;
      expect(beforeMovieCount - 1).toEqual(afterMovieCount);
    });
    it('should throw NotFoundException', () => {
      const id = 999;
      try {
        service.deleteOne(id);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`Movie with ID ${id} not found`);
      }
    });
  });

  describe('update', () => {
    it('update a movie', () => {
      service.createOne({ title: 'Test Movie', genres: ['test'], year: 2000 });
      const updatedTitle = 'Updated Test Movie';
      service.update(1, { title: updatedTitle });
      expect(service.getOne(1).title).toEqual(updatedTitle);
    });

    it('should throw NotFoundException', () => {
      const id = 999;
      try {
        service.update(id, {});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`Movie with ID ${id} not found`);
      }
    });
  });
});
