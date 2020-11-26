import { AppService } from './../app.service';
import { AuthService } from './../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class Home {
    token = '';
    obj: any;
    sub: Subscription;
    images: any = [];
    user: any;
    isLoading: boolean = false;

    constructor(
        private authService: AuthService,
        private route: ActivatedRoute,
        private router: Router,
        private appService: AppService
    ) { }

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }

    getTokenFromUrl() {
        return window.location.hash.substring(1).split("&").forEach(item => {
            var x = item.split("=")
            let key = x[0]
            let value = x[1]
            this.obj[key] = value;
        })
    };

    getAlbuns() {
        const token = this.authService.token;
        this.isLoading = true;
        this.appService.getAlbuns(token, 'family')
            .subscribe((result: any) => {
                const items = result.playlists.items;
                this.images = items.map((item: any) => {
                    return { path: item.images[0].url, idPlaylist: item.id }
                })
                this.isLoading = false;
            })
    }

    getPlaylist(id: any) {
        const token = this.authService.token;
        this.appService.fetchPlaylist(token, id)
            .subscribe((result: any) => {
            })
    }

    clicked(idPlaylist: string) {
        this.router.navigate(['/playlist-details', idPlaylist])
    }

    ngOnInit() {
        this.getAlbuns();
        this.appService.getCurrentUserProfile(this.authService.token)
            .subscribe(result => {
                this.user = result;
            })
    }
}
