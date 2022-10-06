import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { PersonDetailsComponent } from '../person-details/person-details.component';
import { TvDetailsComponent } from '../tv-details/tv-details.component';

const routes: Routes = [
{ path: "tv/:id", component: TvDetailsComponent },
{ path: "movies/:id", component: MovieDetailsComponent },
{ path: "movies/:id/:token", component: MovieDetailsComponent },
{ path: "person/:id", component: PersonDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailsRoutingModule { }
export const RoutingComponents = 
[
  TvDetailsComponent,
  PersonDetailsComponent, 
  MovieDetailsComponent
]