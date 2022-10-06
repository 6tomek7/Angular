import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TvDetails } from '../movies.service';

@Component({
  selector: 'app-tv-details',
  templateUrl: './tv-details.component.html',
  styleUrls: ['./tv-details.component.css']
})
export class TvDetailsComponent implements OnInit {
  urlImage = environment.urlImage
  tv$: Observable<TvDetails> | undefined
  id: number | undefined
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"] 
    this.tv$ = this.http.get<TvDetails>(`${environment.apiUrl}/tv/${this.id}${environment.apiKey}`)
  }
}
