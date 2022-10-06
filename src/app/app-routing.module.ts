import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PopularMoviesInTheGenreComponent } from './popular-movies-in-the-genre/popular-movies-in-the-genre.component';
import { ListOfMoviesComponent } from './list-of-movies/list-of-movies.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: "", component: DashboardComponent },
  { path: "genre/:id/:name", component: PopularMoviesInTheGenreComponent },
  { path: "movies-list", component: ListOfMoviesComponent },
  { path: 'search/:name', loadChildren: () => import('./search-results/search-results.module').then(m => m.SearchResultsModule) },
  { path: 'search-engine', loadChildren: () => import('./search-engine/search-engine.module').then(m => m.SearchEngineModule) },
  { path: 'details', loadChildren: () => import('./details/details.module').then(m => m.DetailsModule) },
  { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponents = 
[
  PopularMoviesInTheGenreComponent, 
  ListOfMoviesComponent,
  DashboardComponent
]
