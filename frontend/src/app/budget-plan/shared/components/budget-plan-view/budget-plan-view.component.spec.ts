import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BudgetPlanViewComponent } from './budget-plan-view.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MaterialModule } from '../../../../shared/material.module';
import { LoadingState } from '../../../../store/state';
import { of } from 'rxjs';

describe('BudgetPlanViewComponent', () => {
  let component: BudgetPlanViewComponent;
  let fixture: ComponentFixture<BudgetPlanViewComponent>;
  let store: MockStore;
  const initialState = {
    budgetPlan: { budgetPlansEntries: { 1: {} }, loadBudgetPlanEntriesState: LoadingState.INIT },
  };
  const budgetPlan = {
    id: 1,
    budget: 500,
    start_date: new Date(),
    end_date: new Date(),
    name: 'Test',
    entries: [],
    closed: true,
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [MaterialModule],
        declarations: [BudgetPlanViewComponent],
        providers: [provideMockStore({ initialState })],
      }).compileComponents();
    })
  );

  beforeEach(function () {
    fixture = TestBed.createComponent(BudgetPlanViewComponent);
    component = fixture.componentInstance;
    component.budgetPlan = budgetPlan;

    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', function () {
    expect(component).toBeDefined();
  });

  describe('isAllowed', () => {
    it('should return true if email is the same and the plan is not closed', () => {
      component.activeUserEmail$ = of('test@test.de');
      component.budgetPlan.closed = false;

      component.isAllowed(createEntry('test@test.de')).subscribe((result) => {
        expect(result).toBeTrue();
      });
    });

    it('should return false if email is not the same and the plan is not closed', () => {
      component.activeUserEmail$ = of('other@email.de');
      component.budgetPlan.closed = false;

      component.isAllowed(createEntry('test@test.de')).subscribe((result) => {
        expect(result).toBeFalse();
      });
    });

    it('should return false if email is the same but the plan is closed', () => {
      component.activeUserEmail$ = of('test@test.de');
      component.budgetPlan.closed = true;

      component.isAllowed(createEntry('test@test.de')).subscribe((result) => {
        expect(result).toBeFalse();
      });
    });
  });

  function createEntry(email: string) {
    return {
      id: 1,
      description: '',
      value: 10,
      date: new Date(),
      user: { id: 1, name: '', email: email },
    };
  }
});
