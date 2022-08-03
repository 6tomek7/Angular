import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Movies {
  page: number;
}

/* . . . */
@Injectable({ providedIn: 'root' })
export class MoviesService {

  constructor( private http: HttpClient ) {}

  url = "https://api.themoviedb.org/3/movie/popular?api_key=38193385b589296926c46f16b67e1b93&language=en-US&page=1"

  getShippingPrices() {
    return this.http.get<Movies>(this.url);
  }
}
