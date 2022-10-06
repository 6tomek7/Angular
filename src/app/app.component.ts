import { GoogleService, UserInfo } from './google.service';
import { MoviesService } from './movies.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginWindowComponent } from './login-window/login-window.component';
import { FormGroup } from '@angular/forms';
import { SocialAuthService, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  loginForm!: FormGroup;
  socialUser!: SocialUser;
  isLoggedinFb = false
  aouthActive = true
  userInfo: UserInfo | undefined
  
  constructor(private modalService: NgbModal,
    public moviesService: MoviesService,
    private socialAuthService: SocialAuthService,
    private googleService: GoogleService) { }
  
  ngOnInit(): void {
    if(window.location.search === ""){
      this.moviesService.getToken()
    }
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedinFb = user != null;
    });
    this.googleService.userProfileSubject.subscribe( info => {
      this.userInfo = info
    })
  }  
    
  isLoggedInGoogle(): boolean {
    return this.googleService.isLoggedIn()
  }

  openModal() {
    const modalRef = this.modalService.open(LoginWindowComponent);
  }
}