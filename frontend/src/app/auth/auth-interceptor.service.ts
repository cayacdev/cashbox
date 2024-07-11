import { Injectable } from '@angular/core'
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError, filter, map, switchMap, take, takeWhile } from 'rxjs/operators'
import { Store } from '@ngrx/store'
import * as fromApp from '../store/app.reducer'
import * as AuthActions from './store/auth.actions'

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private store: Store<fromApp.AppState>) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.store.select('auth').pipe(
      take(1),
      map((authState) => {
        return authState.user
      }),
      switchMap((user) => {
        if (!user) {
          return next.handle(req)
        }
        const modifiedReq = this.modifyRequest(req, user.token)
        return next.handle(modifiedReq).pipe(catchError((x) => this.handleAuthError(x, next, modifiedReq)))
      }),
    )
  }

  private handleAuthError(err: HttpErrorResponse, next: HttpHandler, modifiedReq: HttpRequest<unknown>): Observable<HttpEvent<unknown>> {
    if (err.status === 401 && err.url?.includes('refresh') === false) {
      return this.refreshToken$().pipe(
        switchMap((token) => {
          const newReq = this.modifyRequest(modifiedReq, token)
          return next.handle(newReq).pipe(
            catchError((err) => {
              this.store.dispatch(new AuthActions.Logout())
              return throwError(err)
            }),
          )
        }),
      )
    }

    return throwError(err)
  }

  private modifyRequest(request: HttpRequest<unknown>, token: string) {
    return request.clone({
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
    })
  }

  private refreshToken$(): Observable<string> {
    this.store.dispatch(new AuthActions.RefreshToken())

    return this.store.select('auth').pipe(
      takeWhile((authState) => authState.loading, true),
      filter((authState) => !authState.loading),
      map((authState) => authState.user?.token ?? ''),
    )
  }
}
