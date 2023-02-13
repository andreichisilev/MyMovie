import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { MoviePageComponent } from './movie-page/movie-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewMoviePageComponent } from './new-movie-page/new-movie-page.component';

@NgModule({
  declarations: [
    MovieCardComponent,
    DashboardPageComponent,
    MoviePageComponent,
    NewMoviePageComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NzCardModule,
    NzButtonModule,
    FormsModule,
    NzInputModule,
    NzSelectModule,
    NzFormModule,
    ReactiveFormsModule,
    NzRateModule,
    NzIconModule,
  ],
})
export class DashboardModule {}
