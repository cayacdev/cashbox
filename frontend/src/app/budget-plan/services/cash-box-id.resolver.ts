import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router'
import { Observable } from 'rxjs'
import { inject, Injectable } from '@angular/core'

export const resolveCashBoxId: ResolveFn<number> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(CashBoxIdResolver).resolve(route, state)
}

@Injectable({ providedIn: 'root' })
export class CashBoxIdResolver {
  resolve(route: ActivatedRouteSnapshot, _: RouterStateSnapshot): Observable<number> | Promise<number> | number {
    return +route.paramMap.get('id')
  }
}
