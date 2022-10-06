import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ProfileFacebookComponent } from '../profile-facebook/profile-facebook.component';
import { ProfileGoogleComponent } from '../profile-google/profile-google.component';
import { ProfileTmdbComponent } from '../profile-tmdb/profile-tmdb.component';

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileFacebookComponent,
    ProfileGoogleComponent,
    ProfileTmdbComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
