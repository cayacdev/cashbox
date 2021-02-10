import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cash-box-overview',
  templateUrl: './cash-box-overview.component.html',
  styleUrls: ['./cash-box-overview.component.scss'],
})
export class CashBoxOverviewComponent implements OnInit {
  navLinks = [
    {
      label: 'Overview',
      link: './view',
      index: 0,
    },
    {
      label: 'Report',
      link: './report',
      index: 1,
    },
    {
      label: 'Budget Plans',
      link: './plans',
      index: 2,
    },
    {
      label: 'Settings',
      link: './settings',
      index: 3,
    },
  ];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.navigate(['view'], { relativeTo: this.activatedRoute });
  }
}
