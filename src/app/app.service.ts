import { AuthService } from './auth/auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class AppService {
    constructor(private http: HttpClient,
        private authService: AuthService
    ) { }

    getAlbuns(token: any, categorie: string) {
        return this.http.get(
            `https://api.spotify.com/v1/browse/categories/${categorie}/playlists?offset=0&limit=10`,
            {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                    responseType: 'json',
                })
            }
        )
    }

    getCurrentUserProfile(token: any) {
        return this.http.get(
            'https://api.spotify.com/v1/me',
            {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                    responseType: 'json',
                })
            }
        )
    }

    fetchPlaylist(token: any, id: any) {
        return this.http.get(
            `https://api.spotify.com/v1/playlists/${id}`,
            {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                    responseType: 'json',
                })
            }
        )
    }
}