import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BudgetPlanListComponent } from './budget-plan-list.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from '../../../../shared/material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Action } from '@ngrx/store';
import { AddButtonComponent } from '../../../../shared/add-button/add-button.component';

describe('BudgetPlanListComponent', () => {
  let component: BudgetPlanListComponent;
  let fixture: ComponentFixture<BudgetPlanListComponent>;
  let store: MockStore;
  const initialState = { budgetPlan: { budgetPlans: [] } };
  const budgetPlan = {
    id: 5,
    budget: 500,
    start_date: new Date(),
    end_date: new Date(),
    name: 'Test',
    entries: [],
    closed: false,
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [MaterialModule, NoopAnimationsModule],
        declarations: [BudgetPlanListComponent, AddButtonComponent],
        providers: [
          provideMockStore({ initialState }),
          { provide: Router, useValue: {} },
          {
            provide: ActivatedRoute,
            useValue: {},
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetPlanListComponent);
    component = fixture.componentInstance;
    component.cashBoxId = 4;
    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should have displayed columns', function () {
    expect(component.displayedColumns).toEqual(['status', 'name', 'date', 'budget', 'actions']);
  });

  describe('onCloseToggle', () => {
    it('should toggle close attribute to true', function () {
      component.onCloseToggle({ ...budgetPlan, closed: false });

      expect(store.dispatch).toHaveBeenCalledOnceWith({
        type: '[BudgetPlan] close budget plan',
        cashBoxId: component.cashBoxId,
        index: budgetPlan.id,
        close: true,
      } as Action);
    });

    it('should toggle close attribute to true', function () {
      component.onCloseToggle({ ...budgetPlan, closed: true });

      expect(store.dispatch).toHaveBeenCalledOnceWith({
        type: '[BudgetPlan] close budget plan',
        cashBoxId: component.cashBoxId,
        index: budgetPlan.id,
        close: false,
      } as Action);
    });
  });
});
