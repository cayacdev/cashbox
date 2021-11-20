import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CashBoxViewComponent } from './cash-box-view.component';
import { provideMockStore } from '@ngrx/store/testing';
import { ActivatedRoute } from '@angular/router';
import { CashBox } from '../../../model/cash-box.model';
import { BudgetPlan } from '../../../model/budget-plan.model';
import { Component, Input } from '@angular/core';

const expectedCashBox = mockCashBox(3);
const expectedBudgetPlan = mockBudgetPlan(2);
const initialState = {
  cashBoxes: {
    cashBoxes: [mockCashBox(1), mockCashBox(2), expectedCashBox, mockCashBox(4)],
    selectedCashBoxId: 3,
  },
  budgetPlan: {
    budgetPlans: [mockBudgetPlan(1), expectedBudgetPlan, mockBudgetPlan(3)],
    activeBudgetPlanId: 2,
  },
};

@Component({
  selector: 'app-cash-box-budget-plan-view',
  template: ``,
})
class MockBudgetPlanViewComponent {
  @Input() budgetPlan: BudgetPlan;
  @Input() cashBoxId: number;
}

describe('CashBoxViewComponent', () => {
  let component: CashBoxViewComponent;
  let fixture: ComponentFixture<CashBoxViewComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CashBoxViewComponent, MockBudgetPlanViewComponent],
        providers: [provideMockStore({ initialState }), { provide: ActivatedRoute, useValue: {} }],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CashBoxViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeDefined();
  });

  it('should initialize the correct cash box from the store', (done) => {
    component.cashBox$.subscribe((cashBox) => {
      expect(cashBox).toBe(expectedCashBox);
      done();
    });
  });

  it('should initialize the correct budget plan from the store', (done) => {
    component.budgetPlan$.subscribe((budgetPlan) => {
      expect(budgetPlan).toBe(expectedBudgetPlan);
      done();
    });
  });
});

function mockCashBox(id: number): CashBox {
  return { id, name: `Test ${id}` };
}

function mockBudgetPlan(id: number): BudgetPlan {
  return { id, name: `Test ${id}`, start_date: null, end_date: null, budget: 1, entries: [], closed: false };
}
