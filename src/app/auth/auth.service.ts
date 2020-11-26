import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    oneHourInMillisenconds = 3600 * 1000;

    isAuthenticated: boolean = false;
    token: string;

    mostrarMenuEmitter = new EventEmitter<boolean>();

    constructor(private router: Router) { }

    authSuccess(token: any) {
        this.isAuthenticated = true;
        this.token = token;
    }

    logout() {
        this.isAuthenticated = false;
        localStorage.removeItem('token');
        localStorage.removeItem('expirationDate');
    }

    checkAuthTimeout(expirationTime: any) {
        setTimeout(() => {
            this.logout();
        }, expirationTime * 1000);
    }

    tryLogin() {

        const token = localStorage.getItem('token');
        const _expirationDate = localStorage.getItem('expirationDate')
        if (token && _expirationDate) {
            const expirationDate = new Date(_expirationDate)
            const dateNow = new Date();

            if (dateNow > expirationDate) {
                this.logout();
            }
            if (dateNow < expirationDate) {
                this.authSuccess(token);
            }
        }
    }

    setAuth(authenticated: boolean, token: string) {
        if (authenticated) {
            const expirationDate = new Date(new Date().getTime() + 3599 * 1000);
            localStorage.setItem('token', token);
            localStorage.setItem('expirationDate', expirationDate.toString());
            this.checkAuthTimeout(3599)
            this.mostrarMenuEmitter.emit(true);
            this.router.navigate(['/'])
            this.token = token;
        }
        else {
            this.mostrarMenuEmitter.emit(false);
            this.isAuthenticated = false;
        }
    }
}