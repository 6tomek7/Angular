import { Component, OnInit } from '@angular/core';
import { GoogleService, UserInfo } from '../google.service';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-profile-google',
  templateUrl: './profile-google.component.html',
  styleUrls: ['./profile-google.component.css']
})
export class ProfileGoogleComponent implements OnInit {
  userInfo: UserInfo | undefined
  constructor(private googleService: GoogleService,
    private oAuthService: OAuthService) { }

  ngOnInit(): void {
    this.googleService.userProfileSubject.subscribe( info => {
      this.userInfo = info
    })
  }

  isLoggedInGoogle(): boolean{
    return this.oAuthService.hasValidAccessToken()
  }

  signOutGoogle() {
    this.googleService.signOut()
  }
}
