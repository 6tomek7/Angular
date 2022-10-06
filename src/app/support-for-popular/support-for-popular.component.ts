import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-support-for-popular',
  templateUrl: './support-for-popular.component.html',
  styleUrls: ['./support-for-popular.component.css']
})
export class SupportForPopularComponent implements OnInit {
  showMovies = false
  showActors = false
  showOnTv = false

  constructor() { }

  ngOnInit(): void {
    this.viewMovies()
  }

  viewMovies(){
    this.showMovies = true
    this.showActors = false
    this.showOnTv = false
  }

  viewActors(){
    this.showActors = true
    this.showMovies = false
    this.showOnTv= false
  }

  viewOnTv(){
    this.showOnTv = true
    this.showMovies = false
    this.showActors = false
  }
}
