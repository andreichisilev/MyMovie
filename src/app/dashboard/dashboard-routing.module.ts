import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { MoviePageComponent } from './movie-page/movie-page.component';
import { NewMoviePageComponent } from './new-movie-page/new-movie-page.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardPageComponent,
    pathMatch: 'full',
  },
  {
    path: 'movie-page',
    component: MoviePageComponent,
  },
  {
    path: 'new-movie-page',
    component: NewMoviePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
