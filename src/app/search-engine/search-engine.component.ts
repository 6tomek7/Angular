import { MoviesService } from './../movies.service';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-search-engine',
  templateUrl: './search-engine.component.html',
  styleUrls: ['./search-engine.component.css']
})

export class SearchEngineComponent {
  
  searchFor: string | undefined
  name = ""
  constructor() {}
}
