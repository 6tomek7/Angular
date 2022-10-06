import { GoogleService } from './google.service';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastService } from './toast.service';
import { Subject } from 'rxjs';

export interface Movies {
  results: Array<MoviesResult>
  total_pages: number
  total_results: number
}

export interface MoviesResult {
  title: string
  name?: string
  vote_average?: number
  poster_path: string
  release_date: string
  overview: string
  genre_ids: number
  id: number
}

export interface Genres {
  title: string
  poster_path: string
  release_date: string
  overview: string
  runtime: number
  genres: Array<MoviesGenres>
}

export interface MoviesGenres {
  name: string
  id: number
}

export interface Credits {
  cast: Array<CreditsResult>
  crew: Array<CrewResult>
}

export interface CreditsResult {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string
  cast_id: number
  character: string
  credit_id: string
  order: number
}

export interface CrewResult {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path?: string
  credit_id: string
  department: string
  job: string
}

export interface Person {
  birthday: string
  name: string
  profile_path: string
  biography: string
  place_of_birth: string
}

export interface PopularPeople {
  results: Array<PopularPeopleResult>
}

export interface PopularPeopleResult {
  adult: boolean
  gender: number
  id: number
  known_for: string[]
  known_for_department: string
  name: string
  popularity: number
  profile_path: string
}

export interface PopularMoviesInTheGenre {
  results: Array<PopularMoviesInTheGenreResult>
}

export interface PopularMoviesInTheGenreResult {
  title: string
  poster_path: string
  release_date: string
  overview: string
  genre_ids: number
  id: number
}

export interface SearchActors {
  results: Array<SearchActorsResult>
  total_pages: number
  total_results: number
}

export interface SearchActorsResult {
  id: number
  name: string
  profile_path: string
  known_for_department?: string
}

export interface Recommendations {
  results: Array<RecommendationsResult>
}

export interface RecommendationsResult {
  title: string
  poster_path: string
  id: number
}

export interface Token {
  expires_at: string
  request_token: any
  success: boolean
}

export interface SessionId {
  success: boolean
  session_id: string
}

export interface AddMovie {
  media_type: string
  media_id: number
  watchlist: boolean
}

export interface WatchlistMovies {
  results: Array<WatchlistMoviesResult>
}

export interface WatchlistMoviesResult {
  title: string
  id: number
}

export interface SearchTvShows {
  page: number
  results: Array<SearchTvShowsResult>
  total_pages: number
  total_results: number
}

export interface SearchTvShowsResult {
  backdrop_path?: string
  first_air_date?: string
  genre_ids?: number[]
  id: number
  name: string
  origin_country?: string[]
  original_language?: string
  original_name?: string
  overview?: string
  popularity?: number
  poster_path: string
  vote_average?: number
  vote_count?: number
}

export interface SearchKeywords {
  page: number
  results: Array<SearchKeywordsResult>
  total_pages: number
  total_results: number
}

export interface SearchKeywordsResult {
  name: string
  id: number
}

export interface SearchCollections {
  page: number
  results: Array<SearchCollectionsResult>
  total_pages: number
  total_results: number
}

export interface SearchCollectionsResult {
  adult?: boolean
  backdrop_path?: string
  id: number
  name: string
  original_language?: string
  original_name?: string
  overview?: string
  poster_path: string
}

export interface SearchCompanies {
  page: number
  results: Array<SearchCompaniesResult>
  total_pages: number
  total_results: number
}

export interface SearchCompaniesResult {
  id: number
  logo_path: any
  name: string
  origin_country?: string
}

export interface  TvDetails{
  adult: boolean
  backdrop_path: string
  created_by: string[]
  episode_run_time: string[]
  first_air_date: string
  genres: string[]
  homepage: string
  id: number
  in_production: boolean
  languages: string[]
  last_air_date: string
  last_episode_to_air: string
  next_episode_to_air: string
  networks: string[]
  number_of_episodes: number
  number_of_seasons: number
  origin_country: string[]
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: string[]
  production_countries: string[]
  seasons: string[]
  spoken_languages: string[]
  status: string
  tagline: string
  type: string
  vote_average: number
  vote_count: number
}

export interface Profile {
  avatar: string
  id: number
  iso_639_1: string
  iso_3166_1: string
  name: string
  include_adult: boolean
  username: string
}

@Injectable({ providedIn: 'root' })
export class MoviesService {
  userName: string[] = []
  tokenRequest: Token | undefined
  session_Id: SessionId | undefined
  routeId: string | undefined
  approved: boolean | undefined
  approvedToken:string | undefined
  login: Token | undefined
  searchValue: string | undefined
  page = 1
  profileTmdb$: Observable<Profile> | undefined
  userProfileTmdbSubject = new Subject<Profile>()
  
  constructor(
    private http: HttpClient,
    private toastService: ToastService,
    private googleService: GoogleService
  ) {
      this.googleService.googleLogin()}
      getRoute(id: string | undefined){
      this.routeId = id
    }

  getApproved(token: string | undefined){
    this.approvedToken = token
  }

