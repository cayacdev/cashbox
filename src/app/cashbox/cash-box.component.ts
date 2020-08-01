import { Component } from '@angular/core';

@Component({
  selector: 'app-cash-box',
  template: ` <nav mat-tab-nav-bar>
      <a
        mat-tab-link
        *ngFor="let link of navLinks"
        [routerLink]="link.link"
        routerLinkActive
        [routerLinkActiveOptions]="{ exact: true }"
        #rla="routerLinkActive"
        [active]="rla.isActive"
        >{{ link.label }}
      </a>
    </nav>
    <router-outlet></router-outlet>`,
})
export class CashBoxComponent {
  navLinks = [
    {
      label: 'Overview',
      link: './',
      index: 0,
    },
    {
      label: 'Add',
      link: './new',
      index: 1,
    },
  ];
}
