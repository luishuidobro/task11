import { Injectable } from '@angular/core';
import { User } from '../models/user-model';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizacionService {
  isLogged$ = new BehaviorSubject<boolean>(localStorage.getItem("userName") !== null);
  constructor(private router: Router,
    private httpClient: HttpClient) { }

  // login(user: User) {
  //   localStorage.setItem("user", JSON.stringify(user));
  // }

  login(user: User) : Observable<Object>{
    const loginRequest = {
      "login": user.email,
      "password": user.password
    };
   return this.httpClient.post('http://localhost:3004/auth/login/', loginRequest)
    // .subscribe(
    //   (token) => {
    //     // this.authorizationService.login(token);
    //     localStorage.setItem("user", JSON.stringify(token));
    //     localStorage.setItem("userName", JSON.stringify(loginRequest.login));
    //     this.isLogged$.next(true);
    //   },
    //   (error) => {
    //     console.log(error);
    //   });
  }

  logOut() {
    localStorage.removeItem("user");
    localStorage.removeItem("userName");
    localStorage.removeItem("usuario");
    this.isLogged$.next(false);
  }

  requestUserInfo(token: Object) : Observable<Object> {
    return this.httpClient.post('http://localhost:3004/auth/userinfo',token);
    // .subscribe((user) =>{
    //   console.log("Authorized");
    //   if (this.isAuthenticated()) {
    //     this.router.navigate(['courses']);
    //   }
    // },
    // (err) => {console.log(err)});
  }

  isAuthenticated(): boolean {
    return localStorage.getItem("userName") !== null;
  }

  getUserInfo(): Observable<string> {
    const userInfoObservable = new Observable<string>(observer => {
      // setTimeout(() => {
        observer.next(JSON.parse(localStorage.getItem("usuario")));
      // }, 500);
    });
    return userInfoObservable;
  }
}
