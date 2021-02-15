import { createFeatureSelector } from '@ngrx/store';
import * as fromCashBoxSettings from './cash-box-settings.reducer';

export const selectCashBoxSettings = createFeatureSelector<fromCashBoxSettings.State>(fromCashBoxSettings.cashBoxSettingsFeatureKey);
