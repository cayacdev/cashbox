import { Subject } from 'rxjs';
import { Action } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { AuthEffects } from './auth.effects';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

describe('AuthEffects', () => {
  let systemUnderTest: AuthEffects;
  let actions$ = new Subject<Action>();
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthEffects,
        provideMockActions(() => actions$),
        { provide: Router, useValue: {} },
        { provide: AuthService, useValue: {} },
      ],
    });

    systemUnderTest = TestBed.inject(AuthEffects);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(systemUnderTest).toBeDefined();
  });
});
