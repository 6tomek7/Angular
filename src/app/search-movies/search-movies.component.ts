import { environment } from './../../environments/environment';
import { MoviesService } from './../movies.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MoviesResult } from '../movies.service';

@Component({
  selector: 'app-search-movies',
  templateUrl: './search-movies.component.html',
  styleUrls: ['./search-movies.component.css']
})
export class SearchMoviesComponent {
  @Input() set parentName(value: string | undefined){
    this.moviesService.searchMovies(value, 1).subscribe((res) => {
      this.moviesResult$ = res.results.map(array => this.convertToMovies(array))
      this.moviesTotalPages = res.total_pages
      this.totalResults.emit(res.total_results)
    })
  }
  @Input() resultsActivator: boolean | undefined

  @Output() totalResults = new EventEmitter<number>()
  
  urlImage = environment.urlImage
  moviesResult$: Array<MoviesResult> | undefined
  moviesTotalPages: number | undefined
  moviesTotalResults!: number
  constructor(private moviesService: MoviesService) { }

  convertToMovies (dto:any) : MoviesResult {
    return {
      title: dto.title,
      poster_path: dto.poster_path,
      release_date: dto.release_date,
      overview: dto.overview,
      genre_ids: dto.genre_ids,
      id: dto.id
    }
  }  
}
