import { BudgetPlanEffects } from './budget-plan.effects';
import { TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { Action } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import * as Test from './budget-plan.actions';
import { closeBudgetPlan } from './budget-plan.actions';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('BudgetPlanEffects', function () {
  let systemUnderTest: BudgetPlanEffects;
  let actions$ = new Subject<Action>();
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BudgetPlanEffects, provideMockActions(() => actions$)],
    });

    systemUnderTest = TestBed.inject(BudgetPlanEffects);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should set budget plan to closed and dispatch to success event', () => {
    let type = null;
    systemUnderTest.closeBudgetPlan$.subscribe((action) => {
      type = action.type;
    });

    actions$.next(closeBudgetPlan({ cashBoxId: 1, index: 1, close: true }));

    const req = httpTestingController.expectOne('http://localhost:8080/v1/cash-boxes/1/plans/1/closed');
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual({ closed: true });
    req.flush({});

    expect(type).toEqual(Test.updateBudgetPlanSuccess.type);
  });

  it('should set budget plan to open and dispatch to success event', () => {
    let type = null;
    systemUnderTest.closeBudgetPlan$.subscribe((action) => {
      type = action.type;
    });

    actions$.next(closeBudgetPlan({ cashBoxId: 1, index: 1, close: false }));

    const req = httpTestingController.expectOne('http://localhost:8080/v1/cash-boxes/1/plans/1/closed');
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual({ closed: false });
    req.flush({});

    expect(type).toEqual(Test.updateBudgetPlanSuccess.type);
  });

  it('should set budget plan to closed and dispatch to failure event if forbidden', () => {
    let type = null;
    systemUnderTest.closeBudgetPlan$.subscribe((action) => {
      type = action.type;
    });

    actions$.next(closeBudgetPlan({ cashBoxId: 1, index: 1, close: true }));

    const req = httpTestingController.expectOne('http://localhost:8080/v1/cash-boxes/1/plans/1/closed');
    expect(req.request.method).toEqual('PUT');
    req.flush({}, { status: 403, statusText: 'some error message' });

    expect(type).toEqual(Test.updateBudgetPlanFail.type);
  });
});
