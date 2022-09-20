import { Credits, CreditsResult, MoviesService, Genres } from './../movies.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})

export class MovieDetailsComponent implements OnInit {
  rate = 5
  urlImage = environment.urlImage
  id: string | undefined
  data$: Observable<Genres> | undefined
  persons$: Observable<Array<CreditsResult>> | undefined
  approved: string | undefined
  show: boolean | undefined

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private moviesService: MoviesService,
    private modalService: NgbModal
  ) { }
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']
      this.approved = params['token']
      this.moviesService.getApproved(this.approved)
      this.data$ = this.http.get<Genres>(`${environment.apiUrl}/movie/${this.id}${environment.apiKey}`);
      this.persons$ = this.http.get<Credits>(`${environment.apiUrl}/movie/${this.id}/credits${environment.apiKey}`)
      .pipe(map(cast => cast.cast))
      this.moviesService.getRoute(this.id)
      window.scroll({top: 0, left: 0, behavior: 'smooth'})
      if(this.approved != undefined){
        this.moviesService.sendRequestToken()
      }
    })
  }
  
  openModal() {
    const modalRef = this.modalService.open(ModalComponent);
  }

  addClick(){
    if (this.rate < 10)
    this.rate ++
  }

  subtractClick(){
    if (this.rate > 0)
    this.rate --
  }

  rateMovie(value: number){
    this.moviesService.rateMovie(value)
  }

  addToWatchlist(){   
    this.moviesService.addMovie() 
    setTimeout(() => {
      if(this.moviesService.session_Id === undefined){
        this.openModal()
      } 
    }, 1000);
  }
}
