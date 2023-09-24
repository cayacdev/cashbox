import { BudgetPlanEffects } from './budget-plan.effects'
import { TestBed } from '@angular/core/testing'
import { Subject } from 'rxjs'
import { Action } from '@ngrx/store'
import { provideMockActions } from '@ngrx/effects/testing'
import * as Test from './budget-plan.actions'
import { addBudgetPlan, closeBudgetPlan, updateBudgetPlan } from './budget-plan.actions'
import { HttpClient } from '@angular/common/http'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { BudgetPlan } from '../../model/budget-plan.model'

describe('BudgetPlanEffects', function () {
  let systemUnderTest: BudgetPlanEffects
  let actions$ = new Subject<Action>()
  let httpClient: HttpClient
  let httpTestingController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BudgetPlanEffects, provideMockActions(() => actions$)],
    })

    systemUnderTest = TestBed.inject(BudgetPlanEffects)
    httpClient = TestBed.inject(HttpClient)
    httpTestingController = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    httpTestingController.verify()
  })

  describe('closeBudgetPlan$', () => {
    it('should set budget plan to closed and dispatch to success event', () => {
      let type = null
      systemUnderTest.closeBudgetPlan$.subscribe((action) => {
        type = action.type
      })

      actions$.next(closeBudgetPlan({ cashBoxId: 1, index: 1, close: true }))

      const req = httpTestingController.expectOne('http://localhost:8080/v1/cash-boxes/1/plans/1/closed')
      expect(req.request.method).toEqual('PUT')
      expect(req.request.body).toEqual({ closed: true })
      req.flush({})

      expect(type).toEqual(Test.updateBudgetPlanSuccess.type)
    })

    it('should set budget plan to open and dispatch to success event', () => {
      let type = null
      systemUnderTest.closeBudgetPlan$.subscribe((action) => {
        type = action.type
      })

      actions$.next(closeBudgetPlan({ cashBoxId: 1, index: 1, close: false }))

      const req = httpTestingController.expectOne('http://localhost:8080/v1/cash-boxes/1/plans/1/closed')
      expect(req.request.method).toEqual('PUT')
      expect(req.request.body).toEqual({ closed: false })
      req.flush({})

      expect(type).toEqual(Test.updateBudgetPlanSuccess.type)
    })

    it('should set budget plan to closed and dispatch to failure event if forbidden', () => {
      let type = null
      systemUnderTest.closeBudgetPlan$.subscribe((action) => {
        type = action.type
      })

      actions$.next(closeBudgetPlan({ cashBoxId: 1, index: 1, close: true }))

      const req = httpTestingController.expectOne('http://localhost:8080/v1/cash-boxes/1/plans/1/closed')
      expect(req.request.method).toEqual('PUT')
      req.flush({}, { status: 403, statusText: 'some error message' })

      expect(type).toEqual(Test.updateBudgetPlanFail.type)
    })
  })

  describe('updateBudgetPlan$', () => {
    it('should update budget plan and dispatch to success event', () => {
      let type = null
      systemUnderTest.updateBudgetPlan$.subscribe((action) => {
        type = action.type
      })

      const budgetPlan = {
        id: 1,
        budget: 200,
        closed: false,
        entries: [],
        name: 'Test',
        start_date: new Date().toUTCString(),
        end_date: new Date().toUTCString(),
      } as BudgetPlan

      actions$.next(updateBudgetPlan({ cashBoxId: 1, index: 1, budgetPlan }))

      const req = httpTestingController.expectOne('http://localhost:8080/v1/cash-boxes/1/plans/1')
      expect(req.request.method).toEqual('PUT')
      expect(req.request.body).toEqual(budgetPlan)
      req.flush({})

      expect(type).toEqual(Test.updateBudgetPlanSuccess.type)
    })
  })

  describe('addBudgetPlan$', () => {
    it('should update budget plan and dispatch to success event', () => {
      let type = null
      systemUnderTest.addBudgetPlan$.subscribe((action) => {
        type = action.type
      })

      const budgetPlan = {
        id: 1,
        budget: 200,
        closed: false,
        entries: [],
        name: 'Test',
        start_date: new Date().toUTCString(),
        end_date: new Date().toUTCString(),
      } as BudgetPlan

      actions$.next(addBudgetPlan({ cashBoxId: 1, budgetPlan }))

      const req = httpTestingController.expectOne('http://localhost:8080/v1/cash-boxes/1/plans')
      expect(req.request.method).toEqual('POST')
      expect(req.request.body).toEqual(budgetPlan)
      req.flush({})

      expect(type).toEqual(Test.updateBudgetPlanSuccess.type)
    })
  })
})
