import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SearchMovies, SearchMoviesResult } from '../movies.service';


@Component({
  selector: 'app-search-engine',
  templateUrl: './search-engine.component.html',
  styleUrls: ['./search-engine.component.css']
})


export class SearchEngineComponent implements OnInit {

  constructor(private http: HttpClient) {}
  titles: Array<SearchMoviesResult> | undefined;
  name = ""
  public data: any

  test(){
    console.log(this.name)
  }

  getTitles(){
    const url = "https://api.themoviedb.org/3/search/movie?api_key=38193385b589296926c46f16b67e1b93&language=en-US&query=" + this.name;
    this.http.get<SearchMovies>(url).subscribe((res)=>{
      this.data = res
      this.titles = res.results.map(array => this.convertToTitles(array))
    })
  }
  
  ngOnInit(): void {}
  convertToTitles (dto:any) : SearchMoviesResult {
    return {
      title: dto.title
    }

  }
  

  
}
