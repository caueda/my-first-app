import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take, exhaustMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.authService.userSubject.pipe(
            take(1),
            exhaustMap(user => {
                if(!user) {
                    return next.handle(req);
                }
                const requestClone = req.clone({ headers: new HttpHeaders().set('Authorization', 'bearer ' + user.token)});
                return next.handle(requestClone);
            })
        );
    }

}