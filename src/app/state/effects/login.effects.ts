import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../../shared/models/user-model';
import { AuthorizacionService } from "../../shared/services/authorization_service"
import { login, loginSuccess, loginFailure, getUserInfo } from '../actions/login.actions';

@Injectable()
export class LoginEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      exhaustMap(action =>
        this.authorizacionService.login(action.user).pipe(
          map((token) => {
            localStorage.setItem("user", JSON.stringify(token));
            localStorage.setItem("userName", JSON.stringify(action.user));
            this.authorizacionService.isLogged$.next(true);
            return loginSuccess({ token });  
          }),
          catchError(error => of(loginFailure({ error })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginSuccess),
      exhaustMap(action =>
        this.authorizacionService.requestUserInfo(action.token).pipe(
          map((user) => {
            if (this.authorizacionService.isAuthenticated()) {
                this.router.navigate(['courses']);
            }
            return getUserInfo({ user });  
          }),
          catchError(error => of(loginFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private authorizacionService: AuthorizacionService,
    private router: Router,
  ) {}
}