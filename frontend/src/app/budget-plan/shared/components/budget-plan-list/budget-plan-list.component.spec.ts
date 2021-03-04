import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BudgetPlanListComponent } from './budget-plan-list.component';

describe('CashBoxBudgetPlanListComponent', () => {
  let component: BudgetPlanListComponent;
  let fixture: ComponentFixture<BudgetPlanListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BudgetPlanListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetPlanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
