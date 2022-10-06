import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Observable, Subject } from 'rxjs';

const authCodeFlowConfig: AuthConfig = {
  // Url of the Identity Provider
  issuer: 'https://accounts.google.com',

  // strict discovery document disallows urls which not start with issuers url
  strictDiscoveryDocumentValidation: false,

  // URL of the SPA to redirect the user to after login
  redirectUri: window.location.origin,

  // The SPA's id. The SPA is registerd with this id at the auth-server
  // clientId: 'server.code',
  clientId: '413745185671-d7d6gfcc07efqst5ft7cfsms41vqs28i.apps.googleusercontent.com',

  // set the scope for the permissions the client should request
  scope: 'openid profile email https://www.googleapis.com/auth/gmail.readonly',

  showDebugInformation: true,
};

export interface UserInfo {
  info: {
    sub: string
    email: string,
    name: string,
    picture: string
    email_verified: boolean
  }
}


@Injectable({providedIn: 'root'})
export class GoogleService {

  gmail = 'https://gmail.googleapis.com'
  userProfileSubject = new Subject<UserInfo>()

  constructor(private readonly oAuthService: OAuthService, private readonly httpClient: HttpClient) {}

  googleLogin(){
    this.oAuthService.configure(authCodeFlowConfig);
    this.oAuthService.logoutUrl = "https://www.google.com/accounts/Logout";
    this.oAuthService.loadDiscoveryDocument().then( () => {
      this.oAuthService.tryLoginImplicitFlow().then( () => {
        if (!this.oAuthService.hasValidAccessToken()) {
          this.oAuthService.initLoginFlow()
        } else {
          this.oAuthService.loadUserProfile().then( (userProfile) => {
            this.userProfileSubject.next(userProfile as UserInfo)
          })
        }
      })
    });
  }
  validAccessToken(){
    return !this.oAuthService.hasValidAccessToken()
  }

  emails(userId: string): Observable<any> {
    return this.httpClient.get(`${this.gmail}/gmail/v1/users/${userId}/messages`, { headers: this.authHeader() })
  }

  getMail(userId: string, mailId: string): Observable<any> {
    return this.httpClient.get(`${this.gmail}/gmail/v1/users/${userId}/messages/${mailId}`, { headers: this.authHeader() })
  }

  isLoggedIn(): boolean {
    return this.oAuthService.hasValidAccessToken()
  }

  signOut() {
    this.oAuthService.logOut()
  }

  private authHeader() : HttpHeaders {
    return new HttpHeaders ({
      'Authorization': `Bearer ${this.oAuthService.getAccessToken()}`
    })
  }
}
