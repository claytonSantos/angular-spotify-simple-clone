import { BugsComponent } from './bugs/bugs.component';
import { TodosComponent } from './todos/todos.component';
import { PlaylistDetailsComponent } from './playlist-details/playlist-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './guards/guard';
import { Home } from './home/home.component';
import { Auth } from './auth/auth.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'login', component: Auth },
  {
    path: 'playlist-details/:id', component: PlaylistDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'todos', component: TodosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'bugs', component: BugsComponent,
    canActivate: [AuthGuard]
  }, {
    path: '', component: Home,
    canActivate: [AuthGuard]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
