import { Injectable } from '@angular/core';
import { Movie } from '../models/Movie';

@Injectable({
  providedIn: 'root',
})
export class MovieDataService {
  selectedMovie: Movie;

  constructor() {}
}
