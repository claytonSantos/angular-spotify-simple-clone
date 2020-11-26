import { LoadingComponent } from './../components/loading/loading.component';
import { Home } from './home/home.component';
import { AppService } from './app.service';
import { AuthGuard } from './guards/guard';
import { AuthService } from './auth/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { Auth } from './auth/auth.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { PlaylistDetailsComponent } from './playlist-details/playlist-details.component';
import { TodosComponent } from './todos/todos.component';
import { PlaylistCarouselComponent } from './home/components/playlist-carousel/playlist-carousel.component';
import { BugsComponent } from './bugs/bugs.component';
@NgModule({
  declarations: [
    AppComponent,
    Auth,
    PageNotFoundComponent,
    Home,
    PlaylistDetailsComponent,
    TodosComponent,
    LoadingComponent,
    PlaylistCarouselComponent,
    BugsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [AuthService, AuthGuard, AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