  getToken(){
      fetch(`${environment.apiUrl}/authentication/token/new${environment.apiKey}`)
      .then(response => response.json())
      .then((data) => {
        this.tokenRequest = this.convertTokenRequest(data)
        localStorage.setItem("token", this.tokenRequest.request_token)
      })
  }

  sendRequestToken(){
    fetch(`${environment.apiUrl}/authentication/session/new${environment.apiKey}`, {
      method: "POST",
      body: JSON.stringify({
        request_token: localStorage.getItem("token"),
      }),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json())
    .then((data) => {
      this.approved = true
      this.session_Id = this.convertSessionId(data)
    })
  }

  addMovie(){
    if(this.session_Id?.session_id != undefined)
      fetch(`${environment.apiUrl}/account/{account_id}/watchlist${environment.apiKey}&session_id=${this.session_Id?.session_id}`, {
        method: "POST",
        body: JSON.stringify({
          media_type: "movie",
          media_id: this.routeId,
          watchlist: true
        }),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })
      .then(response => response.json())
      .then(() => {
        this.toastService.show('Added movie to watch list movies', { classname: 'bg-success text-light', delay: 4000 });
      })
      .then(() => 
        this.http.get<WatchlistMovies>
        (`${environment.apiUrl}/account/{account_id}/watchlist/movies${environment.apiKey}&session_id=${this.session_Id?.session_id}&sort_by=created_at.asc`)
        .subscribe((data) => {
          let watchList = data.results
          localStorage.clear()
          localStorage.setItem("session", JSON.stringify(watchList))
      }))
  }

  convertSessionId(respone: SessionId): SessionId {
    return {
        success: respone.success,
        session_id: respone.session_id
    }
  }

   convertTokenRequest(response: Token): Token {
    return {
        expires_at: response.expires_at,
        request_token: response.request_token,
        success: response.success,
    }
  }

  rateMovie(value: number){
    fetch(`${environment.apiUrl}/movie/${this.routeId}/rating${environment.apiKey}&session_id=${this.session_Id?.session_id}`,{
      method: "POST",
      body: JSON.stringify({"value": value}),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(res => {
      if (res.ok){
        this.toastService.show(`You rating is ${value} / 10`, { classname: 'bg-success text-light', delay: 4000 })
      } else
        this.toastService.show('Error.', { classname: 'bg-danger text-light', delay: 4000 })
    })
  }

  postLogin(nick:string, password: string){
    if(this.tokenRequest?.request_token != undefined, this.login?.success === undefined)
    fetch
    (`${environment.apiUrl}/authentication/token/validate_with_login${environment.apiKey}`, {
      method: "POST",
      body: JSON.stringify({
        username: nick,
        password: password,
        request_token: this.tokenRequest?.request_token
      }),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    }) 
    .then(response => response.json())
    .then((data) => {
      this.login = this.convertTokenRequest(data)
      this.userName = []
    }).then((a) => { if(this.login?.success === true){
      this.sendRequestToken()
      this.userName.push("Hi " + nick + " !")
      this.toastService.show(`Login successful`, { classname: 'bg-success text-light', delay: 4000 })
      setTimeout(() => {
        this.profileDetailsTmdb()
      }, 2000);
    } if(this.login?.success === false){
      this.toastService.show(`Invalid username and/or password.`, { classname: 'bg-danger text-light', delay: 4000 })
    }})
  }

  searchResults(name: string | undefined){
    this.searchValue = name
  }

  searchMovies(value: string | undefined, page: number): Observable<Movies>{
    return this.http.get<Movies>(`${environment.apiUrl}/search/movie${environment.apiKey}&language=en-US&query=${value}&page=${page}`)
  }

  searchActors(value: string | undefined, page: number): Observable<SearchActors>{
    return this.http.get<SearchActors>(`${environment.apiUrl}/search/person${environment.apiKey}&query=${value}&page=${page}`)
  }

  searchCompanies(value: string | undefined, page: number): Observable<SearchCompanies>{
    return this.http.get<SearchCompanies>(`${environment.apiUrl}/search/company${environment.apiKey}&query=${value}&page=${page}`)
  }

  searchCollections(value: string | undefined, page: number): Observable<SearchCollections>{
    return this.http.get<SearchCollections>(`${environment.apiUrl}/search/collection${environment.apiKey}&query=${value}&page=${page}`)
  }

  searchKeywords(value: string | undefined, page: number): Observable<SearchKeywords>{
    return this.http.get<SearchKeywords>(`${environment.apiUrl}/search/keyword${environment.apiKey}&query=${value}&page=${page}`)
  }

  searchTvShows(value: string | undefined, page: number): Observable<SearchTvShows>{
    return this.http.get<SearchTvShows>(`${environment.apiUrl}/search/tv${environment.apiKey}&query=${value}&page=${page}`)
  }

  getProfileDetails():Observable<Profile>{
   return this.http.get<Profile>(`${environment.apiUrl}/account${environment.apiKey}&session_id=${this.session_Id?.session_id}`)
  }

  profileDetailsTmdb(){
    fetch(`${environment.apiUrl}/account${environment.apiKey}&session_id=${this.session_Id?.session_id}`)
    .then(response => response.json())
    .then((a) => {
      this.userProfileTmdbSubject.next(a as Profile)
    })
  }
}

