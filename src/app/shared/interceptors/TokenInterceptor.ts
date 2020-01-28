import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthorizacionService } from "../services/authorization_service"

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private authorizacionService: AuthorizacionService) { }
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with basic auth credentials if available
        const token = this.authorizacionService.getUserInfo();
        // if (token) {
        //     request = request.clone({
        //         setHeaders: { 
        //             Authorization: token
        //         }
        //     });
        // }
        return next.handle(request);
    }

}