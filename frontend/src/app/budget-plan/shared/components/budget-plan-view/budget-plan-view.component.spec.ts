import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetPlanViewComponent } from './budget-plan-view.component';

describe('CashBoxBudgetPlanViewComponent', () => {
  let component: BudgetPlanViewComponent;
  let fixture: ComponentFixture<BudgetPlanViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BudgetPlanViewComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetPlanViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
