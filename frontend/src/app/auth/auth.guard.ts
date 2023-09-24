import { inject, Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router'
import { Observable } from 'rxjs'
import { map, take } from 'rxjs/operators'
import { Store } from '@ngrx/store'
import * as fromApp from '../store/app.reducer'

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(AuthGuard).canActivate(route, state)
}

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    private router: Router,
    private store: Store<fromApp.AppState>,
  ) {}

  canActivate(
    _route: ActivatedRouteSnapshot,
    _router: RouterStateSnapshot,
  ): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    return this.store.select('auth').pipe(
      take(1),
      map((authState) => {
        return authState.user
      }),
      map((user) => {
        const isAuth = !!user
        if (isAuth) {
          return true
        }
        return this.router.createUrlTree(['/auth'])
      }),
    )
  }
}
