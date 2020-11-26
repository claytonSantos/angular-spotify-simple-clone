import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-spotify-clone';

  constructor(
    private authService: AuthService,
    private appService: AppService,
  ) { }

  ngOnInit() {
    this.authService.tryLogin();
  }
}
