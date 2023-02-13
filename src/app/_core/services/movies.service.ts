import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private readonly serverUrl = 'http://localhost:3000';
  constructor(private httpClient: HttpClient) {}

  getMovies(): Observable<any> {
    return this.httpClient.get(`${this.serverUrl}/movies`);
  }

  getMovieInfo(id: number): Observable<any> {
    return this.httpClient.get(`${this.serverUrl}/movies/${id}`);
  }

  addMovie(movieInfo: any): Observable<any> {
    return this.httpClient.post(`${this.serverUrl}/movies`, movieInfo);
  }

  updateMovie(movieInfo: any): Observable<any> {
    return this.httpClient.put(
      `${this.serverUrl}/movies/${movieInfo.id}`,
      movieInfo
    );
  }

  deleteMovie(movieId: number): Observable<any> {
    return this.httpClient.delete(`${this.serverUrl}/movies/${movieId}`);
  }
}
