import { MoviesService } from './../movies.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SearchActorsResult } from '../movies.service';

@Component({
  selector: 'app-search-actors',
  templateUrl: './search-actors.component.html',
  styleUrls: ['./search-actors.component.css']
})
export class SearchActorsComponent implements OnInit {
  @Input()
  resultsActivator: boolean | undefined

  @Output()
  totalResults = new EventEmitter<number>()
  
  urlImage = environment.urlImage
  actors: Array<SearchActorsResult> | undefined
  actorsTotalPages: number | undefined
  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.getActors()
  }

  getActors(){
    this.moviesService.searchActors("Tina", 1).subscribe((res) => {
      this.actors = res.results.map(array => this.convertToActors(array))
      this.actorsTotalPages = res.total_pages
      this.totalResults.emit(res.total_results)
    })
  }

  convertToActors (dto:any): SearchActorsResult {
    return {
      id: dto.id,
      name: dto.name,
      profile_path: dto.profile_path
    }
  }
}
