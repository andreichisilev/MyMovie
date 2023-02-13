import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/_core/models/Movie';
import { MovieDataService } from 'src/app/_core/services/movie-data.service';
import { MoviesService } from 'src/app/_core/services/movies.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit {
  movieList: any = [];
  movieName: string;
  movieDescription: string;
  movieDirector: string;
  movieRuntime: number;
  movieRating: number;
  searchName: string = '';
  filteredMovieList: any = [];
  selection = 'title';

  // // prettier ignore
  constructor(
    private router: Router,
    private moviesService: MoviesService,
    private movieDataService: MovieDataService
  ) {}

  ngOnInit(): void {
    this.moviesService.getMovies().subscribe((res) => {
      this.movieList = res;
      this.filteredMovieList = this.movieList;
    });
  }

  editMoviePage(movieInfo: any): void {
    this.movieDataService.selectedMovie = movieInfo;
    this.router.navigate(['/dashboard/movie-page'], {
      queryParams: { movieId: movieInfo.id },
    });
  }

  navigateToNewMoviePage(): void {
    this.router.navigate(['/dashboard/new-movie-page']);
  }

  searchByName() {
    if (this.searchName == '') {
      this.filteredMovieList = this.movieList;
    } else {
      this.filteredMovieList = this.filteredMovieList.filter((movie: Movie) =>
        movie.title.toLowerCase().includes(this.searchName.toLowerCase())
      );
      this.searchName = '';
    }
  }

  sort() {
    this.filteredMovieList = this.filteredMovieList.sort(
      (a: Movie, b: Movie) => {
        if (a[this.selection] < b[this.selection]) {
          return -1;
        }
        if (a[this.selection] > b[this.selection]) {
          return 1;
        }

        return 0;
      }
    );
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event) {
    if (!window.localStorage['rememberMe'])
      window.localStorage.removeItem('token');
  }

  logout(): void {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('rememberMe');
    this.router.navigate(['/auth']);
  }
}
