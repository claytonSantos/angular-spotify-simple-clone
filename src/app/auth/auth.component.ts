import { environment } from './../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './auth.service';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class Auth {

    token = '';
    obj: any = {};
    sub: Subscription;

    authEndpoint = "https://accounts.spotify.com/authorize";

    redirect_uri = environment.REDIRECT_URI;

    my_client_id = "edda27b666594582bf5ac591448c9d78";

    scopes = [

    ];

    redirect_uri_encoded = encodeURIComponent(this.redirect_uri)

    loginUrl = this.authEndpoint +
        "?client_id=" + this.my_client_id +
        "&redirect_uri=" + this.redirect_uri_encoded +
        "&scope=" + this.scopes.join("%20") +
        "&response_type=token" +
        "&show_dialog=true"
        ;

    auth: string = "auth"

    constructor(
        private authService: AuthService,
        private route: ActivatedRoute
    ) {

    }
    getTokenFromUrl() {
        window.location.hash
            .substring(1)
            .split("&")
            .forEach(item => {
                var x = item.split("=");
                let key = x[0];
                let value = x[1];
                this.obj[key] = value;
            })

        return this.obj;
    };

    ngOnInit() {
        this.sub = this.route.params.subscribe(
            (params: any) => {

                const authInfo = this.getTokenFromUrl();

                if (authInfo.access_token) {
                    this.authService.setAuth(true, authInfo.access_token);
                }
            }
        )
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    login() {
        window.location.href = this.loginUrl
    }
}
