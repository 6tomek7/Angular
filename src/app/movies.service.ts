import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastService } from './toast.service';

export interface Movies {
  results: Array<MoviesResult>
}

export interface MoviesResult {
  title: string
  poster_path: string
  release_date: string
  overview: string
  genre_ids: number
  id: number
}

export interface Movies {
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
}

export interface CreditsResult {
  name: string
  id: number
}

export interface Person {
  birthday: string
  name: string
  profile_path: string
  biography: string
  place_of_birth: string
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
}

export interface SearchActorsResult {
  id: number
  name: string
  profile_path: string
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

@Injectable({ providedIn: 'root' })
export class MoviesService {
  userName: string[] = []
  tokenRequest: Token | undefined
  session_Id: SessionId | undefined
  routeId: string | undefined
  approved: boolean | undefined
  approvedToken:string | undefined
  login: Token | undefined
  constructor(
    private http: HttpClient,
    private toastService: ToastService
     ) {}

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
    }).then(() => { if(this.login?.success === true){
      this.sendRequestToken()
      this.userName.push("Hi " + nick + " !")
      this.toastService.show(`Login successful`, { classname: 'bg-success text-light', delay: 4000 })
    } if(this.login?.success === false){
      this.toastService.show(`Invalid username and/or password.`, { classname: 'bg-danger text-light', delay: 4000 })
    }})
  }
}

