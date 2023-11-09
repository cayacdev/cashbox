import { ComponentFixture, TestBed } from '@angular/core/testing'

import { BudgetPlanReportComponent } from './budget-plan-report.component'
import * as BudgetPlanAction from '../../../store/budget-plan.actions'
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import { BudgetPlan } from '../../../../model/budget-plan.model'

describe('BudgetPlanReportComponent', () => {
  let component: BudgetPlanReportComponent
  let fixture: ComponentFixture<BudgetPlanReportComponent>
  let store: MockStore

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideMockStore()],
      declarations: [BudgetPlanReportComponent],
    }).compileComponents()

    store = TestBed.inject(MockStore)

    fixture = TestBed.createComponent(BudgetPlanReportComponent)
    component = fixture.componentInstance
    fixture.detectChanges()

    store.setState({
      budgetPlan: {
        budgetPlans: [],
        budgetPlansReports: [],
        budgetPlansEntries: [],
      },
    })
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should dispatch loadBudgetPlanReport action on init', () => {
    component.cashBoxId = 1
    component.budgetPlanId = 2

    spyOn(store, 'dispatch')

    component.ngOnInit()

    expect(store.dispatch).toHaveBeenCalledWith(
      BudgetPlanAction.loadBudgetPlanReport({
        cashBoxId: component.cashBoxId,
        budgetPlanId: component.budgetPlanId,
      }),
    )
  })

  it('should set data correctly when subscribed', () => {
    const mockState = {
      budgetPlan: {
        budgetPlans: [
          { id: 1, name: 'Plan 1' } as BudgetPlan,
          {
            id: 2,
            name: 'Plan 2',
          } as BudgetPlan,
        ],
        budgetPlansReports: {
          1: {
            paidByUser: [{ name: 'User 1', value: 20 }],
            debtsByUser: [{ value: 20, creditor: 'User 1', debtor: 'User 2' }],
            remainingBudget: 0,
            paidOverall: 20,
          },
          2: {
            paidByUser: [{ name: 'User 2', value: 20 }],
            debtsByUser: [{ value: 20, creditor: 'User 2', debtor: 'User 1' }],
            remainingBudget: 0,
            paidOverall: 20,
          },
        },
        budgetPlansEntries: {
          1: [
            {
              id: 1,
              description: 'Entry 1',
              value: 20,
              date: new Date(),
              user: { id: 1, name: 'User 1', email: '' },
            },
          ],
          2: [
            {
              id: 2,
              description: 'Grooceries',
              value: 20,
              date: new Date(),
              user: { id: 2, name: 'User 2', email: '' },
            },
            {
              id: 3,
              description: 'Home',
              value: 34,
              date: new Date(),
              user: { id: 2, name: 'User 2', email: '' },
            },
            {
              id: 4,
              description: 'Car',
              value: 76,
              date: new Date(),
              user: { id: 2, name: 'User 2', email: '' },
            },
            {
              id: 5,
              description: 'Going Out',
              value: 12,
              date: new Date(),
              user: { id: 2, name: 'User 2', email: '' },
            },
            {
              id: 6,
              description: 'Grooceries',
              value: 1,
              date: new Date(),
              user: { id: 1, name: 'User 2', email: '' },
            },
            {
              id: 7,
              description: 'Going Out',
              value: 2,
              date: new Date(),
              user: { id: 2, name: 'User 2', email: '' },
            },
            {
              id: 8,
              description: 'Drugstore',
              value: 3,
              date: new Date(),
              user: { id: 1, name: 'User 2', email: '' },
            },
            {
              id: 9,
              description: 'Hobby',
              value: 4,
              date: new Date(),
              user: { id: 2, name: 'User 2', email: '' },
            },
            {
              id: 10,
              description: 'Wellness',
              value: 5,
              date: new Date(),
              user: { id: 1, name: 'User 2', email: '' },
            },
          ],
        },
      },
    }

    store.setState(mockState)

    component.budgetPlanId = 2
    component.ngOnInit()

    expect(component.name).toEqual('Plan 2')
    expect(component.report).toEqual(mockState.budgetPlan.budgetPlansReports[2])
    expect(component.paidByUserEntries.data).toEqual([
      {
        name: 'User 2',
        value: 20,
      },
    ])
    expect(component.debtsEntries.data).toEqual([
      {
        value: 20,
        creditor: 'User 2',
        debtor: 'User 1',
      },
    ])
    expect(component.paidByDescriptionEntries.data).toEqual([
      { description: 'Car', value: 76 },
      { description: 'Home', value: 34 },
      { description: 'Grooceries', value: 21 },
      { description: 'Going Out', value: 14 },
      { description: 'Wellness', value: 5 },
      { description: 'Misc', value: 7 },
    ])
  })

  it('should unsubscribe on destroy', () => {
    const spy = spyOn(component['subscription'], 'unsubscribe')
    component.ngOnDestroy()
    expect(spy).toHaveBeenCalled()
  })
})
