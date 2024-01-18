import { AuthService } from './../services/auth.service';
import { Component,OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { LoginRequest } from '../models/login-request.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  
  model: LoginRequest
  constructor(
    private authService: AuthService,
    private cookieeService: CookieService,
    private router: Router,
    private ngx: NgxUiLoaderService,
    private toastr : ToastrService
  ){
    this.model = {
      email: '',
      password: ''
    }
  }

  login(){
    this.ngx.start();
    this.authService.login(this.model).subscribe({
      next: (response) => {
        this.cookieeService.set('Authorization', `Bearer ${response.token}`, undefined, '/', undefined, true,'Strict');

        this.authService.setUser({
          id: response.id,
          email: response.email,
          roles: response.roles
        })
        this.ngx.stop()
        this.toastr.success("Login successfully!")
        this.router.navigate(['/admin']);
      },
      error: (error) => {
        console.log(error);
        this.ngx.stop()
        this.toastr.error("Email or Password is incorrect")
      }
    })
    
  }
}
