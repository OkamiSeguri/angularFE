import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { User } from 'src/app/views/auth/models/user.model';
import { AuthService } from 'src/app/views/auth/services/auth.service';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent implements OnInit{

  user?: User;



  ngOnInit(): void {
    this.authService.user().subscribe({
      next: (response) => {
        this.user = response
      }
    })

    this.user = this.authService.getUser();
  }
  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  constructor(private classToggler: ClassToggleService,
    private router: Router,
    private authService: AuthService,
    private ngx : NgxUiLoaderService) {
    super();
    
  }

  logout(){
    this.ngx.start();
    this.authService.logout();
    this.ngx.stop();
    this.router.navigateByUrl('/')
  }
}
