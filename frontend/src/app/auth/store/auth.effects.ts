import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import * as AuthActions from './auth.actions';
import { Auth } from '../auth.model';
import { AuthService } from '../auth.service';
import { environment } from '../../../environments/environment';

export interface AuthResponseData {
  status: string;
  access_token: string;
  expires_in: string;
}

const handleAuthentication = (expiresIn: number, email: string, token: string) => {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  const user = new Auth(email, token, expirationDate);
  localStorage.setItem('userData', JSON.stringify(user));
  return new AuthActions.AuthenticateSuccess({
    email,
    token,
    expirationDate,
    redirect: true,
  });
};

const handleError = (errorRes: HttpErrorResponse) => {
  let errorMessage = 'An unknown error occurred!';
  if (!errorRes.error || !errorRes.error.error) {
    return of(new AuthActions.AuthenticateFail(errorMessage));
  }
  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'This email exists already';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'This email does not exist.';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'This password is not correct.';
      break;
  }
  return of(new AuthActions.AuthenticateFail(errorMessage));
};

@Injectable()
export class AuthEffects {
  readonly ENDPOINT_AUTH = `${environment.backendDomain}/v1/auth`;

  
  authSignup = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((signupAction: AuthActions.SignupStart) => {
      return this.http
        .post<AuthResponseData>(`${this.ENDPOINT_AUTH}/signup`, {
          email: signupAction.payload.email,
          password: signupAction.payload.password,
        })
        .pipe(
          tap(() => {
            this.router.navigate(['/auth/login']);
          }),
          catchError((errorRes) => {
            return handleError(errorRes);
          })
        );
    })
  ), { dispatch: false });

  
  authLogin = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http
        .post<AuthResponseData>(`${this.ENDPOINT_AUTH}/login`, {
          email: authData.payload.email,
          password: authData.payload.password,
        })
        .pipe(
          tap((resData) => {
            this.authService.setLogoutTimer(+resData.expires_in * 1000);
          }),
          map((resData) => {
            return handleAuthentication(+resData.expires_in, authData.payload.email, resData.access_token);
          }),
          catchError((errorRes) => {
            return handleError(errorRes);
          })
        );
    })
  ));

  
  authRedirect = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS),
    tap((authSuccessAction: AuthActions.AuthenticateSuccess) => {
      if (authSuccessAction.payload.redirect) {
        this.router.navigate(['/']);
      }
    })
  ), { dispatch: false });

  
  autoLogin = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const userData: {
        email: string;
        _token: string;
        _tokenExpirationDate: string;
      } = JSON.parse(localStorage.getItem('userData'));
      if (!userData) {
        return { type: 'DUMMY' };
      }

      const loadedUser = new Auth(userData.email, userData._token, new Date(userData._tokenExpirationDate));

      if (loadedUser.token) {
        // this.user.next(loadedUser);
        const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
        this.authService.setLogoutTimer(expirationDuration);
        return new AuthActions.AuthenticateSuccess({
          email: loadedUser.email,
          token: loadedUser.token,
          expirationDate: new Date(userData._tokenExpirationDate),
          redirect: false,
        });
      }
      return { type: 'DUMMY' };
    })
  ));

  
  authLogout = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      this.authService.clearLogoutTimer();
      localStorage.removeItem('userData');
      this.router.navigate(['/auth']);
    })
  ), { dispatch: false });

  
  changePassword = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.CHANGE_PASSWORD),
    tap((action: AuthActions.ChangePassword) => {
      this.http
        .put(`${this.ENDPOINT_AUTH}/changePassword`, {
          oldPassword: action.payload.oldPassword,
          password: action.payload.password,
        })
        .pipe(take(1))
        .subscribe(() => {
          this.router.navigate(['/']);
        });
    })
  ), { dispatch: false });

  constructor(private actions$: Actions, private http: HttpClient, private router: Router, private authService: AuthService) {}
}
