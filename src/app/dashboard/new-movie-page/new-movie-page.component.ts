import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { MoviesService } from 'src/app/_core/services/movies.service';

@Component({
  selector: 'app-new-movie-page',
  templateUrl: './new-movie-page.component.html',
  styleUrls: ['./new-movie-page.component.scss'],
})
export class NewMoviePageComponent implements OnInit {
  movieList: any = [];
  movieName: string;
  movieDescription: string;
  movieDirector: string;
  movieRuntime: number;
  movieRating: number;
  movieInfo: any = [];

  //constructor(private router: Router, private moviesService: MoviesService) {}

  // addNewMovie() {
  //   const movieInfo = {
  //     title: this.movieName,
  //     description: this.movieDescription,
  //     director: this.movieDirector,
  //     runtime: this.movieRuntime,
  //     rating: this.movieRating,
  //   };
  //   this.clickedEdit.emit(movieInfo);
  //   console.log('am trimis din n-m-p.');
  // }

  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private moviesService: MoviesService
  ) {}

  addNewMovie(): void {
    const formValue = this.form.value;

    const movieInfo = {
      title: formValue.movieName,
      description: formValue.movieDescription,
      director: formValue.movieDirector,
      runtime: formValue.movieRuntime,
      rating: formValue.movieRating,
    };

    this.moviesService.addMovie(movieInfo).subscribe((res) => {
      this.movieList.push(res);
      this.router.navigate(['/dashboard']);
    });
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

  /////////
  form: UntypedFormGroup;

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
