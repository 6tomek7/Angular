import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movies } from '../movies.service';

@Component({
  selector: 'app-popular-on-tv',
  templateUrl: './popular-on-tv.component.html',
  styleUrls: ['./popular-on-tv.component.css']
})
export class PopularOnTvComponent implements OnInit {
  urlImage = environment.urlImage200
  constructor(private http: HttpClient) {}
  popularOnTv$: Observable<Movies> | undefined
    
  ngOnInit(): void {
    this.popularOnTv$ = this.http.get<Movies>(`${environment.apiUrl}/tv/popular${environment.apiKey}`);
  }
}
