import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent implements OnDestroy{
  public visible = false;

  openDialog() {
    this.visible = !this.visible;
  }

  handleChange(event: any) {
    this.visible = event;
  }

  model: AddCategoryRequest;
  private addCategorySubscription?: Subscription;

  constructor( private categoryService: CategoryService, private router: Router, private ngx : NgxUiLoaderService, private toastr : ToastrService
    ) {
    this.model = {
      name: '',
      urlHandle: ''
    };
  }

  

  onFormSubmit = () => {
    this.ngx.start();
    this.addCategorySubscription = this.categoryService.addCategory(this.model)
    .subscribe({
      next: (response) => {
        this.ngx.stop();
        this.toastr.success("Added category successfully")
        this.visible = false;
        this.router.navigateByUrl('/admin/content/categories')
        
      },
      error: (error) => {
        console.log("Something went wrong");
        this.ngx.stop();
        this.toastr.error("Something went wrong!")
      }
    })
  }

  ngOnDestroy(): void {
    this.addCategorySubscription?.unsubscribe();
  }
}
