import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieDataService } from '../../_core/services/movie-data.service';
import { MoviesService } from '../../_core/services/movies.service';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.scss'],
})
export class MoviePageComponent implements OnInit {
  movieName: string;
  movieDescription: string;
  movieDirector: string;
  movieRuntime: number;
  movieRating: number;
  form: UntypedFormGroup;

  // prettier ignore
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private movieDataService: MovieDataService,
    private moviesService: MoviesService,
    private fb: UntypedFormBuilder
  ) {
    // get id from the url and use it to receive game details
    this.getMovieInfo(this.activatedRoute.snapshot.queryParams['movieId']);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      movieName: ['', [Validators.required]],
      movieDirector: ['', [Validators.required]],
      movieDescription: ['', [Validators.required]],
      movieRuntime: ['', [Validators.required]],
      movieRating: ['', [Validators.required]],
    });
  }

  getMovieInfo(id: number): void {
    this.moviesService.getMovieInfo(id).subscribe({
      next: (response) => {
        this.movieName = response.title;
        this.movieDescription = response.description;
        this.movieDirector = response.director;
        this.movieRuntime = response.runtime;
        this.movieRating = response.rating;
      },
    });
  }

  editMovie(): void {
    // we also need to send the id together with the updated information
    const movieInfo = {
      id: this.activatedRoute.snapshot.queryParams['movieId'],
      title: this.movieName,
      description: this.movieDescription,
      director: this.movieDirector,
      runtime: this.movieRuntime,
      rating: this.movieRating,
    };
    // We don't write anything in the subscribe method because we only want to send the updated info to the database
    this.moviesService.updateMovie(movieInfo).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
    });
  }

  deleteMovie(): void {
    const movieId = this.activatedRoute.snapshot.queryParams['movieId'];
    this.moviesService.deleteMovie(movieId).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
    });
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.form.reset();
    for (const key in this.form.controls) {
      if (this.form.controls.hasOwnProperty(key)) {
        this.form.controls[key].markAsPristine();
        this.form.controls[key].updateValueAndValidity();
      }
    }
  }
}
