import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoutingComponents } from './app-routing.module'
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TrnsformTimePipe } from './shared/trnsform-time.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RecommendationsMoviesComponent } from './recommendations-movies/recommendations-movies.component';
import { NgToastModule } from 'ng-angular-popup';
import { ToastComponent } from './toast/toast.component';
import { ModalComponent } from './modal/modal.component';
import { LoginWindowComponent } from './login-window/login-window.component';
import { PopularOnTvComponent } from './popular-on-tv/popular-on-tv.component';
import { PopulaActorsComponent } from './popula-actors/popula-actors.component';
import { SupportForPopularComponent } from './support-for-popular/support-for-popular.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { SearchCompaniesComponent } from './search-companies/search-companies.component';
import { SearchMoviesComponent } from './search-movies/search-movies.component';
import { SearchActorsComponent } from './search-actors/search-actors.component';
import { SearchCollectionsComponent } from './search-collections/search-collections.component';
import { SearchKeywordsComponent } from './search-keywords/search-keywords.component';
import { SearchTvShowsComponent } from './search-tv-shows/search-tv-shows.component';

@NgModule({
  declarations: [
    AppComponent,
    RoutingComponents,
    TrnsformTimePipe,
    RecommendationsMoviesComponent,
    ToastComponent,
    ModalComponent,
    LoginWindowComponent,
    PopularOnTvComponent,
    PopulaActorsComponent,
    SupportForPopularComponent,
    DashboardComponent,
    SearchResultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    NgToastModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

