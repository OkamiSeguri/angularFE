import { Component, OnInit } from '@angular/core';

import { navItems } from './_nav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent implements OnInit {

  public navItems = [];

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    
    this.navItems = navItems;
  }
}
