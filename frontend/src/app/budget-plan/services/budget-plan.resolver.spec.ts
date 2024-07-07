import { TestBed } from '@angular/core/testing'
import { ActivatedRouteSnapshot } from '@angular/router'
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import { BehaviorSubject, Observable } from 'rxjs'
import { BudgetPlanResolver } from './budget-plan.resolver'
import * as BudgetPlanAction from '../store/budget-plan.actions'
import { BudgetPlan } from '../../model/budget-plan.model'
import { provideMockActions } from '@ngrx/effects/testing'
import { Action } from '@ngrx/store'

describe('BudgetPlanResolver', () => {
  let resolver: BudgetPlanResolver
  let store: MockStore
  let actions$ = new BehaviorSubject<Action>(null)
  let route: ActivatedRouteSnapshot

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BudgetPlanResolver, provideMockStore(), provideMockActions(() => actions$)],
    })

    resolver = TestBed.inject(BudgetPlanResolver)
    store = TestBed.inject(MockStore)
    route = new ActivatedRouteSnapshot()
    route.paramMap.get = jasmine.createSpy('get').and.returnValue('1')
  })

  it('should return budget plan if it exists in the store', (done) => {
    store.setState({ budgetPlan: { budgetPlans: [{ id: 1 }] } })

    let result = resolver.resolve(route, null) as Observable<BudgetPlan>

    result.subscribe((budgetPlan) => {
      expect(budgetPlan).toEqual(jasmine.objectContaining({ id: 1 }))
      done()
    })
  })

  it('should dispatch loadBudgetPlans and return budget plan if it does not exist in the store', (done) => {
    store.setState({ budgetPlan: { budgetPlans: [] } })
    spyOn(store, 'dispatch')

    actions$.next(BudgetPlanAction.loadBudgetPlansSuccess({ budgetPlans: [{ id: 1 } as BudgetPlan] }))

    let result = resolver.resolve(route, null) as Observable<BudgetPlan>

    result.subscribe((budgetPlan) => {
      expect(store.dispatch).toHaveBeenCalledWith(BudgetPlanAction.loadBudgetPlans({ cashBoxId: 1 }))
      expect(budgetPlan).toEqual(jasmine.objectContaining({ id: 1 }))
      done()
    })
  })
})
