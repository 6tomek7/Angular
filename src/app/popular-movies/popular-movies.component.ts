import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Movies } from '../movies.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-popular-movies',
  templateUrl: './popular-movies.component.html',
  styleUrls: ['./popular-movies.component.css']
})

export class PopularMoviesComponent implements OnInit {
  urlImage = environment.urlImage
  constructor(private http: HttpClient) {}
  data$: Observable<Movies> | undefined
    
  ngOnInit(): void {
    this.data$ = this.http.get<Movies>(`${environment.apiUrl}/movie/popular${environment.apiKey}`);
  }
}