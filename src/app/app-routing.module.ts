import { SearchEngineComponent } from './search-engine/search-engine.component';
import { PersonDetailsComponent } from './person-details/person-details.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PopularMoviesComponent } from './popular-movies/popular-movies.component';
import { PopularMoviesInTheGenreComponent } from './popular-movies-in-the-genre/popular-movies-in-the-genre.component';
import { ListOfMoviesComponent } from './list-of-movies/list-of-movies.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchResultsComponent } from './search-results/search-results.component';


const routes: Routes = [
  { path: "", component: DashboardComponent },
  { path: "popular-movies", component: PopularMoviesComponent },
  { path: "search/:name", component: SearchResultsComponent },
  { path: "details/:id", component: MovieDetailsComponent },
  { path: "details/:id/:token", component: MovieDetailsComponent },
  { path: "person/:id", component: PersonDetailsComponent },
  { path: "genre/:id/:name", component: PopularMoviesInTheGenreComponent },
  { path: "movies-list", component: ListOfMoviesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponents = 
[
  PopularMoviesComponent, 
  SearchResultsComponent,
  MovieDetailsComponent,
  PersonDetailsComponent, 
  PopularMoviesInTheGenreComponent, 
  ListOfMoviesComponent,
  DashboardComponent,
  SearchEngineComponent
]
