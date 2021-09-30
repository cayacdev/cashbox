import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BudgetPlanEditComponent } from './budget-plan-edit.component';
import { provideMockStore } from '@ngrx/store/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { MaterialModule } from '../../../shared/material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

describe('BudgetPlanEditComponent', () => {
  let component: BudgetPlanEditComponent;
  let fixture: ComponentFixture<BudgetPlanEditComponent>;
  const initialState = { budgetPlan: {} };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [MaterialModule, NoopAnimationsModule, ReactiveFormsModule],
        declarations: [BudgetPlanEditComponent],
        providers: [
          provideMockStore({ initialState }),
          {
            provide: ActivatedRoute,
            useValue: { snapshot: { data: { budgetPlan: 1 } }, parent: { data: of() } },
          },
          { provide: Router, useValue: {} },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetPlanEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
