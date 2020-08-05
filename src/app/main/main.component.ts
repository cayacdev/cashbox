import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay, take } from 'rxjs/operators';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import * as AuthActions from '../auth/store/auth.actions';

@Component({
  selector: 'app-cash-box',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  @ViewChild('drawer') drawer: any;
  isAuthenticated = false;
  private authSub: Subscription;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.authSub = this.store
      .select('auth')
      .pipe(map((authState) => authState.user))
      .subscribe((user) => {
        this.isAuthenticated = !!user;
      });
  }

  onClickMenuItem(): void {
    console.log(this.drawer);
    this.isHandset$.pipe(take(1)).subscribe((isHandset) => {
      if (isHandset) {
        this.drawer.close();
      }
    });
  }

  onLogout(): void {
    this.store.dispatch(new AuthActions.Logout());
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }
}
