import { MoviesService, Profile } from './../movies.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-tmdb',
  templateUrl: './profile-tmdb.component.html',
  styleUrls: ['./profile-tmdb.component.css']
})
export class ProfileTmdbComponent implements OnInit {
  userInfo: Profile | undefined
  isLoggedin = false
  constructor(public moviesService: MoviesService) { }

  ngOnInit(): void {
    if(this.moviesService.session_Id?.session_id != undefined){
      this.moviesService.getProfileDetails()
    }
    this.moviesService.userProfileTmdbSubject.subscribe((data) => {
    this.userInfo = data
    this.isLoggedin = data != null;
    })
  }
}
