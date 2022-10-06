import { GoogleService } from './../google.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { MoviesService } from './../movies.service';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FacebookLoginProvider, SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-login-window',
  templateUrl: './login-window.component.html',
  styleUrls: ['./login-window.component.css']
})
export class LoginWindowComponent implements OnInit {
  isLoggedinFb = false
  constructor(
    public activeModal: NgbActiveModal,
    private movieService: MoviesService,
    private oAuthService: OAuthService,
    private socialAuthService: SocialAuthService,
    private googleService: GoogleService) { }

    ngOnInit(): void {
      this.socialAuthService.authState.subscribe((user) => {
        this.isLoggedinFb = user != null;
      });
    }
  login(nick: string, password: string){
    this.movieService.postLogin(nick, password)
  }

  loginWithFacebook(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  loginWithGoogle(){
    this.oAuthService.initLoginFlow()
  }

  isLoggedInGoogle(): boolean {
    return this.googleService.isLoggedIn()
  }
}
