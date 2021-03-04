import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BudgetPlanEditComponent } from './budget-plan-edit.component';

describe('BudgetPlanEditComponent', () => {
  let component: BudgetPlanEditComponent;
  let fixture: ComponentFixture<BudgetPlanEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetPlanEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetPlanEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
