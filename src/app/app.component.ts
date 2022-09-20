import { MoviesService } from './movies.service';
import { Component, isDevMode, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginWindowComponent } from './login-window/login-window.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  constructor(private modalService: NgbModal,
    public moviesService: MoviesService){if (isDevMode()) {
    console.log('Development!');
  } else {
    console.log('Production!');
  }}
  
  ngOnInit(): void {
    if(window.location.search === ""){
      this.moviesService.getToken()
    }
  }  
  
  openModal() {
    const modalRef = this.modalService.open(LoginWindowComponent);
  }
}