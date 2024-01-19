import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AddBlogPostRequest } from '../models/add-blogpost-request.model';
import { Category } from '../../category/models/category.model';
import { Observable, Subscription } from 'rxjs';
import { BlogPostService } from '../services/blog-post.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { CategoryService } from '../../category/services/category.service';
import { ImageService } from 'src/app/shared/components/image-slector/image.service';
import { ToastrService } from 'ngx-toastr';
import { BlogPost } from '../models/blog-post.model';
import { User } from '../../auth/models/user.model';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-add-blog-post',
  templateUrl: './add-blog-post.component.html',
  styleUrl: './add-blog-post.component.scss'
})
export class AddBlogPostComponent  implements OnInit{
  public visible = false;
  public Editor = ClassicEditor;
  model: AddBlogPostRequest;
  categories$?: Observable<Category[]>;
  isImageSelectorVisibale: boolean = false;
  imageSelectSubscription?: Subscription;
  user?: User;



  constructor(
    private blogPostService: BlogPostService,
    private ngx: NgxUiLoaderService,
    private router: Router,
    private categoryService: CategoryService,
    private imageService : ImageService,
    private toastr : ToastrService,
    private authService :AuthService
  ) {
    this.model = {
      title: '',
      shortDescription: '',
      content: '',
      featuredImageUrl: '',
      urlHandle: '',
      publishedDate: new Date(),
      author: '',
      isVisible: true,
      categories: []
    }
  }
  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();
    this.imageSelectSubscription = this.imageService.onSelectImage().subscribe({
      next: (response) => {
        if(this.model){
           this.model.featuredImageUrl = response.url
           this.isImageSelectorVisibale = false               
        }
      }
    })
    this.user = this.authService.getUser()
  }


  openDialog() {
    this.visible = !this.visible;
  }

  handleChange(event: any) {
    this.visible = event;
  }

  onFormSubmit = () => {
    this.ngx.start();
    this.blogPostService.creatBlogPost(this.model)
    .subscribe({
       next: (response) => {
        this.ngx.stop();
        this.visible = false;
        this.router.navigateByUrl('/admin/content/blogposts');
        this.toastr.success("Blog post created successfully!")
       },
       error: (error) => {
         this.ngx.stop();
         console.log(error);
         this.toastr.error("Something went wrong!")
       }
    });
  }

  openImageSelector(){
    this.isImageSelectorVisibale  = true;
  }

  closeImageSelector(){
    this.isImageSelectorVisibale  = false;
  }

}
