import { Recommendations } from './../movies.service';
import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-recommendations-movies',
  templateUrl: './recommendations-movies.component.html',
  styleUrls: ['./recommendations-movies.component.css']
})
export class RecommendationsMoviesComponent {
  @Input() set parentId(value: string | undefined){
    this.data$ = this.http.get<Recommendations>(`${environment.apiUrl}/movie/${value}/recommendations${environment.apiKey}`)
  }
  urlImage = environment.urlImage200
  data$!: Observable<Recommendations>

  constructor(
    private http: HttpClient) {}
}
