import * as fromReducer from './budget-plan.reducer';
import * as BudgetPlanActions from './budget-plan.actions';
import { LoadingState } from '../../store/state';

describe('BudgetPlanReducer', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = {
        type: 'Unknown',
      };
      const state = fromReducer.reducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe('close budget plan action', function () {
    it('should set state to loading when action is dispatched', () => {
      const { initialState } = fromReducer;

      const state = fromReducer.reducer(
        initialState,
        BudgetPlanActions.closeBudgetPlan({
          cashBoxId: 1,
          index: 1,
          close: true,
        })
      );

      expect(state.updateBudgetPlanState).toBe(LoadingState.LOADING);
    });
  });

  describe('update budget plan success action', function () {
    it('should set state to loaded when action is dispatched', () => {
      const { initialState } = fromReducer;

      const state = fromReducer.reducer(initialState, BudgetPlanActions.updateBudgetPlanSuccess({ cashBoxId: 1 }));

      expect(state.updateBudgetPlanState).toBe(LoadingState.LOADED);
    });
  });

  describe('update budget plan failure action', function () {
    it('should set state to error message when action is dispatched', () => {
      const { initialState } = fromReducer;

      const state = fromReducer.reducer(
        initialState,
        BudgetPlanActions.updateBudgetPlanFail({
          cashBoxId: 1,
          error: 'error message',
        })
      );

      expect(state.updateBudgetPlanState).toEqual({ errorMsg: 'error message' });
    });
  });
});
