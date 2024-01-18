import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Category } from './models/category.model';
import { CategoryService } from './services/category.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { EditCategoryComponent } from './edit-category/edit-category.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit {
  categories$?: Observable<Category[]>;
  @ViewChild(EditCategoryComponent) addView !: EditCategoryComponent


  constructor(
    private categoryService: CategoryService,
    private ngx: NgxUiLoaderService

  ) { }
  ngOnInit(): void {
    this.ngx.start();
    this.getAllCategories();
    this.ngx.stop();
  }

  getAllCategories() {
    return this.categories$ =  this.categoryService.getAllCategories()
  }

  
  editCategory(id:string){
    console.log(id);
    
    this.addView.getCategoryById(id);    
  }
}
