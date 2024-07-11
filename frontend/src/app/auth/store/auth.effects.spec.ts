import { Subject } from 'rxjs'
import { Action } from '@ngrx/store'
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { provideMockActions } from '@ngrx/effects/testing'
import { AuthEffects } from './auth.effects'
import { Router } from '@angular/router'

describe('AuthEffects', () => {
  let systemUnderTest: AuthEffects
  let actions$ = new Subject<Action>()
  let httpClient: HttpClient
  let httpTestingController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        AuthEffects,
        provideMockActions(() => actions$),
        { provide: Router, useValue: {} },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    })

    systemUnderTest = TestBed.inject(AuthEffects)
    httpClient = TestBed.inject(HttpClient)
    httpTestingController = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    httpTestingController.verify()
  })

  it('should be created', () => {
    expect(systemUnderTest).toBeDefined()
  })
})
