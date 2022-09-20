import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PopularPeople } from '../movies.service';

@Component({
  selector: 'app-popula-actors',
  templateUrl: './popula-actors.component.html',
  styleUrls: ['./popula-actors.component.css']
})
export class PopulaActorsComponent implements OnInit {
  popularActors$!: Observable<PopularPeople>

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.popularActors$ = this.http.get<PopularPeople>(`${environment.apiUrl}/person/popular${environment.apiKey}`);
  }
}
