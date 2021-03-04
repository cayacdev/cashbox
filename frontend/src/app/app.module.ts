import { BrowserModule } from '@angular/platform-browser';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './main/main.component';
import { MaterialModule } from './shared/material.module';
import { AuthModule } from './auth/auth.module';
import { AuthEffects } from './auth/store/auth.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CashBoxModule } from './cash-box/cash-box.module';
import { CashBoxEffects } from './cash-box/store/cash-boxes/cash-box.effects';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BudgetPlanEffects } from './budget-plan/store/budget-plan.effects';
import { UserModule } from './user/user.module';
import localeDE from '@angular/common/locales/de';
import { registerLocaleData } from '@angular/common';
import { NotFoundRoutingModule } from './not-found-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';

registerLocaleData(localeDE);

@NgModule({
  declarations: [AppComponent, MainComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule,
    CashBoxModule,
    UserModule,
    BrowserAnimationsModule,
    MaterialModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects, CashBoxEffects, BudgetPlanEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    NotFoundRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' },
    { provide: LOCALE_ID, useValue: 'de' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
