import { TestBed } from '@angular/core/testing'
import { Router, UrlTree } from '@angular/router'
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import { AuthGuard } from './auth.guard'
import { Observable } from 'rxjs'

describe('AuthGuard', () => {
  let guard: AuthGuard
  let router: Router
  let store: MockStore
  let createUrlTreeSpy
  const initialState = { auth: { user: null } }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        provideMockStore({ initialState }),
        {
          provide: Router,
          useValue: {
            createUrlTree: jasmine.createSpy('createUrlTree'),
          },
        },
      ],
    })

    guard = TestBed.inject(AuthGuard)
    router = TestBed.inject(Router)
    store = TestBed.inject(MockStore)

    createUrlTreeSpy = router.createUrlTree as jasmine.Spy
  })

  it('should be created', () => {
    expect(guard).toBeTruthy()
  })

  it('should return true if user is authenticated', (done) => {
    store.setState({ auth: { user: { id: '1', email: 'test@test.com' } } })

    const canActivate = guard.canActivate(null, null) as Observable<boolean>

    canActivate.subscribe((isAuth) => {
      expect(isAuth).toEqual(true)
      done()
    })
  })

  it('should return url tree if user is not authenticated', (done) => {
    const urlTree = router.createUrlTree(['/auth'])

    createUrlTreeSpy.and.returnValue(urlTree)
    const canActivate = guard.canActivate(null, null) as Observable<boolean | UrlTree>

    canActivate.subscribe((result) => {
      expect(result).toEqual(urlTree)
      done()
    })
  })
})
