import { User } from './user.model';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface AuthResponseData {
    access_token: string;
    expires_in: number;
    refresh_expires_in: number;
    refresh_token: string;
    token_type: string;
    session_state: string;
}

@Injectable({ providedIn: 'root'})
export class AuthService {

    userSubject =  new BehaviorSubject<User>(null);

    constructor(private http: HttpClient, private router: Router) {}

    login(username: string, password: string) {
        const body = new HttpParams()
            .set('grant_type', 'password')
            .set('client_id', 'springboot-microservice')
            .set('client_secret', '28b87b0a-e977-4a3c-8856-4452b9a76ebe')
            .set('username', username)
            .set('password', password);
        return this.http.post<AuthResponseData>('http://127.0.0.1:18080/auth/realms/Demo-Realm/protocol/openid-connect/token',
        body
        ,{
            headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
        }
        ).pipe(
            catchError(this.handleError),
            tap(resData => this.handleResponseData(username, resData.access_token, resData.expires_in))
            );
    }

    logout() {
        this.userSubject.next(null);
        this.router.navigate(['/auth']);
    }

    private handleResponseData(username: string, accessToken: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + (expiresIn * 1000));
        const user = new User(username, accessToken, expirationDate);
        this.userSubject.next(user);
    }

    private handleError(errorResponse: HttpErrorResponse) {
        let errorMessage = null;
        if(!errorResponse.error || !errorResponse.error.error_description) {
            errorMessage = 'An unknown error ocurrend.';
        } else {
            errorMessage = errorResponse.error.error_description;
        }
        return throwError(errorMessage);
    }
}