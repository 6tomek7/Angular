import { MoviesService } from './../movies.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SearchActorsResult } from '../movies.service';

@Component({
  selector: 'app-search-actors',
  templateUrl: './search-actors.component.html',
  styleUrls: ['./search-actors.component.css']
})
export class SearchActorsComponent {
  @Input() set parentName(value: string | undefined){
    this.moviesService.searchActors(value, 1).subscribe((res) => {
      this.actors = res.results.map(array => this.convertToActors(array))
      this.actorsTotalPages = res.total_pages
      this.totalResults.emit(res.total_results)
    })
  }

  @Input() resultsActivator = false

  @Output() totalResults = new EventEmitter<number>()
  
  urlImage = environment.urlImage
  actors: Array<SearchActorsResult> | undefined
  actorsTotalPages: number | undefined
  
  constructor(private moviesService: MoviesService) { }

  convertToActors (dto:any): SearchActorsResult {
    return {
      id: dto.id,
      name: dto.name,
      profile_path: dto.profile_path,
      known_for_department: dto.known_for_department
    }
  }
}
