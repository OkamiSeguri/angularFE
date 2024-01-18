import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../services/category.service';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { Category } from '../models/category.model';
import { Observable, Subscription } from 'rxjs';
import { UpdateCategoryRequest } from '../models/update-category-request.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.scss'
})
export class EditCategoryComponent {
  public visible = false;
  category: Category 
  editCategorySubscription?: Subscription;
  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private ngx : NgxUiLoaderService,
    private toastr : ToastrService
  ){
    

  }

  openDialog() {
    this.visible = !this.visible;
  }

  handleChange(event: any) {
    this.visible = event;
  }

  onFormSubmit(){
    this.ngx.start()
    const updateCategoryRequest: UpdateCategoryRequest = {
      name: this.category?.name ?? "",
      urlHandle: this.category?.urlHandle ?? "",
    }  

    if(this.category.id) {
      this.editCategorySubscription = this.categoryService.updateCategory(this.category.id, updateCategoryRequest)
      .subscribe({
         next: (response) => {
           this.ngx.stop();
           this.router.navigateByUrl('admin/content/categories')
           this.toastr.success("Category updated successfully!")
           this.openDialog();
         },
         error: (error) => {
           this.ngx.stop();
           console.log(error);
           this.toastr.error("Something went wrong!")
         }
      });
    }
  }

  getCategoryById(id: string){

    this.openDialog();
      this.categoryService.getCategoryById(id).subscribe({
       next: (category) => {
         this.category = category;
       },
       error: (error: any) => {
         this.toastr.error(error);
       }
     });
  }

  delete(id: string){
    this.ngx.start();
    if(this.category.id){
      this.categoryService.deleteCategory(this.category.id).subscribe(
        {
          next: (response) => {
            this.ngx.stop();
            this.router.navigateByUrl('admin/content/categories');
            this.toastr.success("Category deleted successfully!")
            this.openDialog();
          },
          error: (error) => {
            console.log(error);
            this.ngx.stop();
            this.toastr.error("Something went wrong!")
          }
        }
      )
    }
  }

}
